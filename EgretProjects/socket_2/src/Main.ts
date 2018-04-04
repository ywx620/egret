class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {
        this.initPomelo();
    }   
    private initPomelo(){
        // egret.log("开始")
        var host="192.168.62.159";
        var port=3010;
        var pomelo: Pomelo = new Pomelo();
        //var pomelo:pomeloClient.Pomelo = new pomeloClient.Pomelo();

        // pomelo.on('io-error', function(e:any):void {
        //         // 错误处理
        //         egret.log("wrong")
        // });

        // pomelo.on('close', function(e:any):void {
        //         // 连接关闭
        //          egret.log("close")
        // });

        // 连接到服务器 127.0.0.1:3010
        pomelo.init({host: host,port: port},this.connet);
    }
    private connet(response:any):void {
        if (response.code === 200) {
                // 连接成功
                    egret.log("OK")
        }
    }
}