declare function jsFun(msg:string);
declare function x_debug();
module exampleB {
    export function b() {
        //调用方法
        var a:exampleA.A = new exampleA.A();
        a.callEgretMethod("ts method");
        //调用静态函数
        exampleA.A.CallEgretFunc("ts function");
		console.log(jsFun("hello"));
		console.log(jsFun);
		console.log(x_debug);
    }
}