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
var GameParkourAction;
(function (GameParkourAction) {
    var names;
    (function (names) {
        names[names["stand"] = 0] = "stand";
        names[names["walk"] = 1] = "walk";
        names[names["run"] = 2] = "run";
        names[names["atk"] = 3] = "atk";
        names[names["hurt"] = 4] = "hurt";
        names[names["jump"] = 5] = "jump";
        names[names["jumpTwo"] = 6] = "jumpTwo";
        names[names["jumpDown"] = 7] = "jumpDown";
    })(names = GameParkourAction.names || (GameParkourAction.names = {}));
    ;
})(GameParkourAction || (GameParkourAction = {}));
var GameParkour = (function (_super) {
    __extends(GameParkour, _super);
    function GameParkour() {
        var _this = _super.call(this) || this;
        _this.roleMaterial = new p2.Material();
        _this.stoneMaterial = new p2.Material();
        _this.speed = 100;
        _this.stones = [];
        _this.jumpNum = 2;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this); //只帧听一次然后自动删除
        return _this;
    }
    GameParkour.prototype.addToStage = function () {
        this.addChild(moon.MoonUI.getRect(this.stage.stageWidth, this.stage.stageHeight, 0XFFFFFF));
        FrameAnimation.getIns().loop();
        FrameAnimation.getIns().addFactoryByName("wukong");
        this.names = [
            GameParkourAction.names[0],
            GameParkourAction.names[1],
            GameParkourAction.names[2],
            GameParkourAction.names[3],
            GameParkourAction.names[4],
            GameParkourAction.names[5],
            GameParkourAction.names[6],
            GameParkourAction.names[7]
        ];
        this.createAction(GameParkourAction.names.jumpDown);
        // this.roleDisplay.x=200;
        // this.roleDisplay.y=200;
        // this.addChild(this.roleDisplay);
        this.createP2World();
        this.gameInit();
    };
    GameParkour.prototype.gameInit = function () {
        if (this.btnStart == null) {
            var btn = new eui.Button();
            btn.label = "开始";
            btn.x = (this.stage.stageWidth - btn.width) >> 1;
            btn.y = (this.stage.stageHeight - btn.height) >> 1;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
            this.btnStart = btn;
        }
        this.speed = 100;
        this.jumpNum = 0;
        this.distance = 0;
        this.addChild(this.btnStart);
        this.initStone();
    };
    GameParkour.prototype.gameStart = function () {
        this.removeChild(this.btnStart);
        this.isPlay = true;
        this.createAction(GameParkourAction.names.run);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onLoop, this);
    };
    GameParkour.prototype.gameOver = function () {
        this.isPlay = false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onLoop, this);
        //moon.showLog.getIns().log("gameOver");
        this.gameInit();
    };
    GameParkour.prototype.initStone = function () {
        for (var i = 0; i < this.stones.length; i++) {
            var body = this.stones[i];
            if (body.userData && body.userData.skin) {
                var skin = body.userData.skin;
                if (skin && skin.parent != null) {
                    skin.parent.removeChild(skin);
                }
                //body.userData=null;
            }
            body.velocity = [0, 0];
            this.p2World.removeBodys.push(body);
        }
        this.stones.length = 0;
        this.createAction(GameParkourAction.names.run);
        this.roleBody.position = [100, 330];
        this.roleBody.velocity = [0, 0];
        var w = 400;
        var h = 300;
        this.stones.push(this.createStone(w, h, 0));
        var prevx = w;
        for (var i = 0; i < 5; i++) {
            var w = Math.random() * 200 + 200;
            var h = Math.random() * 150 + 150;
            this.stones.push(this.createStone(w, h, prevx));
            prevx += w * 1.2 + Math.random() * 100 + 100;
        }
    };
    GameParkour.prototype.createP2World = function () {
        var bg = new eui.Image("zm5Bg_png");
        bg.width = this.stage.stageWidth;
        bg.height = this.stage.stageHeight;
        this.addChild(bg);
        var world = new P2World(0, 200);
        world.world.on("beginContact", this.beginContact.bind(this));
        //world.isDebug=false;
        world.createWall(new egret.Rectangle(0, 0, this.width, this.height));
        this.addChild(world);
        var role = world.createBoxCircleBodyShape(100, 100);
        //var role:p2.Body=world.createBoxBodyShape(100,100);
        //role.shapes[0].position[1]=-50;
        role.fixedRotation = true;
        role.mass = 20;
        role.userData.skin = this.roleDisplay;
        role.userData.name = "role";
        role.shapes[0].material = this.roleMaterial;
        //world.drawSkin(role);
        this.addChild(this.roleDisplay);
        this.p2World = world;
        this.roleBody = role;
        //中间的透明阻挡物
        this.createStone(20, this.stage.stageHeight, this.stage.stageWidth >> 1, "middle");
    };
    GameParkour.prototype.createAction = function (index) {
        this.roleDisplay = FrameAnimation.getIns().getAnimationSpriteByName(this.names[index]);
        this.addChild(this.roleDisplay);
    };
    GameParkour.prototype.addStone = function () {
        var body = this.stones[this.stones.length - 1];
        var prevx = body.position[0];
        var w = Math.random() * 200 + 200;
        var h = Math.random() * 150 + 150;
        prevx += w * 1.2 + Math.random() * 100 + this.speed;
        this.stones.push(this.createStone(w, h, prevx));
    };
    GameParkour.prototype.createStone = function (width, height, x, name) {
        if (name === void 0) { name = null; }
        var stageH = this.stage.stageHeight;
        var image = new eui.Image("zm5Ft_png");
        image.scale9Grid = new egret.Rectangle(70, 35, 2, 2);
        image.height = height;
        image.width = width;
        this.addChild(image);
        image.anchorOffsetX = image.width >> 1;
        image.anchorOffsetY = (image.height >> 1) + 15;
        if (name == "middle") {
            image.visible = false;
        }
        var y = stageH - (image.height >> 1);
        image.x = x;
        image.y = y;
        var body = this.p2World.createBoxBodyShape(image.width, image.height, p2.Body.KINEMATIC);
        body.userData.skin = image;
        body.userData.name = name || "stone";
        body.position = [x, y];
        body.shapes[0].material = this.stoneMaterial;
        var roleAndStoneMaterial = new p2.ContactMaterial(this.roleMaterial, this.stoneMaterial, { restitution: 0, friction: 0 }); //弹性，摩擦力
        this.p2World.world.addContactMaterial(roleAndStoneMaterial);
        return body;
    };
    GameParkour.prototype.onClick = function (e) {
        this.createAction(GameParkourAction.names.jump);
        if (this.jumpNum < 2) {
            this.jumpNum++;
            //var vy:number=Math.abs(this.roleBody.velocity[1]);
            //vy=vy>100?100:vy;
            //var y=-1*(vy*10+3000);
            //moon.showLog.getIns().logMessage("y="+this.roleBody.velocity[1]+",vy="+vy);
            this.roleBody.velocity[1] = 0;
            var y = -3000;
            this.roleBody.applyImpulse([0, y], [0, 0]);
            if (this.jumpNum == 2) {
                this.createAction(GameParkourAction.names.jumpTwo);
            }
        }
    };
    GameParkour.prototype.beginContact = function (e) {
        // egret.log(e.shapeA,e.bodyA.userData.name)
        // egret.log(e.shapeB,e.bodyB.userData.name)
        var nameA = e.bodyA.userData.name;
        var nameB = e.bodyB.userData.name;
        var yA = e.bodyA.position[1];
        var yB = e.bodyB.position[1];
        var bodyA = e.bodyA;
        var bodyB = e.bodyB;
        //moon.showLog.getIns().log("nameA="+hA+",nameB="+hB);
        //egret.log(bodyA.getAABB().lowerBound,bodyB.getAABB().upperBound);
        if (nameA == "stone" || nameB == "stone") {
            var isRun = false;
            if (nameA == "stone") {
                yA = bodyA.getAABB().lowerBound[1];
                yB = bodyB.getAABB().upperBound[1];
            }
            else {
                yA = bodyA.getAABB().upperBound[1];
                yB = bodyB.getAABB().lowerBound[1];
            }
            // egret.log(Math.abs(yA-yB))
            if (Math.abs(yA - yB) < 20) {
                isRun = true;
            }
            else {
                this.gameOver();
            }
        }
        if (isRun) {
            this.jumpNum = 0;
            if (this.isPlay) {
                this.createAction(GameParkourAction.names.run);
            }
            else {
                this.createAction(GameParkourAction.names.stand);
            }
        }
    };
    GameParkour.prototype.onLoop = function () {
        var vy = this.roleBody.velocity[1];
        var posY = this.roleBody.position[1];
        if (vy > 100) {
            this.createAction(GameParkourAction.names.jumpDown);
        }
        if (posY > this.stage.stageHeight) {
            this.gameOver();
        }
        else {
            var bodys = this.p2World.world.bodies;
            var l = bodys.length;
            trace("奔跑:" + this.distance + "米");
            this.distance += Math.floor(this.speed / 100);
            for (var i = 0; i < l; i++) {
                var body = bodys[i];
                if (body.userData) {
                    if (body.userData.name == "stone") {
                        var stoneW = body.userData.skin.width;
                        body.velocity[0] = -this.speed;
                        this.roleBody.velocity[0] = this.speed * 1.2;
                        if (body.position[0] < -stoneW) {
                            this.p2World.removeBodys.push(body);
                            this.speed += 10;
                            this.addStone();
                        }
                    }
                }
            }
        }
    };
    return GameParkour;
}(egret.DisplayObjectContainer));
__reflect(GameParkour.prototype, "GameParkour");
//# sourceMappingURL=GameParkour.js.map