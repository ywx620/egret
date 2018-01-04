class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.initPomelo();
    }
    private pomelo:pomeloClient.Pomelo = new pomeloClient.Pomelo();
    private initPomelo(){
        var host="192.168.62.159";
        var port=3010;
            //开始连接：
            this.pomelo.on("io-error", function(event){
                //错误处理
            });
            this.pomelo.on("close", function(event){
                //关闭处理
            })


            this.pomelo.init({
                host: host,
                port: port
            }, function () {
                //连接成功执行函数
            });

            // 接收服务端主动推送消息:
            this.pomelo.on(route, function(result){
                //处理函数
            });

            //发送消息:
            this.pomelo.request(route, args || {}, function (result) {
                //消息回调     

            });
    }
}
