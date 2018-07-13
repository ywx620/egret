module exampleA {
    export class A {
        public callEgretMethod(msg:string):void {
            console.log("method msg from  : " + msg);
        }
        public static CallEgretFunc(msg:string):void {
            console.log("static msg from  : " + msg);
        }
    }
}