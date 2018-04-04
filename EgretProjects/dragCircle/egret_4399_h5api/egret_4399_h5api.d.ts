/**
 * H5API接口
 * Created by shaov on 2014/11/11.
 */
declare module egret_4399_h5api {

    /**
     * 初始化游戏信息
     * @param gameId        游戏编号
     * @param gameName      游戏名称
     * @param gameWidth     游戏高
     * @param gameHeight    游戏宽
     * @param isHorizontal  是否是竖屏
     */
    function initGame(gameId:number,gameName:string, gameWidth:number, gameHeight:number, isHorizontal:boolean):void;

    /**
     * 进度条接口
     * @param progressNum
     * @param progressStr
     */
    function progress(progressNum:number, progressStr:string):void;

    /**
     * 进度条接口
     * @param progressNum
     */
    function progress(progressNum:number):void;

    /**
     * 微信环境检测接口
     */
    function isWeixinBrowser():boolean;

    /**
     * 更多游戏接口
     */
    function moreGame():void;

    /**
     * 提交积分到排行榜
     * @param num
     * @param callback
     */
    function submitScore(score:number, callback:Function, thisObject:any):void;

    /**
     * 获取排行榜
     * @param callback
     */
    function getRank(callback:Function, thisObject:any):void;

    /**
     * 事件监听
     * @param eventName         事件名，一般为egret_4399_apiEvent里
     * @param callback          回调函数
     * @param thisObject        回调函数上下文
     */
    function on(eventName:string, callback:Function, thisObject:any):void;

    /**
     * 积分API
     */
    class Score {
        /**
         * 提交积分到排行榜
         * @param num
         * @param callback
         */
        static submitScore(score:number, callback:Function, thisObject:any):void;

        /**
         * 获取排行榜
         * @param callback
         */
        static getRank(callback:Function, thisObject:any):void;

        /**
         * 提交积分监听事件
         */
        static SUBMIT:string;
        /**
         * 获取排行榜事件
         */
        static RANK:string;
    }
}