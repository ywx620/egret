/**
 * Created by yangsong on 14/12/24.
 */
module pomeloClient{
    export class Pomelo{
        private JS_WS_CLIENT_TYPE = 'js-websocket';
        private JS_WS_CLIENT_VERSION = '0.0.1';
        private RES_OK = 200;
        private RES_FAIL = 500;
        private RES_OLD_CLIENT = 501;

        private socket:egret.WebSocket;
        private package:Package;
        private protocol:Protocol;
        private message:Message;
        private initCallback;
        private handlers:any = {};
        private _callbacks:any = {};

        private callbacks:any = {};
        private routeMap:any = {};

        private handshakeBuffer:any;
        private handshakeCallback:any;
        private heartbeatId:any = null;
        private heartbeatTimeoutId:any = null;
        private heartbeatTimeout:number = 0;
        private nextHeartbeatTimeout:number = 0;
        private heartbeatInterval:number = 0;
        private gapThreshold:number = 100;   // heartbeat gap threashold
        private reqId:number;

        public constructor(){
            this.package = new Package();
            this.protocol = new Protocol();
            this.message = new Message();

            this.handlers[Package.TYPE_HANDSHAKE] = this.handshake;
            this.handlers[Package.TYPE_HEARTBEAT] = this.heartbeat;
            this.handlers[Package.TYPE_DATA] = this.onData;
            this.handlers[Package.TYPE_KICK] = this.onKick;

            this.handshakeBuffer = {
                'sys': {
                    type: this.JS_WS_CLIENT_TYPE,
                    version: this.JS_WS_CLIENT_VERSION
                },
                'user': {
                }
            }
            this.reqId = 0;
        }

        public init(params, cb){
            this.initCallback = cb;
            this.initEgretSocket(params.host, params.port, cb);
        }

        private initEgretSocket(host, port, cb){
            var self = this;

            self.socket = new egret.WebSocket(host, port);
            self.socket.addEventListener(egret.Event.CONNECT, function() {
                var obj = self.package.encode(Package.TYPE_HANDSHAKE, self.protocol.strencode(JSON.stringify(self.handshakeBuffer)));
                self.send(obj);
            }, this);
            self.socket.addEventListener(egret.Event.CLOSE, function(e) {
                self.emit('close', e);
                console.error('socket close: ');
            }, this);
            self.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, function(e) {
                self.emit('io-error', e);
                console.error('socket error: ', e);
            }, this);
            self.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, function() {
                console.log('connect to ' + host);
                self.processPackage(self.package.decode(self.socket.readUTF()));
                // new package arrived, update the heartbeat timeout
                if(self.heartbeatTimeout) {
                    self.nextHeartbeatTimeout = Date.now() + self.heartbeatTimeout;
                }
            }, this);

            self.socket.connect(host, port);
        }

        public on(event, fn){
            (this._callbacks[event] = this._callbacks[event] || []).push(fn);
        }

        public removeAllListeners(event?, fn?){
            // all
            if (0 == arguments.length) {
                this._callbacks = {};
                return;
            }

            // specific event
            var callbacks = this._callbacks[event];
            if (!callbacks){
                return;
            }

            // remove all handlers
            if (1 == arguments.length) {
                delete this._callbacks[event];
                return;
            }

            // remove specific handler
            var i = this.index(callbacks, fn._off || fn);
            if (~i){
                callbacks.splice(i, 1);
            }
            return;
        }

        private index(arr, obj){
            if ([].indexOf){
                return arr.indexOf(obj);
            }

            for (var i = 0; i < arr.length; ++i) {
                if (arr[i] === obj)
                    return i;
            }
            return -1;
        }

        private disconnect() {
            if(this.socket) {
                this.socket.close();
                console.log('disconnect');
                this.socket = null;
            }

            if(this.heartbeatId) {
                egret.clearTimeout(this.heartbeatId);
                this.heartbeatId = null;
            }
            if(this.heartbeatTimeoutId) {
                egret.clearTimeout(this.heartbeatTimeoutId);
                this.heartbeatTimeoutId = null;
            }
        }

        public request(route, msg, cb) {
            if(arguments.length === 2 && typeof msg === 'function') {
                cb = msg;
                msg = {};
            } else {
                msg = msg || {};
            }
            route = route || msg.route;
            if(!route) {
                return;
            }

            this.reqId++;
            this.sendMessage(this.reqId, route, msg);

            this.callbacks[this.reqId] = cb;
            this.routeMap[this.reqId] = route;
        }

        private notify = function(route, msg) {
            msg = msg || {};
            this.sendMessage(0, route, msg);
        }

        private sendMessage(reqId, route, msg) {
            var type = reqId ? Message.TYPE_REQUEST : Message.TYPE_NOTIFY;
            msg = this.protocol.strencode(JSON.stringify(msg));


            var compressRoute = 0;
            msg = this.message.encode(reqId, type, compressRoute, route, msg);
            var packet = this.package.encode(Package.TYPE_DATA, msg);
            this.send(packet);
        }

        private send(packet){
            this.socket.writeUTF(packet.buffer);
        }

        private processPackage(msg) {
            this.handlers[msg.type].call(this, msg.body);
        }

        private processMessage(msg) {
            if(!msg.id) {
                // server push message
                this.emit(msg.route, msg.body);
                return;
            }

            //if have a id then find the callback function with the request
            var cb = this.callbacks[msg.id];

            delete this.callbacks[msg.id];
            if(typeof cb !== 'function') {
                return;
            }

            cb(msg.body);
            return;
        }

        private heartbeat(data) {
            if(!this.heartbeatInterval) {
                // no heartbeat
                return;
            }

            var obj = this.package.encode(Package.TYPE_HEARTBEAT);
            if(this.heartbeatTimeoutId) {
                egret.clearTimeout(this.heartbeatTimeoutId);
                this.heartbeatTimeoutId = null;
            }

            if(this.heartbeatId) {
                // already in a heartbeat interval
                return;
            }

            var self = this;
            self.heartbeatId = egret.setTimeout(function() {
                self.heartbeatId = null;
                self.send(obj);

                self.nextHeartbeatTimeout = Date.now() + self.heartbeatTimeout;
                self.heartbeatTimeoutId = egret.setTimeout(self.heartbeatTimeoutCb, self, self.heartbeatTimeout);
            }, self, self.heartbeatInterval);
        }

        private heartbeatTimeoutCb() {
            var gap = this.nextHeartbeatTimeout - Date.now();
            if(gap > this.gapThreshold) {
                this.heartbeatTimeoutId = egret.setTimeout(this.heartbeatTimeoutCb, this, gap);
            } else {
                console.error('server heartbeat timeout');
                this.emit('heartbeat timeout');
                this.disconnect();
            }
        }

        private handshake(data){
            data = JSON.parse(this.protocol.strdecode(data));
            if(data.code === this.RES_OLD_CLIENT) {
                this.emit('error', 'client version not fullfill');
                return;
            }

            if(data.code !== this.RES_OK) {
                this.emit('error', 'handshake fail');
                return;
            }

            this.handshakeInit(data);

            var obj = this.package.encode(Package.TYPE_HANDSHAKE_ACK);
            this.send(obj);
            if(this.initCallback) {
                this.initCallback(this.socket);
                this.initCallback = null;
            }
        }

        private handshakeInit(data){
            if(data.sys && data.sys.heartbeat) {
                this.heartbeatInterval = data.sys.heartbeat * 1000;   // heartbeat interval
                this.heartbeatTimeout = this.heartbeatInterval * 2;        // max heartbeat timeout
            } else {
                this.heartbeatInterval = 0;
                this.heartbeatTimeout = 0;
            }

            if(typeof this.handshakeCallback === 'function') {
                this.handshakeCallback(data.user);
            }
        }

        private onData(data){
            //probuff decode
            var msg = this.message.decode(data);

            if(msg.id > 0){
                msg.route = this.routeMap[msg.id];
                delete this.routeMap[msg.id];
                if(!msg.route){
                    return;
                }
            }

            msg.body = this.deCompose(msg);

            this.processMessage(msg);
        }

        private deCompose(msg){
            return JSON.parse(this.protocol.strdecode(msg.body));
        }

        private onKick(data) {
            this.emit('onKick');
        }

        private emit(event, ...args:any[]){
            var params = [].slice.call(arguments, 1);
            var callbacks = this._callbacks[event];

            if (callbacks) {
                callbacks = callbacks.slice(0);
                for (var i = 0, len = callbacks.length; i < len; ++i) {
                    callbacks[i].apply(this, params);
                }
            }

            return this;
        }
    }

    class Message{
        static TYPE_REQUEST = 0;
        static TYPE_NOTIFY = 1;
        static TYPE_RESPONSE = 2;
        static TYPE_PUSH = 3;

        public encode(id, type, compressRoute, route, msg) {
            if (typeof msg == "object")
                msg = JSON.stringify(msg);
            return {id: id, type: type, compressRoute: compressRoute, route: route, body: msg};
        }

        public decode(buffer) {
            return buffer;
        }
    }

    class Package{
        static TYPE_HANDSHAKE = 1;
        static TYPE_HANDSHAKE_ACK = 2;
        static TYPE_HEARTBEAT = 3;
        static TYPE_DATA = 4;
        static TYPE_KICK = 5;

        public decode(buffer) {
            if (typeof buffer == "string") {
                buffer = JSON.parse(buffer);
            }
            return buffer;
        }

        public encode(type, body="") {
            var obj = {'type': type, 'body': body};
            return {buffer: JSON.stringify(obj)};
        }
    }

    class Protocol{
        public strencode(str) {
            return str;
        }

        public strdecode(buffer) {
            if (typeof buffer == "object") {
                buffer = JSON.stringify(buffer);
            }
            return buffer;
        }
    }
}
