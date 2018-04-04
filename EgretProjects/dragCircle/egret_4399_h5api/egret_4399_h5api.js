/**
 * 用于白鹭引擎的API接口回调函数
 * Created by shaov on 2014/11/11.
 */
var egret_4399_h5api = (function () {
    var inner = {};
    /**
     * 初始化游戏
     * @param gameId        游戏编号
     * @param gameName      游戏名称
     * @param gameWidth     游戏宽
     * @param gameHeight    游戏高
     * @param isHorizontal  是否是竖屏
     */
    inner.initGame = function (gameId, gameName, gameWidth, gameHeight, isHorizontal) {
        h5api.initGame(gameId, gameName, gameWidth, gameHeight, isHorizontal);
    };
    /**
     *进度条接口
     * @param num
     */
    inner.progress = function (num) {
        h5api.progress(num);
    };
    /**
     * 微信环境检测接口
     */
    inner.isWeixinBrowser = function () {
        return h5api.isWeixinBrowser();
    };
    /**
     * 更多游戏接口
     */
    inner.moreGame = function () {
        h5api.moreGame();
    };
    /**
     * 提交积分到排行榜
     * @param num
     * @param callback
     */
    inner.submitScore = function (num, callback, thisObject) {
        inner.Score.submitScore(num, callback, thisObject);
    };
    /**
     * 获取排行榜
     * @param callback
     */
    inner.getRank = function (callback, thisObject) {
        inner.Score.getRank(callback, thisObject);
    };
    /**
     * 事件监听
     * @param eventName         事件名
     * @param callback          回调函数
     * @param thisObject        回调函数上下文
     */
    inner.on = function (eventName, callback, thisObject) {
        h5api.on(eventName, callback, thisObject);
    };
    /**
     * 积分API
     */
    inner.Score = (function () {
        var scoreInner = {};
        /**
         * 提交积分到排行榜
         * @param num
         * @param callback
         */
        scoreInner.submitScore = function (num, callback, thisObject) {
            function submitScoreCallback(data) {
                callback.call(thisObject, data);
            }
            h5api.Score.submitScore(num, submitScoreCallback);
        };
        /**
         * 获取排行榜
         * @param callback
         */
        scoreInner.getRank = function (callback, thisObject) {
            function getRankCallback(data) {
                callback.call(thisObject, data);
            }
            h5api.Score.getRank(getRankCallback);
        };
        /**
         * 积分提交事件
         */
        scoreInner.SUBMIT = "scoreSubmit";
        /**
         * 获取排行榜事件
         */
        scoreInner.RANK = "scoreRank";
        return scoreInner;
    })();
    return inner;
})();
