 class LayoutManager extends egret.HashObject {
		/**
		 * 可视对象排列
		 * xNum在x轴上排列的数量
		 * xDis,yDis,在x轴与y轴上的间距
		 * x,y初始位置
		 * sign:正1从左向右从上向下排当sign为负1时则反过来,,*/
		public static displayRank(array:any[],xNum:number=1,xDis:number=0,yDis:number=0,x:number=0,y:number=0,sign:number=1):void
		{
			var display:egret.DisplayObject;
			for(var i:number=0;i<array.length;i++){
				display=array[i];
				display.x=x+Math.floor(i%xNum)*(display.width+xDis)*sign;
				display.y=y+Math.floor(i/xNum)*(display.height+yDis)*sign;
			}
		}
		/**
		 * 分部的可视对象排列
		 * array:视对象数组
		 * part1,part2：[len:number,xNum:number,xDis:number,yDis:number,x:number,y:number],参看方求displayRank的参数
		 * sign:正1从左向右从上向下排当sign为负1时则反过来
		 * part1[0]+part2[0]==array.length;//如果为false,会有问题
		 * */
		public static displayRankPart(array:any[],part1:any[],part2:any[]=null,sign:number=1):void
		{
			var len1:number,len2:number,xNum:number,xDis:number,yDis:number,x:number,y:number
			var display:egret.DisplayObject;
			len1=part1[0];xNum=part1[1];xDis=part1[2];yDis=part1[3];x=part1[4];y=part1[5];
			var arr1:any[]=array.slice(0,len1);
			LayoutManager.displayRank(arr1,xNum,xDis,yDis,x,y,sign);
			if(part2){
				len2=part2[0];xNum=part2[1];xDis=part2[2];yDis=part2[3];x=part2[4];y=part2[5];
				var arr2:any[]=array.slice(len1,len1+len2);
				LayoutManager.displayRank(arr2,xNum,xDis,yDis,x,y,sign);
			}
		}
		/**
		 * 按顺时针环绕圆形/扇形/椭圆形的排列布局
		 * center中心位置
		 * radius半径距离
		 * loop环形排列为2*Math.PI,如果值是Math.PI/2是90度的扇形
		 * skewR偏离的弧度（90度=Math.PI/2弧度）
		 * skewX偏离的X轴位置
		 * skewY偏离的Y轴位置
		 * skewXR在X轴上半径增加的值（椭圆布局）
		 * skewYR在Y轴上半径增加的值（椭圆布局）
		 * */
		public static displayCircle(array:any[],centerX:number,centerY:number,radius:number,loop:number=2*Math.PI,skewR:number=0,skewX:number=0,skewY:number=0,skewXR:number=0,skewYR:number=0):void
		{
			var display:egret.DisplayObject;
			var count:number=array.length;
			var radian:number=loop/count
			if(loop<2*Math.PI){//如果是扇形的必须把个数减少一个再相除
				radian=loop/(count-1)
			}
			for(var i:number=0;i<count;i++){
				display=array[i];
				display.x=centerX+Math.cos(radian*i-skewR)*(radius+skewXR)+skewX;
				display.y=centerY+Math.sin(radian*i-skewR)*(radius+skewYR)+skewY;
			}
		}
		/**
		 * 按顺时针环绕多边形的排列布局
		 * center中心位置
		 * radius半径距离
		 * size边数
		 * skewR偏离的弧度（90度=Math.PI/2弧度）
		 * */
		public static displayPolygon(array:any[],centerX:number,centerY:number,radius:number=100,size:number=5,skewR:number=0):void
		{
			if(size<3||size>array.length){
				console.log("多边形的边数不正确")
				return;
			}
			var display:egret.DisplayObject;
			var count:number=array.length;
			var radian:number=2*Math.PI/size;//每个边的弧度
			var num:number=Math.floor(count/size);//每个边的个数
			for (var i:number=0;i<size;i++) {
				var x1:number=centerX + Math.cos(i*radian-skewR)*radius;
				var y1:number=centerY + Math.sin(i*radian-skewR)*radius;
				var j:number=i+1;
				j=j==size?0:j;
				var x2:number=centerX + Math.cos(j*radian-skewR)*radius;
				var y2:number=centerY + Math.sin(j*radian-skewR)*radius;
				for(var k:number=0;k<num;k++){
					var m:number=k+num*i;
					if(m<count){
						display=array[m];
						display.x=x1;
						display.y=y1;
						display.x+=(x2-x1)/num*k;
						display.y+=(y2-y1)/num*k;
					}
				}
			}
		}
		/**
		 * 三角形排列布局
		 * xDis,yDis,在x轴与y轴上的间距
		 * x,y初始位置
		 * sign:正1从左向右从上向下排当sign为负1时则反过来
		 * isCenter是等腰三角形，为false时是直角三角形
		 * */
		public static displayTrigon(array:any[],xDis:number=0,yDis:number=0,x:number=0,y:number=0,sign:number=1,isCenter:boolean=true):void
		{
			var display:egret.DisplayObject;
			var start:number=0;
			var len:number=1
			var index:number=1;
			var temps:any[]=array.slice(start,len);
			rank();
			function rank():void{
				var cx:number=0;
				var tempLen:number=temps.length
				if(tempLen>1&&isCenter){
					cx=(tempLen-1)*(display.width+xDis)/-2*sign;
				}
				for(var i:number=0;i<tempLen;i++){
					display=temps[i];
					display.x=x+i*(display.width+xDis)*sign+cx;
					display.y=y+(index-1)*(display.height+yDis)*sign;
				}
				index++;
				start=len;
				len=start+index;
				temps=array.slice(start,len);
				if(len<=array.length+start){
					rank();
				}
			}
		}
		/**
		 * 可视对象砖块（墙）排列
		 * xNum在x轴上排列的数量
		 * xDis,yDis,在x轴与y轴上的间距
		 * x,y初始位置
		 * offX:偏移的距离,*/
		public static displayWall(array:any[],xNum:number=1,xDis:number=0,yDis:number=0,x:number=0,y:number=0,offX:number=10):void
		{
			var display:egret.DisplayObject;
			for(var i:number=0;i<array.length;i++){
				var xx:number=Math.floor(i/xNum)%2==0?offX:0;
				display=array[i];
				display.x=x+Math.floor(i%xNum)*(display.width+xDis)+xx;
				display.y=y+Math.floor(i/xNum)*(display.height+yDis);
			}
		}
	}
