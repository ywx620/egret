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
var eui;
(function (eui) {
    /**
     * The SetProperty class specifies a property value that is in effect only
     * during the parent view state.
     * You use this class in the <code>overrides</code> property of the State class.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language en_US
     */
    /**
     * SetProperty 类指定只在父视图状态期间有效的属性值。可以在 State 类的 overrides 属性中使用该类。
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language zh_CN
     */
    var SetProperty = (function () {
        /**
         * Constructor.
         *
         * @param target The object whose property is being set.
         * By default, EUI uses the immediate parent of the State object.
         * @param name The property to set.
         * @param value The value of the property in the view state.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 创建一个SetProperty实例。
         *
         * @param target 要设置其属性的对象。默认情况下，EUI 使用 State 对象的直接父级。
         * @param name 要设置的属性。
         * @param value 视图状态中的属性值。
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        function SetProperty(target, name, value) {
            this.target = target;
            this.name = name;
            this.value = value;
        }
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        SetProperty.prototype.apply = function (host, parent) {
            var obj = this.target ? host[this.target] : host;
            if (!obj)
                return;
            this.oldValue = obj[this.name];
            this.setPropertyValue(obj, this.name, this.value, this.oldValue);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        SetProperty.prototype.remove = function (host, parent) {
            var obj = this.target ? host[this.target] : host;
            if (!obj)
                return;
            this.setPropertyValue(obj, this.name, this.oldValue, this.oldValue);
            this.oldValue = null;
        };
        /**
         * @private
         * 设置属性值
         */
        SetProperty.prototype.setPropertyValue = function (obj, name, value, valueForType) {
            if (value === undefined || value === null)
                obj[name] = value;
            else if (typeof (valueForType) == "number")
                obj[name] = +value;
            else if (typeof (valueForType) == "boolean")
                obj[name] = this.toBoolean(value);
            else
                obj[name] = value;
        };
        /**
         * @private
         * 转成Boolean值
         */
        SetProperty.prototype.toBoolean = function (value) {
            if (typeof (value) == "string")
                return value.toLowerCase() == "true";
            return value != false;
        };
        return SetProperty;
    }());
    eui.SetProperty = SetProperty;
    __reflect(SetProperty.prototype, "eui.SetProperty", ["eui.IOverride"]);
})(eui || (eui = {}));
//# sourceMappingURL=SetProperty.js.map