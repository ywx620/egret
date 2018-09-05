module utils
{
	/** 
	 * 用于显示对象的对象池类  
	 */
	export class ObjectPool 
	{
		private static instance:ObjectPool;
		/** 
		 *  作为对象池的词典dict 
		 */
		private objPoolDict:Object={};
		public static getIns():ObjectPool
		{
			if (this.instance == null){
				this.instance=new ObjectPool;
			}
			return this.instance;
		}
		/** 
		 * 向对象池中放入对象，以便重复利用 
		 * @param disObj 要的放入对象 
		 */
		public push(oldObj:Object):void
		{
			var objName:string=egret.getQualifiedClassName(oldObj);
			if (oldObj == null){
				return;
			}
			if (this.objPoolDict[objName] == null){
				this.objPoolDict[objName]=[];
			}
			this.objPoolDict[objName].push(oldObj);
		}
		
		/** 
		 * 从对象池中取出需要的对象 
		 * @param targetObj 需要的对象类类名，没必要必须是类实例名 类名就可以 
		 * @return 取出的相应对象 
		 * 
		 */
		public pop(targetObj:Object):Object 
		{
			var objName:string=egret.getQualifiedClassName(targetObj);
			if(this.getHas(targetObj)){
				return this.objPoolDict[objName].pop() as Object;
			}
			var objClass:any=egret.getDefinitionByName(objName) as any;
			var obj:Object=new objClass;
			return obj;
		}
		public getHas(targetObj:Object):boolean 
		{
			var objName:string=egret.getQualifiedClassName(targetObj);
			if (this.objPoolDict[objName] != null && this.objPoolDict[objName].length > 0){
				return true;
			}
			return false;
		}
	}
}