//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret;
(function (egret) {
    var native;
    (function (native) {
        /**
         * @private
         */
        var NativeSocket = (function () {
            function NativeSocket() {
                this.host = "";
                this.port = 0;
            }
            NativeSocket.prototype.addCallBacks = function (onConnect, onClose, onSocketData, onError, thisObject) {
                this.onConnect = onConnect;
                this.onClose = onClose;
                this.onSocketData = onSocketData;
                this.onError = onError;
                this.thisObject = thisObject;
            };
            NativeSocket.prototype.connect = function (host, port) {
                this.host = host;
                this.port = port;
                var socketServerUrl = "ws://" + this.host + ":" + this.port;
                this.socket = new __global["egret_native"]["WebSocket"](socketServerUrl);
                this._bindEvent();
            };
            NativeSocket.prototype.connectByUrl = function (url) {
                this.socket = new __global["egret_native"]["WebSocket"](url);
                this._bindEvent();
            };
            NativeSocket.prototype._bindEvent = function () {
                var that = this;
                var socket = this.socket;
                socket.onOpen = function () {
                    if (that.onConnect) {
                        that.onConnect.call(that.thisObject);
                    }
                };
                socket.onClose = function () {
                    if (that.onClose) {
                        that.onClose.call(that.thisObject);
                    }
                };
                socket.onError = function (errorCode) {
                    if (that.onError) {
                        that.onError.call(that.thisObject);
                    }
                };
                socket.onMessage = function (message) {
                    if (that.onSocketData) {
                        that.onSocketData.call(that.thisObject, message);
                    }
                };
            };
            NativeSocket.prototype.send = function (message) {
                this.socket.send(message);
            };
            NativeSocket.prototype.close = function () {
                this.socket.close();
            };
            NativeSocket.prototype.disconnect = function () {
                if (this.socket.disconnect) {
                    this.socket.disconnect();
                }
            };
            return NativeSocket;
        }());
        native.NativeSocket = NativeSocket;
        __reflect(NativeSocket.prototype, "egret.native.NativeSocket", ["egret.ISocket"]);
        if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
            egret.ISocket = NativeSocket;
        }
    })(native = egret.native || (egret.native = {}));
})(egret || (egret = {}));
//# sourceMappingURL=NativeSocket.js.map