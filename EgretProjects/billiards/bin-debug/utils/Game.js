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
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.power = 1;
        _this.setSkinName("resource/eui_game.exml");
        SoundControl.getIns().addItem("hole_mp3");
        SoundControl.getIns().addItem("hit_mp3");
        return _this;
    }
    Game.prototype.render = function () {
        var world = new P2World();
        this.world = world;
        this.addChild(world);
        world.isDebug = false;
        var BALL = Math.pow(2, 0), //1000
        WALL = Math.pow(2, 1), //0100
        HOLE = Math.pow(2, 2); //0010
        var ballMaterial = new p2.Material();
        var wallMaterial = new p2.Material();
        this.label = new egret.TextField();
        this.label.text = "力度：" + this.power;
        this.addChild(this.label);
        var control = new egret.TextField();
        control.text = "拖动手指来控制力量";
        control.x = 200;
        this.addChild(control);
        for (var i = 0; i < this.numChildren; i++) {
            var image = this.getChildAt(i);
            if (image instanceof eui.Image) {
                var body;
                var names = image.name.split("_");
                var shape;
                if (names[0] == "ball") {
                    //image.width=image.height=42;
                    body = world.createCircleBodyShape(image.width / 2);
                    shape = body.shapes[0];
                    body.userData = image;
                    if (names[1] == "0") {
                        this.ball = body;
                    }
                    shape.material = ballMaterial;
                    // shape.collisionGroup=WALL;
                }
                else if (image.name != "bg") {
                    var angle = image.rotation * Math.PI / 180;
                    body = world.createBoxBodyShape(image.width, image.height, p2.Body.KINEMATIC, angle);
                    shape = body.shapes[0];
                    body.userData = image;
                    image.visible = false;
                    shape.material = wallMaterial;
                }
                if (body) {
                    body.damping = 0.2;
                    body.angularDamping = 0.3;
                    body.mass = 500;
                    world.drawSkin(body);
                    body.position[0] = image.x;
                    body.position[1] = image.y;
                    body.inertia = 0;
                }
            }
        }
        //球与球的弹性
        var ballAndBallMaterial = new p2.ContactMaterial(ballMaterial, ballMaterial, { restitution: 0.8 }); //弹性
        world.p2World.addContactMaterial(ballAndBallMaterial);
        //球与桌边的弹性
        var ballAndWallMaterial = new p2.ContactMaterial(ballMaterial, wallMaterial, { restitution: 0.5 }); //弹性
        world.p2World.addContactMaterial(ballAndWallMaterial);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onClick, this);
        world.p2World.on("beginContact", this.beginContact.bind(this));
    };
    Game.prototype.onClick = function (e) {
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            this.startPoint = new egret.Point(e.stageX, e.stageY);
        }
        else if (e.type == egret.TouchEvent.TOUCH_MOVE) {
            var endPoint = new egret.Point(e.stageX, e.stageY);
            var xx = endPoint.x - this.startPoint.x;
            var yy = endPoint.y - this.startPoint.y;
            var dd = Math.sqrt(xx * xx + yy * yy);
            this.power = dd * 0.05;
            this.label.text = "力量：" + Math.floor(this.power);
        }
        else if (e.type == egret.TouchEvent.TOUCH_END) {
            var ran = this.power; //Math.random()*2+2;
            var x1 = this.ball.position[0];
            var y1 = this.ball.position[1];
            var x2 = this.startPoint.x - x1;
            var y2 = this.startPoint.y - y1;
            var ds = Math.sqrt(x2 * x2 + y2 * y2);
            var x = x2 * ran;
            var y = y2 * ran;
            this.ball.applyImpulse([x, y], [5, 0]);
        }
        //this.ball.applyForce([x,y],[0,0]);
    };
    Game.prototype.beginContact = function (e) {
        // egret.log(e.shapeA,e.bodyA.userData.name)
        // egret.log(e.shapeB,e.bodyB.userData.name)
        var nameA = e.bodyA.userData.name;
        var nameB = e.bodyB.userData.name;
        var body;
        var xA = e.bodyA.velocity[0];
        var yA = e.bodyA.velocity[1];
        var xB = e.bodyB.velocity[0];
        var yB = e.bodyB.velocity[1];
        var v = Math.sqrt(Math.abs(xA * xB) + Math.abs(yA * yB));
        if (v > 50) {
            SoundControl.getIns().play("hit_mp3");
        }
        if (nameA == "hole") {
            if (nameB == "ball_0") {
                body = e.bodyB;
            }
            else {
                this.world.removeBodys.push(e.bodyB);
                SoundControl.getIns().play("hole_mp3");
            }
        }
        else if (nameB == "hole") {
            if (nameA == "ball_0") {
                body = e.bodyA;
            }
            else {
                this.world.removeBodys.push(e.bodyA);
                SoundControl.getIns().play("hole_mp3");
            }
        }
        if (body != null) {
            body.position = [800, 300];
            body.velocity = [0, 0];
            body.force = [0, 0];
            body.angularForce = 0;
            SoundControl.getIns().play("hole_mp3");
        }
    };
    return Game;
}(BasicComponent));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map