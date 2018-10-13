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
     * The operation of adding a state to view.
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 视图添加状态显示元素操作
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language zh_CN
     */
    var AddItems = (function () {
        /**
         * Constructor.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 创建一个AddItems实例
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        function AddItems(target, propertyName, position, relativeTo) {
            this.target = target;
            this.propertyName = propertyName;
            this.position = position;
            this.relativeTo = relativeTo;
        }
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        AddItems.prototype.apply = function (host, parent) {
            var index;
            var relative = host[this.relativeTo];
            var target = host[this.target];
            var container = this.propertyName ? host[this.propertyName] : parent;
            if (!target || !container)
                return;
            switch (this.position) {
                case 0 /* FIRST */:
                    index = 0;
                    break;
                case 1 /* LAST */:
                    index = -1;
                    break;
                case 2 /* BEFORE */:
                    index = container.getChildIndex(relative);
                    break;
                case 3 /* AFTER */:
                    index = container.getChildIndex(relative) + 1;
                    break;
            }
            if (index == -1) {
                index = container.numChildren;
            }
            if (egret.is(container, "eui.Component")) {
                container.$Component[8 /* skin */].$elementsContent.push(target);
            }
            container.addChildAt(target, index);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        AddItems.prototype.remove = function (host, parent) {
            var container = this.propertyName ? host[this.propertyName] : parent;
            var target = host[this.target];
            if (!target || !container)
                return;
            if (target.$parent === container) {
                container.removeChild(target);
            }
            if (egret.is(container, "eui.Component")) {
                var arr = container.$Component[8 /* skin */].$elementsContent;
                var idx = arr.indexOf(target);
                if (idx > -1) {
                    arr.splice(idx, 1);
                }
            }
        };
        return AddItems;
    }());
    eui.AddItems = AddItems;
    __reflect(AddItems.prototype, "eui.AddItems", ["eui.IOverride"]);
})(eui || (eui = {}));
//# sourceMappingURL=AddItems.js.map