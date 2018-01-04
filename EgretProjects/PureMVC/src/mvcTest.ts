class Const extends egret.HashObject
{
    public static readonly CHANGE_SCENE:string='CHANGE_SCENE';
    public static readonly GAME_OVER:string='GAME_OVER';
    public static readonly GAME_EXIT:string="GAME_EXIT"
}
//使用prevMvc时要注意去掉头尾的几行
class GameProxy extends puremvc.Proxy {
    public static NAME: string = 'GAME_PROXY';
    private _life: number = 0;
    constructor() {
        super(GameProxy.NAME);
    }
    public onRegister() {
        this._life = 10;
    }
    public getLife () {
        return this._life;
    }
    public setLife(life) {
        this._life = life;
    }
    public incLife(cb) {
        this._life++;
    }
    public decLife(cb) {
        this._life--;
        if (cb) {
            cb(this._life);
        }
        if (this._life ==0) {
            this.sendNotification(Const.GAME_OVER);
        }
    }
}

class GameMainScene extends egret.Sprite {
    public onchange: any;
    public onKill: any;
    private _lifeText: egret.TextField;
    public constructor(width: number, height: number) {
        super();
        this.width = width;
        this.height = height;
        this.init();
    }
    private init() {  
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
        btn.x = (this.width - btn.width) * 0.5;;
        btn.y = 300;
        btn.touchEnabled = true;
        this.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function(e: egret.TouchEvent) {
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
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function(e: egret.TouchEvent) {
            if (this.onchange) {
            this.onchange(Const.GAME_EXIT);
        }
        }, this);
    }
    public showLife(life) {
        this._lifeText.text = "LIFE:" + life;
    }

}

class GameMainSceneMediator extends puremvc.Mediator {
    public static NAME: string = 'GAME_MAIN_SCENE_MEDIATOR';
    private _gameProxy: any;
    constructor() {
        super(GameMainSceneMediator.NAME);
    }
    public listNotificationInterests(): string[] {
        return [Const.CHANGE_SCENE,Const.GAME_OVER,Const.GAME_EXIT];
    }
    public handleNotification(notification: puremvc.INotification): void {
        switch(notification.getName()){
            case Const.CHANGE_SCENE:
            egret.log("start",notification.getBody())
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
    }
    private gameOver():void{
        this.viewComponent.onchange =null;
        this.viewComponent.onKill =null;
    }
    public onRegister(): void {
        this._gameProxy = this.facade().retrieveProxy(GameProxy.NAME);
    }
    public onRemove(): void {
    }   
    public renderScene(width: number, height: number): void {
        var self = this;
        self.viewComponent = new GameMainScene(width, height);
        self.viewComponent.onchange = function(e) {
            self.sendNotification(e);
        }
        self.viewComponent.showLife(self._gameProxy.getLife());
        self.viewComponent.onKill = function() {
            var showLife = function(life) {
                self.viewComponent.showLife(life);
            };
            self._gameProxy.decLife(showLife);
        };
    }
    public destroyScene() {
        this.viewComponent = null;
    }
}

class GameMainCommad extends puremvc.SimpleCommand {
    public static NAME: string = 'GAME_MAIN_COMMAD';
    constructor() {
        super();
    }
    public execute(notification: puremvc.INotification): void {
        this.sendNotification(Const.CHANGE_SCENE, 'GAME_MAIN_SCENE_MEDIATOR');
    }
}
class StartupCommand extends puremvc.MacroCommand {
    public static NAME: string = 'STARTUP_COMMAND';
    constructor() {
        super();
    }
    public initializeMacroCommand(): void {         
        this.addSubCommand(GameMainCommad);
        //this.addSubCommand(PrepViewCommand);
        //this.addSubCommand(PrepControllerCommand);
    }
}