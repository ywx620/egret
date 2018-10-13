var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/** 卡片翻转类
 * 传入正背面卡牌
*/
var CardTurn = (function (_super) {
    __extends(CardTurn, _super);
    function CardTurn(cardFront, cardBack) {
        var _this = _super.call(this) || this;
        _this.cardFront = cardFront;
        _this.cardBack = cardBack;
        _this.setStatus(CardTurn.CARD_FRONT);
        return _this;
    }
    /**设置状态，只有两个状态一个正面一个背面 */
    CardTurn.prototype.setStatus = function (status) {
        this.status = status;
        this.show();
    };
    /**是否是正面*/
    CardTurn.prototype.isFront = function () {
        return this.status == CardTurn.CARD_FRONT;
    };
    /**开始翻转，默认翻转时间是100毫秒 */
    CardTurn.prototype.turn = function (time) {
        if (time === void 0) { time = 100; }
        if (this.scaleX == 1) {
            this.tween = egret.Tween.get(this);
            this.tween.to({ scaleX: 0 }, time);
            this.tween.call(this.call1, this);
            this.tween.wait(10).to({ scaleX: 1 }, time); //翻页完等10毫秒后再翻页
            this.tween.call(this.call2, this);
        }
    };
    /**第一次翻页结束后修改状态 */
    CardTurn.prototype.call1 = function () {
        this.status = this.status == CardTurn.CARD_FRONT ? CardTurn.CARD_BACK : CardTurn.CARD_FRONT;
        this.setStatus(this.status);
    };
    /**第二次翻页结束后删除动画 */
    CardTurn.prototype.call2 = function () {
        egret.Tween.removeTweens(this);
        if (this.onTurnComplete != null) {
            this.onTurnComplete();
        }
    };
    CardTurn.prototype.show = function () {
        this.removeChildren();
        if (this.status == CardTurn.CARD_FRONT) {
            this.addChild(this.cardFront);
        }
        else {
            this.addChild(this.cardBack);
        }
    };
    CardTurn.CARD_FRONT = "front";
    CardTurn.CARD_BACK = "back";
    return CardTurn;
}(egret.DisplayObjectContainer));
__reflect(CardTurn.prototype, "CardTurn");
//# sourceMappingURL=DisplayManager.js.map