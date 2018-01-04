var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**基础命令类 */
var BasicCommand = (function (_super) {
    __extends(BasicCommand, _super);
    function BasicCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasicCommand.prototype.execute = function (notification) {
        this.num1 = notification.getBody().num1;
        this.num2 = notification.getBody().num2;
        this.calculate();
        this.facade().sendNotification(MVCConst.CMD_SOUND);
    };
    /**计算 */
    BasicCommand.prototype.calculate = function () {
    };
    /**发布 */
    BasicCommand.prototype.release = function () {
        this.facade().sendNotification(MVCConst.RESULT_RELEASE, this.value);
    };
    return BasicCommand;
}(puremvc.SimpleCommand));
__reflect(BasicCommand.prototype, "BasicCommand");
/**运算－加*/
var PlusCommand = (function (_super) {
    __extends(PlusCommand, _super);
    function PlusCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlusCommand.prototype.calculate = function () {
        this.value = this.num1 + this.num2;
        this.release();
    };
    return PlusCommand;
}(BasicCommand));
__reflect(PlusCommand.prototype, "PlusCommand");
/**运算－减*/
var SubtractCommand = (function (_super) {
    __extends(SubtractCommand, _super);
    function SubtractCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubtractCommand.prototype.calculate = function () {
        this.value = this.num1 - this.num2;
        this.release();
    };
    return SubtractCommand;
}(BasicCommand));
__reflect(SubtractCommand.prototype, "SubtractCommand");
/**运算－乘*/
var MultiplyCommand = (function (_super) {
    __extends(MultiplyCommand, _super);
    function MultiplyCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiplyCommand.prototype.calculate = function () {
        this.value = this.num1 * this.num2;
        this.release();
    };
    return MultiplyCommand;
}(BasicCommand));
__reflect(MultiplyCommand.prototype, "MultiplyCommand");
/**运算－除*/
var DivideCommand = (function (_super) {
    __extends(DivideCommand, _super);
    function DivideCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DivideCommand.prototype.calculate = function () {
        this.value = this.num1 / this.num2;
        this.release();
    };
    return DivideCommand;
}(BasicCommand));
__reflect(DivideCommand.prototype, "DivideCommand");
//------------------
/**开始命令 */
var StartCommand = (function (_super) {
    __extends(StartCommand, _super);
    function StartCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StartCommand.prototype.initializeMacroCommand = function () {
        this.addSubCommand(InitCommand);
    };
    return StartCommand;
}(puremvc.MacroCommand));
__reflect(StartCommand.prototype, "StartCommand");
/**初始化命令 */
var InitCommand = (function (_super) {
    __extends(InitCommand, _super);
    function InitCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InitCommand.prototype.execute = function (notification) {
        this.facade().registerCommand(MVCConst.CMD_TRANSPOND, TranspondCommand);
        this.facade().registerCommand(MVCConst.CMD_SOUND, SoundCommand);
        this.facade().registerCommand(MVCConst.CMD_CALCULATE_PLUS, PlusCommand);
        this.facade().registerCommand(MVCConst.CMD_CALCULATE_SUBTRACT, SubtractCommand);
        this.facade().registerCommand(MVCConst.CMD_CALCULATE_MULTIPLY, MultiplyCommand);
        this.facade().registerCommand(MVCConst.CMD_CALCULATE_DIVIDE, DivideCommand);
    };
    return InitCommand;
}(puremvc.SimpleCommand));
__reflect(InitCommand.prototype, "InitCommand");
/**数据转发，用来转发数字与计算符号 */
var TranspondCommand = (function (_super) {
    __extends(TranspondCommand, _super);
    function TranspondCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TranspondCommand.prototype.execute = function (notification) {
        var data = notification.getBody();
        this.facade().sendNotification(MVCConst.DATA_TRANSPOND, data);
        this.facade().sendNotification(MVCConst.CMD_SOUND);
    };
    return TranspondCommand;
}(puremvc.SimpleCommand));
__reflect(TranspondCommand.prototype, "TranspondCommand");
/**播放声音命令 */
var SoundCommand = (function (_super) {
    __extends(SoundCommand, _super);
    function SoundCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SoundCommand.prototype.execute = function (notification) {
        SoundControl.getIns().play("keyDown_mp3");
    };
    return SoundCommand;
}(puremvc.SimpleCommand));
__reflect(SoundCommand.prototype, "SoundCommand");
//# sourceMappingURL=mvcCommand.js.map