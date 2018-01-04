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
var P2Main = (function (_super) {
    __extends(P2Main, _super);
    function P2Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    P2Main.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        //鼠标点击添加刚体
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addOneBox, this);
        this.createWorld();
        this.createGround();
        this.createBodies();
        this.createDebug();
        egret.log(11);
    };
    P2Main.prototype.createWorld = function () {
        var wrd = new p2.World();
        wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0, 100];
        this.world = wrd;
    };
    P2Main.prototype.createGround = function () {
        var stageHeight = this.stage.stageHeight;
        var groundShape = new p2.Plane();
        var groundBody = new p2.Body();
        groundBody.mass = 0;
        groundBody.position[1] = stageHeight;
        groundBody.angle = Math.PI;
        groundBody.addShape(groundShape);
        this.world.addBody(groundBody);
    };
    P2Main.prototype.createBodies = function () {
        var boxShape = new p2.Box({ width: 100, height: 50 });
        var boxBody = new p2.Body({ mass: 1, position: [200, 200] });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);
        var boxShape = new p2.Box({ width: 50, height: 50 });
        var boxBody = new p2.Body({ mass: 1, position: [200, 180], angularVelocity: 1 });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);
    };
    P2Main.prototype.createDebug = function () {
        // egret.t//.getInstance().run();
        //创建调试试图
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        sprite.graphics.beginFill(0XFF0000);
        sprite.graphics.drawCircle(0, 0, 500);
        sprite.graphics.endFill();
        this.canvas = sprite;
        this.debugDraw = new p2DebugDraw(this.world, sprite);
    };
    P2Main.prototype.loop = function () {
        this.world.step(60 / 1000);
        this.debugDraw.drawDebug();
    };
    P2Main.prototype.addOneBox = function (e) {
        var positionX = Math.floor(e.stageX);
        var positionY = Math.floor(e.stageY);
        if (Math.random() > 0.5) {
            //添加方形刚体
            var boxShape = new p2.Box({ width: Math.random() * 150 + 50, height: 100 });
            var boxBody = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 1 });
            boxBody.addShape(boxShape);
            this.world.addBody(boxBody);
        }
        else {
            //添加圆形刚体
            var boxShape = new p2.Circle({ radius: 50 });
            var boxBody = new p2.Body({ mass: 1, position: [positionX, positionY] });
            boxBody.addShape(boxShape);
            this.world.addBody(boxBody);
        }
    };
    return P2Main;
}(egret.DisplayObjectContainer));
__reflect(P2Main.prototype, "P2Main");
//------------------------------------------
//------------------------------------------
var P2Main2 = (function (_super) {
    __extends(P2Main2, _super);
    function P2Main2() {
        var _this = _super.call(this) || this;
        _this.skins = [];
        _this.index = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    P2Main2.prototype.onClick = function (e) {
        this.index++;
        var random = Math.random();
        var radius = 20 + 20 * random;
        var body;
        if (random < 0.5) {
            body = this.createCircleBodyShape(radius, this.index);
            this.drawCircle(radius, body);
        }
        else {
            body = this.createBoxBodyShape(radius, radius, this.index);
            this.drawBox(radius, radius, body);
        }
        body.position = [e.stageX, e.stageY];
    };
    P2Main2.prototype.drawCircle = function (radius, body) {
        var skin = new egret.Sprite();
        skin.graphics.beginFill(0XFF0000, 0.5);
        skin.graphics.drawCircle(0, 0, radius);
        skin.graphics.endFill();
        skin.x = body.position[0];
        skin.y = body.position[1];
        skin.name = body.id + "";
        this.addChild(skin);
        this.skins.push(skin);
        return skin;
    };
    P2Main2.prototype.createCircleBodyShape = function (radius, id) {
        var body = new p2.Body({ mass: 1 });
        var shape = new p2.Circle({ radius: radius });
        body.addShape(shape);
        body.id = id;
        this.world.addBody(body);
        return body;
    };
    P2Main2.prototype.drawBox = function (width, height, body) {
        var skin = new egret.Sprite();
        skin.graphics.beginFill(0XFF0000, 0.5);
        skin.graphics.drawRect(-width / 2, -height / 2, width, height);
        skin.graphics.endFill();
        skin.x = body.position[0];
        skin.y = body.position[1];
        skin.name = body.id + "";
        this.addChild(skin);
        this.skins.push(skin);
        return skin;
    };
    P2Main2.prototype.createBoxBodyShape = function (width, height, id) {
        var body = new p2.Body({ mass: 1 });
        var shape = new p2.Box({ width: width, height: height });
        body.addShape(shape);
        body.id = id;
        this.world.addBody(body);
        return body;
    };
    P2Main2.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        var skin = new egret.Sprite();
        skin.graphics.beginFill(0, 0.5);
        skin.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        skin.graphics.endFill();
        this.addChild(skin);
        var world = new p2.World({
            gravity: [0, 800]
        });
        this.world = world;
        var groundShape = new p2.Plane();
        var groundBody = new p2.Body({
            mass: 0
        });
        groundBody.addShape(groundShape);
        groundBody.angle = Math.PI;
        groundBody.position[1] = this.stage.stageHeight;
        world.addBody(groundBody);
        var body = this.createBoxBodyShape(100, 100, 999);
        body.mass = 0;
        body.position = [0, this.stage.stageHeight - 100];
        this.drawBox(100, 100, body);
        var timeStep = 1 / 60;
        var skins = this.skins;
        egret.setInterval(function () {
            world.step(timeStep);
            var bodys = world.bodies;
            var l = bodys.length;
            var s = skins.length;
            for (var i = 0; i < l; i++) {
                var body = bodys[i];
                for (var j = 0; j < s; j++) {
                    var skin = skins[j];
                    if (body.id + "" == skin.name) {
                        skin.x = body.position[0];
                        skin.y = body.position[1];
                        skin.rotation = body.angle * 180 / Math.PI;
                    }
                }
            }
        }, this, 1000 * timeStep);
    };
    return P2Main2;
}(egret.DisplayObjectContainer));
__reflect(P2Main2.prototype, "P2Main2");
//# sourceMappingURL=P2test.js.map