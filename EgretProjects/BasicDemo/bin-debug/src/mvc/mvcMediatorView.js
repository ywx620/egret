var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ModuleMediator = (function (_super) {
    __extends(ModuleMediator, _super);
    function ModuleMediator(mediatorName, viewComponent) {
        if (mediatorName === void 0) { mediatorName = null; }
        if (viewComponent === void 0) { viewComponent = null; }
        var _this = _super.call(this, mediatorName) || this;
        _this.view = viewComponent;
        return _this;
    }
    ModuleMediator.prototype.onRegister = function () {
        this.facade().registerMediator(new SendMediator(SendMediator.NAME, this.view));
        this.facade().registerMediator(new ReceiveMediator(ReceiveMediator.NAME, this.view));
    };
    ModuleMediator.NAME = "MediatorView";
    return ModuleMediator;
}(puremvc.Mediator));
__reflect(ModuleMediator.prototype, "ModuleMediator");
var ModuleView = (function (_super) {
    __extends(ModuleView, _super);
    function ModuleView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModuleView.prototype.render = function () {
        this.createRect(this.stage.stageWidth, this.stage.stageHeight, 0X333300);
    };
    return ModuleView;
}(moon.BasicView));
__reflect(ModuleView.prototype, "ModuleView");
//---------------
/**基础类 */
var BasicMediator = (function (_super) {
    __extends(BasicMediator, _super);
    function BasicMediator(mediatorName, viewComponent) {
        if (mediatorName === void 0) { mediatorName = null; }
        if (viewComponent === void 0) { viewComponent = null; }
        var _this = _super.call(this, mediatorName) || this;
        _this.container = viewComponent;
        return _this;
    }
    return BasicMediator;
}(puremvc.Mediator));
__reflect(BasicMediator.prototype, "BasicMediator");
//------接收方----Mediator----
var ReceiveMediator = (function (_super) {
    __extends(ReceiveMediator, _super);
    function ReceiveMediator(mediatorName, viewComponent) {
        if (mediatorName === void 0) { mediatorName = null; }
        if (viewComponent === void 0) { viewComponent = null; }
        return _super.call(this, mediatorName, viewComponent) || this;
    }
    ReceiveMediator.prototype.onRegister = function () {
        this.view = new ReceiveView();
        this.container.addChild(this.view);
        this.clear();
    };
    ReceiveMediator.prototype.listNotificationInterests = function () {
        return [MVCConst.DATA_TRANSPOND, MVCConst.RESULT_RELEASE];
    };
    ReceiveMediator.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case MVCConst.DATA_TRANSPOND://数据转发
                this.showTranspond(notification.getBody());
                break;
            case MVCConst.RESULT_RELEASE://结果发布
                this.showResult(notification.getBody());
                break;
        }
    };
    /**清空 */
    ReceiveMediator.prototype.clear = function () {
        this.num1 = this.num2 = this.sign = "";
        this.view.clear();
    };
    Object.defineProperty(ReceiveMediator.prototype, "hasStipulation", {
        /**查看是否符合规定，符合规定时所有的都不能为空 */
        get: function () {
            if (this.num1 == "" || this.num2 == "" || this.sign == "")
                return false;
            return true;
        },
        enumerable: true,
        configurable: true
    });
    /**设置转发的值 */
    ReceiveMediator.prototype.setTranspond = function (value) {
        var receiveView = this.view;
        receiveView.setProcess(value);
    };
    /**把数字显示出来 */
    ReceiveMediator.prototype.pushNumber = function (num, value) {
        var receiveView = this.view;
        if (this.sign == MVCConst.HAS_SIGN && receiveView.getResult() == this.num1) {
            //如果符号有值（不是加减乘除），并且上一次计算结果等于num1，如果这时候输入数字则清空，重新计算
            if (MVCConst.SIGNS.indexOf(value) < 0) {
                this.clear();
            }
        }
        receiveView.pushNumber(num, value);
    };
    /**显示转发的值 */
    ReceiveMediator.prototype.showTranspond = function (data) {
        var value = data;
        var index = MVCConst.SIGNS.indexOf(value);
        if (index < 0) {
            var num;
            var numstr;
            if (this.sign == "")
                numstr = this.num1;
            else
                numstr = this.num2;
            if (value == ".") {
                if (numstr.indexOf(value) < 0) {
                    numstr += value;
                }
            }
            else {
                numstr += value;
            }
            num = parseFloat(numstr);
            this.pushNumber(num, value);
            if (this.sign == "")
                this.num1 = numstr;
            else
                this.num2 = numstr;
        }
        else {
            if (value == "c") {
                this.clear();
            }
            else if (value == "=") {
                this.setTranspond(value);
                this.sendCalculate();
            }
            else {
                if (this.num1 != "") {
                    this.setTranspond(value);
                    this.sendCalculate();
                    this.sign = value;
                }
            }
        }
    };
    /**发送去计算 */
    ReceiveMediator.prototype.sendCalculate = function () {
        if (this.hasStipulation) {
            var index = MVCConst.SIGNS.indexOf(this.sign);
            var type = MVCConst.CMDS[index];
            this.facade().sendNotification(type, { num1: parseFloat(this.num1), num2: parseFloat(this.num2) });
        }
    };
    /**显示结果 */
    ReceiveMediator.prototype.showResult = function (data) {
        var value = data;
        this.view.setResult(value);
        this.num1 = value; //num1变量保存上次计算结果
        this.sign = MVCConst.HAS_SIGN; //符号标为有值，则再输入数字时就会转到num2
        this.num2 = "";
    };
    ReceiveMediator.NAME = "ReceiveMediator";
    return ReceiveMediator;
}(BasicMediator));
__reflect(ReceiveMediator.prototype, "ReceiveMediator");
//------接收方----view----
var ReceiveView = (function (_super) {
    __extends(ReceiveView, _super);
    function ReceiveView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReceiveView.prototype.render = function () {
        this.createRect(this.stage.stageWidth, 200, 0X666600);
        this.txtProcess = this.createText(10, 10);
        this.txtResult = this.createText(10, 150);
        this.txtProcess.width = this.stage.stageWidth - 10;
        this.txtProcess.height = 130;
        this.txtProcess.multiline = true;
        this.txtProcess.wordWrap = true;
        //this.txtProcess.textAlign = egret.HorizontalAlign.LEFT;
        this.txtResult.textAlign = egret.HorizontalAlign.LEFT;
        this.txtProcess.size = 40;
        this.txtResult.size = 50;
    };
    /**清空 */
    ReceiveView.prototype.clear = function () {
        this.txtProcess.text = this.txtResult.text = "";
    };
    /**设置计算处理值 */
    ReceiveView.prototype.setProcess = function (value) {
        if (MVCConst.SIGNS.indexOf(value) >= 0) {
            var str = this.txtProcess.text;
            var last = str.substr(str.length - 1, 1);
            //查看一下最后一位数是不是符号，如果是得删除掉，然后替换最新符号
            if (MVCConst.SIGNS.indexOf(last) >= 0) {
                this.txtProcess.text = str.substr(0, str.length - 1);
            }
        }
        this.txtProcess.appendText(value);
    };
    /**经过整理后显示数字*/
    ReceiveView.prototype.pushNumber = function (num, point) {
        var value = this.txtProcess.text;
        var numstr = num.toString();
        if (point == "." && numstr.indexOf(point) < 0) {
            numstr += point;
        }
        if (value == "") {
            this.txtProcess.appendText(numstr);
        }
        else {
            while (value.length > 0) {
                var last = value.substr(value.length - 1, 1);
                if (MVCConst.SIGNS.indexOf(last) >= 0) {
                    this.txtProcess.text = value;
                    this.txtProcess.appendText(numstr);
                    break;
                }
                else {
                    value = value.substr(0, value.length - 1);
                }
            }
            if (value.length == 0) {
                this.txtProcess.text = numstr;
            }
        }
    };
    /**设置结果值 */
    ReceiveView.prototype.setResult = function (value) {
        this.txtResult.text = value;
    };
    /**得到结果值 */
    ReceiveView.prototype.getResult = function () {
        return this.txtResult.text;
    };
    return ReceiveView;
}(moon.BasicView));
__reflect(ReceiveView.prototype, "ReceiveView");
//-------发送方----Mediator----
var SendMediator = (function (_super) {
    __extends(SendMediator, _super);
    function SendMediator(mediatorName, viewComponent) {
        if (mediatorName === void 0) { mediatorName = null; }
        if (viewComponent === void 0) { viewComponent = null; }
        return _super.call(this, mediatorName, viewComponent) || this;
    }
    SendMediator.prototype.onRegister = function () {
        this.view = new SendView();
        this.container.addChild(this.view);
        this.view.addEvent(moon.MoonEvent.CLICK, this.onClick.bind(this));
        this.view.y = 210;
    };
    /**发送转发数据*/
    SendMediator.prototype.onClick = function (e) {
        this.facade().sendNotification(MVCConst.CMD_TRANSPOND, e.data);
    };
    SendMediator.NAME = "SendMediator";
    return SendMediator;
}(BasicMediator));
__reflect(SendMediator.prototype, "SendMediator");
//-------发送方----view----
var SendView = (function (_super) {
    __extends(SendView, _super);
    function SendView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SendView.prototype.render = function () {
        this.createRect(this.stage.stageWidth, this.stage.stageHeight - 200, 0X999900, 0, 0);
        this.shows = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
        this.shows = this.shows.concat(MVCConst.SIGNS);
        var len = this.shows.length;
        var btns = [];
        for (var i = 0; i < len; i++) {
            var btn = new Button;
            btn.width = btn.height = 146;
            btn.label = this.shows[i];
            btn.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToState, this);
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.addChild(btn);
            btns.push(btn);
        }
        LayoutManager.displayRank(btns, 4, 10, 10, 10, 40);
    };
    SendView.prototype.onAddToState = function (e) {
        var btn = e.currentTarget;
        btn.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToState, this);
        btn.labelDisplay.size = 50;
    };
    SendView.prototype.onClick = function (e) {
        var btn = e.currentTarget;
        this.dispEvent(moon.MoonEvent.CLICK, btn.label);
    };
    return SendView;
}(moon.BasicView));
__reflect(SendView.prototype, "SendView");
//# sourceMappingURL=mvcMediatorView.js.map