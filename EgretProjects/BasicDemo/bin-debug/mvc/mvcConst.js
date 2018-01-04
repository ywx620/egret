var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/** */
var MVCConst = (function () {
    function MVCConst() {
    }
    MVCConst.DATA_TRANSPOND = "data transpond"; //数据转发
    MVCConst.RESULT_RELEASE = "send result"; //结果发布
    MVCConst.CMD_TRANSPOND = "cmd transpond"; //转发命令
    MVCConst.CMD_START = "cmd start"; //开始命令
    MVCConst.CMD_SOUND = "cmd sound"; //声音命令
    MVCConst.CMD_CALCULATE_PLUS = "cmd calculate plus"; //加
    MVCConst.CMD_CALCULATE_SUBTRACT = "cmd calculate subtract"; //减
    MVCConst.CMD_CALCULATE_MULTIPLY = "cmd calculate multiply"; //乘
    MVCConst.CMD_CALCULATE_DIVIDE = "cmd calculate divide"; //除
    MVCConst.HAS_SIGN = "has sign"; //有符号
    MVCConst.SIGNS = ["+", "-", "x", "/", "=", "c"]; //特殊符号
    MVCConst.CMDS = [MVCConst.CMD_CALCULATE_PLUS, MVCConst.CMD_CALCULATE_SUBTRACT, MVCConst.CMD_CALCULATE_MULTIPLY, MVCConst.CMD_CALCULATE_DIVIDE];
    return MVCConst;
}());
__reflect(MVCConst.prototype, "MVCConst");
//# sourceMappingURL=mvcConst.js.map