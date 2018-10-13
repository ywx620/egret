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
    /**
     * Easing function set. Different easing functions are used to make an animation proceed according to the corresponding equation
     * @see http://edn.egret.com/cn/index.php/article/index/id/53 Easing effect Demo
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 缓动函数集合，使用不同的缓动函数使得动画按照对应的方程进行
     * @see http://edn.egret.com/cn/index.php/article/index/id/53 缓动效果演示
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    var Ease = (function () {
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        function Ease() {
            egret.$error(1014);
        }
        /**
         * get.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * get。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.get = function (amount) {
            if (amount < -1) {
                amount = -1;
            }
            if (amount > 1) {
                amount = 1;
            }
            return function (t) {
                if (amount == 0) {
                    return t;
                }
                if (amount < 0) {
                    return t * (t * -amount + 1 + amount);
                }
                return t * ((2 - t) * amount + (1 - amount));
            };
        };
        /**
         * get pow in.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * get pow in。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.getPowIn = function (pow) {
            return function (t) {
                return Math.pow(t, pow);
            };
        };
        /**
         * get pow out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * get pow out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.getPowOut = function (pow) {
            return function (t) {
                return 1 - Math.pow(1 - t, pow);
            };
        };
        /**
         * get pow in out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * get pow in out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.getPowInOut = function (pow) {
            return function (t) {
                if ((t *= 2) < 1)
                    return 0.5 * Math.pow(t, pow);
                return 1 - 0.5 * Math.abs(Math.pow(2 - t, pow));
            };
        };
        /**
         * sine in.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * sine in。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.sineIn = function (t) {
            return 1 - Math.cos(t * Math.PI / 2);
        };
        /**
         * sine out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * sine out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.sineOut = function (t) {
            return Math.sin(t * Math.PI / 2);
        };
        /**
         * sine in out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * sine in out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.sineInOut = function (t) {
            return -0.5 * (Math.cos(Math.PI * t) - 1);
        };
        /**
         * get back in.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * get back in。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.getBackIn = function (amount) {
            return function (t) {
                return t * t * ((amount + 1) * t - amount);
            };
        };
        /**
         * get back out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * get back out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.getBackOut = function (amount) {
            return function (t) {
                return (--t * t * ((amount + 1) * t + amount) + 1);
            };
        };
        /**
         * get back in out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * get back in out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.getBackInOut = function (amount) {
            amount *= 1.525;
            return function (t) {
                if ((t *= 2) < 1)
                    return 0.5 * (t * t * ((amount + 1) * t - amount));
                return 0.5 * ((t -= 2) * t * ((amount + 1) * t + amount) + 2);
            };
        };
        /**
         * circ in.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * circ in。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.circIn = function (t) {
            return -(Math.sqrt(1 - t * t) - 1);
        };
        /**
         * circ out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * circ out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.circOut = function (t) {
            return Math.sqrt(1 - (--t) * t);
        };
        /**
         * circ in out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * circ in out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.circInOut = function (t) {
            if ((t *= 2) < 1) {
                return -0.5 * (Math.sqrt(1 - t * t) - 1);
            }
            return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        };
        /**
         * bounce in.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * bounce in。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.bounceIn = function (t) {
            return 1 - Ease.bounceOut(1 - t);
        };
        /**
         * bounce out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * bounce out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.bounceOut = function (t) {
            if (t < 1 / 2.75) {
                return (7.5625 * t * t);
            }
            else if (t < 2 / 2.75) {
                return (7.5625 * (t -= 1.5 / 2.75) * t + 0.75);
            }
            else if (t < 2.5 / 2.75) {
                return (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375);
            }
            else {
                return (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
            }
        };
        /**
         * bounce in out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * bounce in out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.bounceInOut = function (t) {
            if (t < 0.5)
                return Ease.bounceIn(t * 2) * .5;
            return Ease.bounceOut(t * 2 - 1) * 0.5 + 0.5;
        };
        /**
         * get elastic in.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * get elastic in。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.getElasticIn = function (amplitude, period) {
            var pi2 = Math.PI * 2;
            return function (t) {
                if (t == 0 || t == 1)
                    return t;
                var s = period / pi2 * Math.asin(1 / amplitude);
                return -(amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * pi2 / period));
            };
        };
        /**
         * get elastic out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * get elastic out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.getElasticOut = function (amplitude, period) {
            var pi2 = Math.PI * 2;
            return function (t) {
                if (t == 0 || t == 1)
                    return t;
                var s = period / pi2 * Math.asin(1 / amplitude);
                return (amplitude * Math.pow(2, -10 * t) * Math.sin((t - s) * pi2 / period) + 1);
            };
        };
        /**
         * get elastic in out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * get elastic in out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.getElasticInOut = function (amplitude, period) {
            var pi2 = Math.PI * 2;
            return function (t) {
                var s = period / pi2 * Math.asin(1 / amplitude);
                if ((t *= 2) < 1)
                    return -0.5 * (amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * pi2 / period));
                return amplitude * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * pi2 / period) * 0.5 + 1;
            };
        };
        /**
         * quad in.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * quad in。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.quadIn = Ease.getPowIn(2);
        /**
         * quad out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * quad out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.quadOut = Ease.getPowOut(2);
        /**
         * quad in out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * quad in out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.quadInOut = Ease.getPowInOut(2);
        /**
         * cubic in.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * cubic in。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.cubicIn = Ease.getPowIn(3);
        /**
         * cubic out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * cubic out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.cubicOut = Ease.getPowOut(3);
        /**
         * cubic in out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * cubic in out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.cubicInOut = Ease.getPowInOut(3);
        /**
         * quart in.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * quart in。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.quartIn = Ease.getPowIn(4);
        /**
         * quart out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * quart out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.quartOut = Ease.getPowOut(4);
        /**
         * quart in out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * quart in out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.quartInOut = Ease.getPowInOut(4);
        /**
         * quint in.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * quint in。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.quintIn = Ease.getPowIn(5);
        /**
         * quint out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * quint out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.quintOut = Ease.getPowOut(5);
        /**
         * quint in out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * quint in out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.quintInOut = Ease.getPowInOut(5);
        /**
         * back in.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * back in。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.backIn = Ease.getBackIn(1.7);
        /**
         * back out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * back out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.backOut = Ease.getBackOut(1.7);
        /**
         * back in out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * back in out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.backInOut = Ease.getBackInOut(1.7);
        /**
         * elastic in.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * elastic in。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.elasticIn = Ease.getElasticIn(1, 0.3);
        /**
         * elastic out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * elastic out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.elasticOut = Ease.getElasticOut(1, 0.3);
        /**
         * elastic in out.See example.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * elastic in out。请查看示例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Ease.elasticInOut = Ease.getElasticInOut(1, 0.3 * 1.5);
        return Ease;
    }());
    egret.Ease = Ease;
    __reflect(Ease.prototype, "egret.Ease");
})(egret || (egret = {}));
//# sourceMappingURL=Ease.js.map