module control
{
    export class ControlBasic{
        protected stage:egret.Stage;
        public startBackFun:any;
        public endBackFun:any;
        constructor(stage:egret.Stage) {
            this.stage=stage;
        }
        /** 打开事件*/
        public open():void{
            this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        }
        /** 关闭事件*/
        public close():void{
            this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        }
        protected onTouch(e: egret.TouchEvent){
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.controlStart();
                    break;
                case egret.TouchEvent.TOUCH_MOVE:
                    this.controlMove(e.stageX,e.stageY);
                    break;
                case egret.TouchEvent.TOUCH_END:
                    this.controlEnd();
                    break;
            }
        }
        /** 手指按下*/
        protected controlStart(): void {
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        }
        /** 手指移动*/
        protected controlMove(x:number,y:number): void {
        }
        /** 手指离开*/
        protected controlEnd(): void {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        }
    }
	/**
	 * @author vinson
	 * 创建时间：2017-12-28 上午9:36:42
	 * 控制杆自由控制移动
	 */
    export class ControlBarMove extends ControlBasic{
        private controlBg:egret.DisplayObject;
        private controlBar:egret.DisplayObject;
        constructor(stage:egret.Stage,controlBar:egret.DisplayObject,controlBg:egret.DisplayObject) {
            super(stage);
            this.controlBar=controlBar;
            this.controlBg=controlBg;
        }
        
        protected controlMove(x:number,y:number): void {
            var bg=this.controlBg;
            var bar=this.controlBar;
            var cx=bg.x;
            var cy=bg.y;
            var dx=x-cx;
            var dy=y-cy;
            var ds=Math.sqrt(dx*dx+dy*dy);
            var r=bg.width>>1;
            var conA=dx/ds;
            var sinA=dy/ds;
            if(ds<r){//在边内时的处理
                bar.x=x;
                bar.y=y;
            }else{//超出边界时的处理
                bar.x=cx+conA*r;
                bar.y=cy+sinA*r;
            }
        }
        protected controlEnd(): void {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);

            var bg=this.controlBg;
            var bar=this.controlBar;
            bar.x=bg.x;
            bar.y=bg.y;
        }
    }
    /**
	 * @author vinson
	 * 创建时间：2017-12-28 上午9:36:42
	 * 手指滑动，向上向下向左向右滑动
	 */
    export class ControlFingerMove extends ControlBasic{
        private posStart:egret.Point;
        private posEnd:egret.Point;
        public moveEndBackFun:any;
        constructor(stage:egret.Stage) {
            super(stage);
        }
        protected onTouch(e: egret.TouchEvent){
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.posStart=new egret.Point(e.stageX,e.stageY);
                    this.controlStart();
                    break;
                case egret.TouchEvent.TOUCH_MOVE:
                    this.controlMove(e.stageX,e.stageY);
                    break;
                case egret.TouchEvent.TOUCH_END:
                    this.posEnd=new egret.Point(e.stageX,e.stageY);
                    this.controlEnd();
                    break;
            }
        }
         /** 手指按下*/
        protected controlStart(): void {
            super.controlStart();
            if(this.startBackFun!=null){
                this.startBackFun(this.posStart);
            }
        }
        protected controlMove(x:number,y:number): void {
           
        }
        protected controlEnd(): void {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
            
            var disx:number=this.posEnd.x-this.posStart.x;
            var disy:number=this.posEnd.y-this.posStart.y;
            var value:egret.Point=new egret.Point(0,0);
            if(Math.abs(disx)>Math.abs(disy)){//左右
               value.x=disx>0?1:-1;
            }else{//上下
               value.y=disy>0?1:-1;
            }
            if(this.endBackFun!=null){
                this.endBackFun(this.posEnd);
            }
            if(this.moveEndBackFun!=null){
                this.moveEndBackFun(value);
            }
        }
    }
    /**
	 * @author vinson
	 * 创建时间：2017-12-28 上午9:36:42
	 * 可示对象自由拖动
	 */
    export class ControlDrag extends ControlBasic{
        display:egret.DisplayObject;
        distance:egret.Point;
        constructor(stage:egret.Stage,display:egret.DisplayObject) {
            super(stage);
            this.display=display;
            this.distance=new egret.Point;
        }
        /** 打开事件*/
        public open():void{
            this.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        }
        /** 关闭事件*/
        public close():void{
            this.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        }
        protected onTouch(e: egret.TouchEvent){
            super.onTouch(e);
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.distance.x = e.stageX - this.display.x;
                    this.distance.y = e.stageY - this.display.y;
                    break;
            }
        }
        protected controlMove(x:number,y:number): void {
            this.display.x = x - this.distance.x;
            this.display.y = y - this.distance.y;
        }
        protected controlEnd():void{
            super.controlEnd();
            if(this.endBackFun!=null){
                this.endBackFun()
            }
        }
    }
}
