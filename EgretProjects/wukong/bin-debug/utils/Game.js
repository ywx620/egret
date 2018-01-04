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
var cg;
(function (cg) {
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
    })(names = cg.names || (cg.names = {}));
    ;
})(cg || (cg = {}));
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.nameIndex = 0;
        _this.keyData = {};
        _this.walkNum = 500;
        _this.jumpNum = 500;
        _this.setSkinName("resource/map.exml");
        return _this;
    }
    Game.prototype.render = function () {
        this.initRole();
        this.initWorld();
        this.initKeyboard();
    };
    Game.prototype.initRole = function () {
        FrameAnimation.getIns().loop();
        FrameAnimation.getIns().addFactoryByName("wukong");
        this.names = ["stand", "walk", "run", "atk", "hurt", "jump", "jumpTwo", "jumpDown"];
        //egret.log(cg.names[cg.names.atk]=="atk")
        this.role = FrameAnimation.getIns().getAnimationSpriteByName(this.names[this.nameIndex]);
        this.role.x = 200;
        this.role.y = 200;
        this.addChild(this.role);
    };
    Game.prototype.initWorld = function () {
        var world = new P2World();
        world.loopBackFun = this.loop.bind(this);
        world.isDebug = false; //是否显示刚体现状
        this.addChild(world);
        for (var i = 0; i < this.numChildren; i++) {
            var image = this.getChildAt(i);
            if (image instanceof eui.Image) {
                world.index++;
                var body;
                if (image.name != "bg") {
                    body = world.createBoxBodyShape(image.width, image.height, world.index, p2.Body.KINEMATIC);
                    world.drawSkin(body);
                    image.visible = false;
                }
                if (body) {
                    body.position[0] = image.x;
                    body.position[1] = image.y;
                }
            }
        }
        var role = this.role;
        world.index++;
        body = world.createBoxCircleBodyShape(role.width, role.height, world.index);
        body.fixedRotation = true;
        world.drawSkin(body);
        body.position[0] = role.x;
        body.position[1] = role.y;
        this.bodyRole = body;
        role.name = body.id + "";
        world.skins.push(role);
    };
    Game.prototype.initKeyboard = function () {
        this.kb = new KeyBoard();
        //添加监听事件
        this.kb.addEventListener(KeyBoard.onkeydown, this.onkeydown, this);
        //使用自身的按键松开事件
        this.addKeyboardEvent("keyup", this.onkeyup);
        //KeyBoard的键盘按键被松开时的事件不起作用
        //this.kb.addEventListener(KeyBoard.onkeyup,this.onkeyup,this);
        //移除事件监听
        //kb.removeEventListener(KeyBoard.onkeydown,this.onkeydown,this);
        //egret.log(KeyBoard.onkeydown,KeyBoard.onkeyup);
    };
    Game.prototype.getTimer = function () {
        var d = new Date();
        return d.getTime();
    };
    Game.prototype.addKey = function (key) {
        var keyData = this.keyData;
        var keyCode = key;
        if (!keyData.hasOwnProperty(keyCode)) {
            var kd = { keyCode: keyCode };
            keyData[keyCode] = kd;
            if (keyCode == KeyBoard.A || keyCode == KeyBoard.D || keyCode == KeyBoard.K) {
                kd["time"] = this.getTimer();
                kd["value"] = 0;
            }
            else {
                kd["value"] = -1;
            }
        }
        else {
            kd = keyData[keyCode];
            if (keyCode == KeyBoard.K) {
                kd["value"] = 2;
            }
            else {
                var startTime = kd["time"];
                var endTime = this.getTimer();
                if (endTime - startTime <= 200) {
                    kd["value"] = 2;
                }
                else {
                    kd["value"] = -1;
                }
            }
        }
    };
    Game.prototype.removeKey = function (key) {
        var keyData = this.keyData;
        var keyCode = key;
        var kd = keyData[keyCode];
        if (kd && kd.hasOwnProperty("value")) {
            var value = kd["value"];
            if (value == 2 || value == -1) {
                delete keyData[keyCode];
            }
            else {
                kd["value"] = 1;
            }
        }
        if (keyCode == "-1") {
            for (var keyCode in keyData) {
                delete keyData[keyCode];
            }
        }
    };
    Game.prototype.onkeydown = function (event) {
        //获取的按键数据为一个数组
        //egret.log(event.data);
        var nameIndex = this.nameIndex;
        var names = this.names;
        var role = this.role;
        var body = this.bodyRole;
        var walkNum = this.walkNum;
        var jumpNum = this.jumpNum;
        if (this.kb.isContain(event.data, KeyBoard.A)) {
            if (role.scaleX != -1) {
                role.scaleX = -1;
            }
            this.updateRole(cg.names.walk);
            if (this.nameIndex == cg.names.walk) {
                this.bodyRole.applyForce([-walkNum, 0], [0, 0]);
            }
        }
        else if (this.kb.isContain(event.data, KeyBoard.D)) {
            if (role.scaleX != 1) {
                role.scaleX = 1;
            }
            this.updateRole(cg.names.walk);
            if (this.nameIndex == cg.names.walk) {
                this.bodyRole.applyForce([walkNum, 0], [0, 0]);
            }
        }
        if (this.kb.isContain(event.data, KeyBoard.K)) {
            if (nameIndex != cg.names.jump) {
                this.updateRole(cg.names.jump);
                this.bodyRole.applyImpulse([0, -jumpNum], [0, 0]);
            }
        }
        this.addKey(event.data[0]);
    };
    Game.prototype.updateRole = function (index) {
        if (this.nameIndex == cg.names.jump || this.nameIndex == cg.names.jumpDown) {
            if (index == cg.names.walk)
                return;
        }
        if (index != this.nameIndex) {
            //egret.log("index",index,this.nameIndex)
            this.role = FrameAnimation.getIns().getAnimationSpriteByName(this.names[index]);
            this.nameIndex = index;
            if (index == cg.names.stand) {
                this.bodyRole.velocity[0] = 0;
                this.bodyRole.velocity[1] = 0;
                this.removeKey("-1");
            }
            if (index == cg.names.walk) {
                var sx = this.role.scaleX;
                this.bodyRole.applyImpulse([sx * 350, 0], [0, 0]);
            }
        }
    };
    Game.prototype.onkeyup = function (data) {
        //egret.log(data.keyCode,this,data.self,KeyBoard.D);
        var self = data.self;
        var key = data.key;
        key = key.toUpperCase();
        self.removeKey(key);
        //egret.log(key==KeyBoard.D)
        //var body:p2.Body=self.bodyRole;
        // self.role=FrameAnimation.getIns().getAnimationSpriteByName("wukong",self.names[self.nameIndex]);
    };
    Game.prototype.loop = function () {
        //this.bodyRole;
        var body = this.bodyRole;
        var vx = Math.round(body.velocity[0]);
        var vy = Math.round(body.velocity[1]);
        var walkNum = this.walkNum;
        var jumpNum = this.jumpNum;
        if (vy > 0) {
            this.updateRole(cg.names.jumpDown);
        }
        else if (vy < -jumpNum) {
            this.updateRole(cg.names.jump);
        }
        var isStand = true;
        var keyData = this.keyData;
        for (var keyCode in keyData) {
            isStand = false;
            var kd = keyData[keyCode];
            egret.log("keyCode", keyCode, kd["value"]);
            if (kd && kd.hasOwnProperty("value")) {
                if (kd["value"] == 2) {
                    switch (keyCode) {
                        case KeyBoard.A:
                        case KeyBoard.D:
                            this.updateRole(cg.names.run);
                            break;
                        case KeyBoard.K:
                            this.updateRole(cg.names.jumpTwo);
                            break;
                    }
                }
            }
        }
        if (Math.abs(vy) < 30 && isStand) {
            this.updateRole(cg.names.stand);
        }
    };
    return Game;
}(BasicComponent));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map