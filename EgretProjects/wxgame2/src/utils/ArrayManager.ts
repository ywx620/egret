 class ArrayManager  {
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
 }