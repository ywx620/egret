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
var P2Drag = (function (_super) {
    __extends(P2Drag, _super);
    function P2Drag() {
        return _super.call(this) || this;
    }
    P2Drag.prototype.onAppReady = function () {
        this.enableMouseDrag(new p2.World({ gravity: [0, 100] }));
        this.createFourWall();
        this.createDebug();
        this.createBody();
    };
    P2Drag.prototype.createBody = function () {
        var r = Math.random() * 20 + 30;
        var shape = new p2.Circle({ radius: r });
        var body = new p2.Body({ mass: 10 });
        body.addShape(shape);
        body.position = [Math.random() * 200 + 50, Math.random() * 200 + 50];
        body.angle = Math.PI;
        var sprite = new egret.Sprite();
        sprite.graphics.beginFill(0xffFF00);
        sprite.graphics.drawCircle(0, 0, r);
        sprite.graphics.endFill();
        sprite.alpha = 0.1;
        this.addChild(sprite);
        body.userData = { skin: sprite };
        this.world.addBody(body);
    };
    P2Drag.prototype.loop = function () {
        _super.prototype.loop.call(this);
        var bodys = this.world.bodies;
        var l = bodys.length;
        for (var i = 0; i < l; i++) {
            var body = bodys[i];
            if (body.userData && body.userData.skin) {
                var skin = body.userData.skin;
                skin.x = body.position[0];
                skin.y = body.position[1];
                skin.rotation = body.angle * 180 / Math.PI;
            }
        }
    };
    return P2Drag;
}(AbstractP2Test));
__reflect(P2Drag.prototype, "P2Drag");
//# sourceMappingURL=P2Drag.js.map