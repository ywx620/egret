module moon
{
	export class Image extends MoonContainer{
        protected skinName:string;
        protected skinImage:Scale9Image;
        protected position:Point;
		public constructor(skinName:string="")
        {
            super();
            if(skinName!=""){
                this.skinName=skinName;
                this.position=new Point();
                this.addBitmap();
            }
        }
        public addBitmap():void
        {
            if(RES.hasRes(this.skinName)){
                this.skinImage=new Scale9Image(this.skinName);
                this.addChild(this.skinImage);
            }else{
                trace("找不到资源："+this.skinName)
                //egret.error("找不到key"+this.skinName);
            }
        }
	}
    export class ImageAnimation extends Image{
        protected items:string[]=[];
        protected index:number=0;
        protected skinImage:Scale9Image;
        public constructor(skinName:string="",start:number,end:number){
            super();
            for(var i:number=start;i<=end;i++){
                this.items.push(skinName+i+"_png");
            }
            this.skinName=this.getItem(0);
            this.addBitmap();
        }
        public hasItem(index:number):boolean
		{
			return this.items.length>0&&(index>=0&&index<this.items.length);
		}
		public getItem(index:number):string
		{
			return this.items[index];
		}
		public getNextItem():string
		{
			return this.items[this.index++]; 
		}
		public reset():void
		{
			this.index=0;
		}
        public gotoAndStop(index:number):void{
            if(this.hasItem(index)){
                this.index=index;
                this.skinName=this.getItem(index);
                this.update();
            }else{
                trace("gotoAndStop的参数请保持在0到"+this.items.length,"当前index="+index)
            }
        }
        public update():void
        {
            if(RES.hasRes(this.skinName)){
                this.skinImage.texture=RES.getRes(this.skinName);
            }else{
                trace("找不到资源："+this.skinName)
            }
        }
        public get currentFrame():number{return this.index}
    }
    export class ImageLayout{
        private tw:number;
        private th:number;
        private image:DisplayObject;
        private static instance:ImageLayout;
		public static getIns():ImageLayout{
			if(this.instance == null) this.instance = new ImageLayout();
			return this.instance;
		}
        public setImage(image:DisplayObject):void{
            this.image=image;
        }
		public setStageWH(w:number,h:number):void{
            this.tw=w;this.th=h;
        }
        public setTop(distance:number){
            this.image.y=distance;
        }
        public setBottom(distance:number):void{
            this.image.y=this.th-this.image.height-distance;
        }
        public setLeft(distance:number):void{
            this.image.x=distance;
        }
        public setRight(distance:number):void{
            this.image.x=this.tw-this.image.width-distance;
        }
        public setCenterX():void{
            this.image.x=(this.tw-this.image.width)>>1;
        }
        public setCenterY():void{
            this.image.y=(this.th-this.image.height)>>1;
        }
        public setCenterXByPanent(image:DisplayObject):void{
            if(image.parent) image.x=(image.parent.width-image.width)>>1;
        }
        public setCenterYByPanent(image:DisplayObject):void{
            if(image.parent) image.y=(image.parent.height-image.height)>>1;
        }
    }
}