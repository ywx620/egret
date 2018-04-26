 class ArrayManager  {
     /**用已有的数组得到随机数组 */
    public static getRandomArray(array:any[]):any[]
    {
        let value:any[]=[];
        let copy:any[]=array.concat();
        while(copy.length>0){
            let index:number=Math.floor(Math.random()*copy.length);
            value.push(copy.splice(index,1)[0]);
        }
        return value;
    }
    /**通过二维数组得到一维数组 xy为0时取x轴,xy为1时取y轴,index为索引*/
    public static getOneArrayByTwoArray(array:any[],xy:number,index:number):any[]
    {
        let value:any[]=[];
        let copy:any[]=array.concat();
        let len:number=copy.length;
        if(xy==0){
            if(index<len){
                value=copy[index];
            }
        }else{
            for(var i:number=0;i<len;i++){
                var temps:any[]=copy[i];
                if(index<temps.length){
                    value.push(temps[temps[i]]);
                }
            }
        }
        return value;
    }
 }