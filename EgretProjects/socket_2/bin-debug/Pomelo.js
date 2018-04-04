var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by yangsong on 14/12/24.
 */
var pomeloClient;
(function (pomeloClient) {
    var Pomelo = (function () {
        function Pomelo() {
            this.JS_WS_CLIENT_TYPE = 'js-websocket';
            this.JS_WS_CLIENT_VERSION = '0.0.1';
            this.RES_OK = 200;
            this.RES_FAIL = 500;
            this.RES_OLD_CLIENT = 501;
            this.handlers = {};
            this._callbacks = {};
            this.callbacks = {};
            this.routeMap = {};
            this.heartbeatId = null;
            this.heartbeatTimeoutId = null;
            this.heartbeatTimeout = 0;
            this.nextHeartbeatTimeout = 0;
            this.heartbeatInterval = 0;
            this.gapThreshold = 100; // heartbeat gap threashold
            this.notify = function (route, msg) {
                msg = msg || {};
                this.sendMessage(0, route, msg);
            };
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
                'user': {}
            };
            this.reqId = 0;
        }
        Pomelo.prototype.init = function (params, cb) {
            this.initCallback = cb;
            this.initEgretSocket(params.host, params.port, cb);
        };
        Pomelo.prototype.initEgretSocket = function (host, port, cb) {
            var self = this;
            self.socket = new egret.WebSocket(host, port);
            self.socket.addEventListener(egret.Event.CONNECT, function () {
                var obj = self.package.encode(Package.TYPE_HANDSHAKE, self.protocol.strencode(JSON.stringify(self.handshakeBuffer)));
                self.send(obj);
            }, this);
            self.socket.addEventListener(egret.Event.CLOSE, function (e) {
                self.emit('close', e);
                console.error('socket close: ');
            }, this);
            self.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, function (e) {
                self.emit('io-error', e);
                console.error('socket error: ', e);
            }, this);
            self.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, function () {
                console.log('connect to ' + host);
                self.processPackage(self.package.decode(self.socket.readUTF()));
                // new package arrived, update the heartbeat timeout
                if (self.heartbeatTimeout) {
                    self.nextHeartbeatTimeout = Date.now() + self.heartbeatTimeout;
                }
            }, this);
            self.socket.connect(host, port);
        };
        Pomelo.prototype.on = function (event, fn) {
            (this._callbacks[event] = this._callbacks[event] || []).push(fn);
        };
        Pomelo.prototype.removeAllListeners = function (event, fn) {
            // all
            if (0 == arguments.length) {
                this._callbacks = {};
                return;
            }
            // specific event
            var callbacks = this._callbacks[event];
            if (!callbacks) {
                return;
            }
            // remove all handlers
            if (1 == arguments.length) {
                delete this._callbacks[event];
                return;
            }
            // remove specific handler
            var i = this.index(callbacks, fn._off || fn);
            if (~i) {
                callbacks.splice(i, 1);
            }
            return;
        };
        Pomelo.prototype.index = function (arr, obj) {
            if ([].indexOf) {
                return arr.indexOf(obj);
            }
            for (var i = 0; i < arr.length; ++i) {
                if (arr[i] === obj)
                    return i;
            }
            return -1;
        };
        Pomelo.prototype.disconnect = function () {
            if (this.socket) {
                this.socket.close();
                console.log('disconnect');
                this.socket = null;
            }
            if (this.heartbeatId) {
                egret.clearTimeout(this.heartbeatId);
                this.heartbeatId = null;
            }
            if (this.heartbeatTimeoutId) {
                egret.clearTimeout(this.heartbeatTimeoutId);
                this.heartbeatTimeoutId = null;
            }
        };
        Pomelo.prototype.request = function (route, msg, cb) {
            if (arguments.length === 2 && typeof msg === 'function') {
                cb = msg;
                msg = {};
            }
            else {
                msg = msg || {};
            }
            route = route || msg.route;
            if (!route) {
                return;
            }
            this.reqId++;
            this.sendMessage(this.reqId, route, msg);
            this.callbacks[this.reqId] = cb;
            this.routeMap[this.reqId] = route;
        };
        Pomelo.prototype.sendMessage = function (reqId, route, msg) {
            var type = reqId ? Message.TYPE_REQUEST : Message.TYPE_NOTIFY;
            msg = this.protocol.strencode(JSON.stringify(msg));
            var compressRoute = 0;
            msg = this.message.encode(reqId, type, compressRoute, route, msg);
            var packet = this.package.encode(Package.TYPE_DATA, msg);
            this.send(packet);
        };
        Pomelo.prototype.send = function (packet) {
            this.socket.writeUTF(packet.buffer);
        };
        Pomelo.prototype.processPackage = function (msg) {
            this.handlers[msg.type].call(this, msg.body);
        };
        Pomelo.prototype.processMessage = function (msg) {
            if (!msg.id) {
                // server push message
                this.emit(msg.route, msg.body);
                return;
            }
            //if have a id then find the callback function with the request
            var cb = this.callbacks[msg.id];
            delete this.callbacks[msg.id];
            if (typeof cb !== 'function') {
                return;
            }
            cb(msg.body);
            return;
        };
        Pomelo.prototype.heartbeat = function (data) {
            if (!this.heartbeatInterval) {
                // no heartbeat
                return;
            }
            var obj = this.package.encode(Package.TYPE_HEARTBEAT);
            if (this.heartbeatTimeoutId) {
                egret.clearTimeout(this.heartbeatTimeoutId);
                this.heartbeatTimeoutId = null;
            }
            if (this.heartbeatId) {
                // already in a heartbeat interval
                return;
            }
            var self = this;
            self.heartbeatId = egret.setTimeout(function () {
                self.heartbeatId = null;
                self.send(obj);
                self.nextHeartbeatTimeout = Date.now() + self.heartbeatTimeout;
                self.heartbeatTimeoutId = egret.setTimeout(self.heartbeatTimeoutCb, self, self.heartbeatTimeout);
            }, self, self.heartbeatInterval);
        };
        Pomelo.prototype.heartbeatTimeoutCb = function () {
            var gap = this.nextHeartbeatTimeout - Date.now();
            if (gap > this.gapThreshold) {
                this.heartbeatTimeoutId = egret.setTimeout(this.heartbeatTimeoutCb, this, gap);
            }
            else {
                console.error('server heartbeat timeout');
                this.emit('heartbeat timeout');
                this.disconnect();
            }
        };
        Pomelo.prototype.handshake = function (data) {
            data = JSON.parse(this.protocol.strdecode(data));
            if (data.code === this.RES_OLD_CLIENT) {
                this.emit('error', 'client version not fullfill');
                return;
            }
            if (data.code !== this.RES_OK) {
                this.emit('error', 'handshake fail');
                return;
            }
            this.handshakeInit(data);
            var obj = this.package.encode(Package.TYPE_HANDSHAKE_ACK);
            this.send(obj);
            if (this.initCallback) {
                this.initCallback(this.socket);
                this.initCallback = null;
            }
        };
        Pomelo.prototype.handshakeInit = function (data) {
            if (data.sys && data.sys.heartbeat) {
                this.heartbeatInterval = data.sys.heartbeat * 1000; // heartbeat interval
                this.heartbeatTimeout = this.heartbeatInterval * 2; // max heartbeat timeout
            }
            else {
                this.heartbeatInterval = 0;
                this.heartbeatTimeout = 0;
            }
            if (typeof this.handshakeCallback === 'function') {
                this.handshakeCallback(data.user);
            }
        };
        Pomelo.prototype.onData = function (data) {
            //probuff decode
            var msg = this.message.decode(data);
            if (msg.id > 0) {
                msg.route = this.routeMap[msg.id];
                delete this.routeMap[msg.id];
                if (!msg.route) {
                    return;
                }
            }
            msg.body = this.deCompose(msg);
            this.processMessage(msg);
        };
        Pomelo.prototype.deCompose = function (msg) {
            return JSON.parse(this.protocol.strdecode(msg.body));
        };
        Pomelo.prototype.onKick = function (data) {
            this.emit('onKick');
        };
        Pomelo.prototype.emit = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var params = [].slice.call(arguments, 1);
            var callbacks = this._callbacks[event];
            if (callbacks) {
                callbacks = callbacks.slice(0);
                for (var i = 0, len = callbacks.length; i < len; ++i) {
                    callbacks[i].apply(this, params);
                }
            }
            return this;
        };
        return Pomelo;
    }());
    pomeloClient.Pomelo = Pomelo;
    __reflect(Pomelo.prototype, "pomeloClient.Pomelo");
    var Message = (function () {
        function Message() {
        }
        Message.prototype.encode = function (id, type, compressRoute, route, msg) {
            if (typeof msg == "object")
                msg = JSON.stringify(msg);
            return { id: id, type: type, compressRoute: compressRoute, route: route, body: msg };
        };
        Message.prototype.decode = function (buffer) {
            return buffer;
        };
        Message.TYPE_REQUEST = 0;
        Message.TYPE_NOTIFY = 1;
        Message.TYPE_RESPONSE = 2;
        Message.TYPE_PUSH = 3;
        return Message;
    }());
    __reflect(Message.prototype, "Message");
    var Package = (function () {
        function Package() {
        }
        Package.prototype.decode = function (buffer) {
            if (typeof buffer == "string") {
                buffer = JSON.parse(buffer);
            }
            return buffer;
        };
        Package.prototype.encode = function (type, body) {
            if (body === void 0) { body = ""; }
            var obj = { 'type': type, 'body': body };
            return { buffer: JSON.stringify(obj) };
        };
        Package.TYPE_HANDSHAKE = 1;
        Package.TYPE_HANDSHAKE_ACK = 2;
        Package.TYPE_HEARTBEAT = 3;
        Package.TYPE_DATA = 4;
        Package.TYPE_KICK = 5;
        return Package;
    }());
    __reflect(Package.prototype, "Package");
    var Protocol = (function () {
        function Protocol() {
        }
        Protocol.prototype.strencode = function (str) {
            return str;
        };
        Protocol.prototype.strdecode = function (buffer) {
            if (typeof buffer == "object") {
                buffer = JSON.stringify(buffer);
            }
            return buffer;
        };
        return Protocol;
    }());
    __reflect(Protocol.prototype, "Protocol");
})(pomeloClient || (pomeloClient = {}));
//# sourceMappingURL=Pomelo.js.map