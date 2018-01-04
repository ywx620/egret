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
var Const = (function (_super) {
    __extends(Const, _super);
    function Const() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Const.CHANGE_SCENE = 'CHANGE_SCENE';
    Const.GAME_OVER = 'GAME_OVER';
    Const.GAME_EXIT = "GAME_EXIT";
    return Const;
}(egret.HashObject));
__reflect(Const.prototype, "Const");
//使用prevMvc时要注意去掉头尾的几行
var GameProxy = (function (_super) {
    __extends(GameProxy, _super);
    function GameProxy() {
        var _this = _super.call(this, GameProxy.NAME) || this;
        _this._life = 0;
        return _this;
    }
    GameProxy.prototype.onRegister = function () {
        this._life = 10;
    };
    GameProxy.prototype.getLife = function () {
        return this._life;
    };
    GameProxy.prototype.setLife = function (life) {
        this._life = life;
    };
    GameProxy.prototype.incLife = function (cb) {
        this._life++;
    };
    GameProxy.prototype.decLife = function (cb) {
        this._life--;
        if (cb) {
            cb(this._life);
        }
        if (this._life == 0) {
            this.sendNotification(Const.GAME_OVER);
        }
    };
    GameProxy.NAME = 'GAME_PROXY';
    return GameProxy;
}(puremvc.Proxy));
__reflect(GameProxy.prototype, "GameProxy");
var GameMainScene = (function (_super) {
    __extends(GameMainScene, _super);
    function GameMainScene(width, height) {
        var _this = _super.call(this) || this;
        _this.width = width;
        _this.height = height;
        _this.init();
        return _this;
    }
    GameMainScene.prototype.init = function () {
        var text = new egret.TextField();
        text.text = 'Game Main Scene ';
        text.x = (this.width - text.width) * 0.5;
        text.y = 200;
        this.addChild(text);
        this._lifeText = new egret.TextField();
        this._lifeText.x = (this.width - this._lifeText.width) * 0.5;
        this._lifeText.y = 350;
        this.addChild(this._lifeText);
        var btn = new egret.TextField();
        btn.text = 'KILL';
        btn.x = (this.width - btn.width) * 0.5;
        ;
        btn.y = 300;
        btn.touchEnabled = true;
        this.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (this.onKill) {
                this.onKill();
            }
        }, this);
        btn = new egret.TextField();
        btn.text = 'EXIT';
        btn.x = this.width - 20 - btn.width;
        btn.y = this.height - 20 - btn.height;
        btn.touchEnabled = true;
        this.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (this.onchange) {
                this.onchange(Const.GAME_EXIT);
            }
        }, this);
    };
    GameMainScene.prototype.showLife = function (life) {
        this._lifeText.text = "LIFE:" + life;
    };
    return GameMainScene;
}(egret.Sprite));
__reflect(GameMainScene.prototype, "GameMainScene");
var GameMainSceneMediator = (function (_super) {
    __extends(GameMainSceneMediator, _super);
    function GameMainSceneMediator() {
        return _super.call(this, GameMainSceneMediator.NAME) || this;
    }
    GameMainSceneMediator.prototype.listNotificationInterests = function () {
        return [Const.CHANGE_SCENE, Const.GAME_OVER, Const.GAME_EXIT];
    };
    GameMainSceneMediator.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case Const.CHANGE_SCENE:
                egret.log("start", notification.getBody());
                break;
            case Const.GAME_OVER:
                egret.log("game over");
                this.gameOver();
                break;
            case Const.GAME_EXIT:
                egret.log("game exit");
                this.gameOver();
                break;
        }
    };
    GameMainSceneMediator.prototype.gameOver = function () {
        this.viewComponent.onchange = null;
        this.viewComponent.onKill = null;
    };
    GameMainSceneMediator.prototype.onRegister = function () {
        this._gameProxy = this.facade().retrieveProxy(GameProxy.NAME);
    };
    GameMainSceneMediator.prototype.onRemove = function () {
    };
    GameMainSceneMediator.prototype.renderScene = function (width, height) {
        var self = this;
        self.viewComponent = new GameMainScene(width, height);
        self.viewComponent.onchange = function (e) {
            self.sendNotification(e);
        };
        self.viewComponent.showLife(self._gameProxy.getLife());
        self.viewComponent.onKill = function () {
            var showLife = function (life) {
                self.viewComponent.showLife(life);
            };
            self._gameProxy.decLife(showLife);
        };
    };
    GameMainSceneMediator.prototype.destroyScene = function () {
        this.viewComponent = null;
    };
    GameMainSceneMediator.NAME = 'GAME_MAIN_SCENE_MEDIATOR';
    return GameMainSceneMediator;
}(puremvc.Mediator));
__reflect(GameMainSceneMediator.prototype, "GameMainSceneMediator");
var GameMainCommad = (function (_super) {
    __extends(GameMainCommad, _super);
    function GameMainCommad() {
        return _super.call(this) || this;
    }
    GameMainCommad.prototype.execute = function (notification) {
        this.sendNotification(Const.CHANGE_SCENE, 'GAME_MAIN_SCENE_MEDIATOR');
    };
    GameMainCommad.NAME = 'GAME_MAIN_COMMAD';
    return GameMainCommad;
}(puremvc.SimpleCommand));
__reflect(GameMainCommad.prototype, "GameMainCommad");
var StartupCommand = (function (_super) {
    __extends(StartupCommand, _super);
    function StartupCommand() {
        return _super.call(this) || this;
    }
    StartupCommand.prototype.initializeMacroCommand = function () {
        this.addSubCommand(GameMainCommad);
        //this.addSubCommand(PrepViewCommand);
        //this.addSubCommand(PrepControllerCommand);
    };
    StartupCommand.NAME = 'STARTUP_COMMAND';
    return StartupCommand;
}(puremvc.MacroCommand));
__reflect(StartupCommand.prototype, "StartupCommand");
//# sourceMappingURL=mvcTest.js.map