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
var SystemSetManager = (function (_super) {
    __extends(SystemSetManager, _super);
    function SystemSetManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SystemSetManager.getIns = function () {
        if (this.instance == null) {
            this.instance = new SystemSetManager();
        }
        return this.instance;
    };
    SystemSetManager.prototype.initData = function () {
        this.data = new SystemData();
    };
    SystemSetManager.prototype.getData = function () {
        return this.data;
    };
    return SystemSetManager;
}(egret.HashObject));
__reflect(SystemSetManager.prototype, "SystemSetManager");
var SystemData = (function (_super) {
    __extends(SystemData, _super);
    function SystemData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**是否连续开火 */
        _this.fireIsContinue = true;
        /**每秒发射子弹的数量*/
        _this.fireCount = 5;
        /**是否静音 */
        _this.soundIsNo = 1;
        /**特效音大小 */
        _this.soundEffectVolume = 1;
        /**背景音大小 */
        _this.soundBackgroundVolume = 1;
        /**窗口是否转动 */
        _this.turnShip = false;
        /**窗口是否不可见 */
        _this.showShip = false;
        /**瞄准器是否可动 */
        _this.aimIsMove = true;
        /**地图是否转动 */
        _this.mapIsMove = false;
        return _this;
    }
    return SystemData;
}(egret.HashObject));
__reflect(SystemData.prototype, "SystemData");
//# sourceMappingURL=SystemSetManager.js.map