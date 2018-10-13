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
var TestFromPolygon = (function (_super) {
    __extends(TestFromPolygon, _super);
    function TestFromPolygon() {
        var _this = _super.call(this) || this;
        _this.points = new Array();
        return _this;
    }
    TestFromPolygon.prototype.onAppReady = function () {
        this.createWorld();
        this.createFourWall();
        this.createDebug();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchEventHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEventHandler, this);
        this.createBody();
    };
    TestFromPolygon.prototype.createWorld = function () {
        var wrd = new p2.World();
        wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0, 100];
        this.world = wrd;
    };
    TestFromPolygon.prototype.createFourWall = function () {
        var size = 10;
        var width = this.stage.stageWidth;
        var height = this.stage.stageHeight;
        var w2 = width / 2;
        var h2 = height / 2;
        var world = this.world;
        createOneWall(new egret.Rectangle(w2, 0, width, size)); //上
        createOneWall(new egret.Rectangle(w2, height, width, size)); //下
        createOneWall(new egret.Rectangle(0, h2, size, height));
        createOneWall(new egret.Rectangle(width, h2, size, height));
        function createOneWall(rect) {
            var groundShape = new p2.Box({ width: rect.width, height: rect.height });
            var groundBody = new p2.Body({ mass: 0 });
            groundBody.addShape(groundShape);
            groundBody.position = [rect.x, rect.y];
            world.addBody(groundBody);
        }
    };
    TestFromPolygon.prototype.createGround = function () {
        var groundShape = new p2.Box({ width: this.stage.stageWidth, height: 10 });
        var groundBody = new p2.Body();
        groundBody.addShape(groundShape);
        groundBody.type = p2.Body.STATIC;
        groundBody.position = [this.stage.stageWidth / 2, this.stage.stageHeight];
        groundBody.angle = Math.PI;
        this.world.addBody(groundBody);
    };
    TestFromPolygon.prototype.createBody = function () {
        var shape = new p2.Circle({ radius: Math.random() * 20 + 30 });
        var body = new p2.Body({ mass: 10 });
        body.addShape(shape);
        body.position = [Math.random() * 200, Math.random() * 200];
        body.angle = Math.PI;
        this.world.addBody(body);
    };
    TestFromPolygon.prototype.loop = function () {
        this.world.step(1 / 60);
        this.debugDraw.drawDebug();
        if (this.points.length > 1)
            this.debugDraw.drawConvex(this.points, 0x000000, 1, false);
    };
    TestFromPolygon.prototype.touchEventHandler = function (te) {
        var mousePos = new Array(te.stageX / this.factor, te.stageY / this.factor);
        switch (te.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this.prePoint = this.copyPoint(mousePos);
                this.points.push(this.prePoint, this.prePoint);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchEventHandler, this);
                break;
            case egret.TouchEvent.TOUCH_END:
                this.createConvexBody();
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchEventHandler, this);
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                var dis = p2.vec2.dist(mousePos, this.prePoint);
                if (dis > 30 / this.factor) {
                    this.points.push(this.prePoint);
                    this.prePoint = this.copyPoint(mousePos);
                    this.points[this.points.length - 1] = this.copyPoint(mousePos);
                }
                else {
                    this.points[this.points.length - 1] = this.copyPoint(mousePos);
                }
                break;
        }
    };
    TestFromPolygon.prototype.createConvexBody = function () {
        /* 错误的做法，使用Convex形状，创建多边形.
        var triangleShape: p2.Convex = new p2.Convex({vertices:this.points});
        var body: p2.Body = new p2.Body({ mass: 1, position:[100/this.factor,100/this.factor] });
        body.addShape(triangleShape);
        */
        //正确的做法，使用fromPolygon()函数，来创建刚体
        var body = new p2.Body({ mass: 10 });
        body.fromPolygon(this.points, { optimalDecomp: false });
        this.world.addBody(body);
        this.points = [];
    };
    TestFromPolygon.prototype.copyPoint = function (p) {
        return new Array(p[0], p[1]);
    };
    return TestFromPolygon;
}(AbstractP2Test));
__reflect(TestFromPolygon.prototype, "TestFromPolygon");
//# sourceMappingURL=TestFromPolygon.js.map