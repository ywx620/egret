var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var P2Camera = (function (_super) {
    __extends(P2Camera, _super);
    function P2Camera() {
        var _this = _super.call(this) || this;
        //this.setSkinName("resource/askins/P2CameraSkin.exml")
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    P2Camera.prototype.render = function () {
        var bg = new eui.Image("bg_jpg");
        bg.width = this.stage.stageWidth * 1.2;
        bg.height = this.stage.stageHeight * 1.2;
        this.addChild(bg);
        var world = new P2World(0, 200);
        //world.isDebug=false;
        world.createWall(new egret.Rectangle(0, 0, this.width, this.height));
        this.addChild(world);
        var ball = world.createCircleBodyShape(50);
        ball.mass = 10;
        //world.drawSkin(ball);
        var shape = new egret.Shape();
        shape.graphics.lineStyle(1, 0XFF0000);
        shape.graphics.beginFill(0xffff00);
        shape.graphics.drawCircle(0, 0, 50);
        shape.graphics.drawCircle(20, 10, 10);
        shape.graphics.endFill();
        this.addChild(shape);
        ball.userData.skin = shape;
        world.drawSkin(world.createConvexBodyShape([[0, -150], [150, 150], [-150, 150]]));
        world.drawSkin(world.createConvexBodyShape([[-100, -100], [100, -100], [100, 100], [-10, 100]]));
        world.drawSkin(world.createConvexBodyShape([[-10, -10], [100, -10], [100, 100], [-10, 10]]));
        world.drawSkin(world.createBoxBodyShape(150, 100));
        world.drawSkin(world.createPolygon(8, 50));
        // var body:p2.Body=world.createConvexBodyShape([[0,-150], [150,150], [-150,150]],p2.Body.STATIC)
        // world.drawSkin(body);
        // body.position=[500,600];
        // var body:p2.Body=world.createConvexBodyShape([[-10,-10], [100,-10], [100,100], [-10,10]],p2.Body.KINEMATIC)
        // world.drawSkin(body);
        // body.position=[800,200];
        var cameraRect = new egret.Rectangle(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        var camera = new control.Camera2D(ball.userData.skin, this, cameraRect);
        this.addEventListener(egret.Event.ENTER_FRAME, onLoop, this);
        function onLoop(e) {
            //body.velocity[0]++;
            camera.move();
        }
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, onClick, this);
        function onClick(e) {
            var ran = 2;
            var x1 = ball.position[0];
            var y1 = ball.position[1];
            var x2 = e.stageX - x1;
            var y2 = e.stageY - y1;
            var ds = Math.sqrt(x2 * x2 + y2 * y2);
            var x = x2 * ran;
            var y = y2 * ran;
            ball.applyImpulse([x, y], [0, 0]);
        }
    };
    return P2Camera;
}(BasicComponent));
__reflect(P2Camera.prototype, "P2Camera");
var P2Camera2 = (function (_super) {
    __extends(P2Camera2, _super);
    function P2Camera2() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        return _this;
    }
    P2Camera2.prototype.render = function () {
        var bg = new eui.Image("bg_jpg");
        bg.width = bg.height = 2000;
        this.addChild(bg);
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xff0000);
        shape.graphics.drawCircle(0, 0, 100);
        shape.graphics.endFill();
        this.addChild(shape);
        var cameraRect = new egret.Rectangle(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        var camera = new control.Camera2D(shape, this, cameraRect);
        this.addEventListener(egret.Event.ENTER_FRAME, onLoop, this);
        function onLoop(e) {
            if (shape.x + shape.width / 2 < 2000)
                shape.x += 10;
            if (shape.x + shape.width / 2 < 2000)
                shape.y += 10;
            camera.move();
        }
    };
    return P2Camera2;
}(BasicComponent));
__reflect(P2Camera2.prototype, "P2Camera2");
//# sourceMappingURL=P2Camera.js.map