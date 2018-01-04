class SystemSetManager extends egret.HashObject {
    private static instance: SystemSetManager;
    private data: SystemData
    public static getIns(): SystemSetManager {
        if (this.instance == null) {
            this.instance = new SystemSetManager();
        }
        return this.instance;
    }
    public initData(): void {
        this.data = new SystemData();
    }
    public getData(): SystemData {
        return this.data;
    }
}
class SystemData extends egret.HashObject {
    /**是否连续开火 */
    public fireIsContinue: boolean = true;
    /**每秒发射子弹的数量*/
    public fireCount: number = 5;
    /**是否静音 */
    public soundIsNo: number = 1;
    /**特效音大小 */
    public soundEffectVolume: number = 1;
    /**背景音大小 */
    public soundBackgroundVolume: number = 1;
    /**窗口是否转动 */
    public turnShip: boolean = false;
    /**窗口是否不可见 */
    public showShip:boolean=false;
    /**瞄准器是否可动 */
    public aimIsMove:boolean=true;
     /**地图是否转动 */
    public mapIsMove:boolean=false;
}