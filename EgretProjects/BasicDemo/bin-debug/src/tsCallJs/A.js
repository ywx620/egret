var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var exampleA;
(function (exampleA) {
    var A = (function () {
        function A() {
        }
        A.prototype.callEgretMethod = function (msg) {
            console.log("method msg from  : " + msg);
        };
        A.CallEgretFunc = function (msg) {
            console.log("static msg from  : " + msg);
        };
        return A;
    }());
    exampleA.A = A;
    __reflect(A.prototype, "exampleA.A");
})(exampleA || (exampleA = {}));
//# sourceMappingURL=A.js.map