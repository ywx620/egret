var exampleB;
(function (exampleB) {
    function b() {
        //调用方法
        var a = new exampleA.A();
        a.callEgretMethod("ts method");
        //调用静态函数
        exampleA.A.CallEgretFunc("ts function");
        console.log(jsFun("hello"));
        console.log(jsFun);
        console.log(x_debug);
    }
    exampleB.b = b;
})(exampleB || (exampleB = {}));
//# sourceMappingURL=B.js.map