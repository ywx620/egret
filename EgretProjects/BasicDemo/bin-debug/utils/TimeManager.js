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
var time;
(function (time_1) {
    /**
     * ...2016-11-18
     * @author vinson
     * 抽象时间产品
     */
    var TimeAbstract = (function (_super) {
        __extends(TimeAbstract, _super);
        function TimeAbstract(target) {
            if (target === void 0) { target = null; }
            var _this = _super.call(this, target) || this;
            _this.time = 0;
            _this.name = "";
            _this.showNum = 1;
            return _this;
        }
        TimeAbstract.prototype.removeTime = function () {
            if (this.timer) {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
                this.timer = null;
            }
        };
        TimeAbstract.prototype.createTime = function () {
            this.removeTime();
            this.timer = new egret.Timer(1000, this.time);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        };
        /**把数字转换成时间格式,showNum为3时00:00:00,为2时00:00,为1时00*/
        TimeAbstract.prototype.getTimeFormatByNum = function (num, type, showNum) {
            if (type === void 0) { type = ":"; }
            if (showNum === void 0) { showNum = 3; }
            var s;
            var hour;
            var minute;
            var second;
            if (showNum == 1) {
                second = this.numberFormat(num);
                return second;
            }
            else if (showNum == 2) {
                minute = this.numberFormat((num / 60));
                second = this.numberFormat(num % 60);
                return minute + type + second;
            }
            else {
                hour = this.numberFormat(num / 60 / 60 >> 0);
                minute = this.numberFormat((num / 60) % 60);
                second = this.numberFormat(num % 60);
                return hour + type + minute + type + second;
            }
        };
        /**数字格式，把小于10的数在前面加个0*/
        TimeAbstract.prototype.numberFormat = function (num) {
            if (num >= 10)
                return "" + Math.floor(num);
            else
                return "0" + Math.floor(num);
        };
        /**此方法必须被子类重写*/
        TimeAbstract.prototype.onTimer = function (event) {
            if (event === void 0) { event = null; }
            throw new Error("抽像类不能实例化,必须使用子类实例化");
        };
        /**设置开始计时并且开始计时 value是单位是秒*/
        TimeAbstract.prototype.setTimeStart = function (vaule) {
            this.time = vaule;
            this.start();
        };
        /**开始计时*/
        TimeAbstract.prototype.start = function () {
            if (this.timer == null) {
                this.createTime();
            }
            this.timer.start();
            this.onTimer();
        };
        TimeAbstract.prototype.setBackFunction = function (value) {
            this.backfunction = value;
        };
        TimeAbstract.prototype.dispose = function () {
            this.removeTime();
        };
        return TimeAbstract;
    }(egret.EventDispatcher));
    time_1.TimeAbstract = TimeAbstract;
    __reflect(TimeAbstract.prototype, "time.TimeAbstract", ["time.ITime"]);
    /**
     * ...2016-11-17
     * @author vinson
     * 倒计时产品
     */
    var TimeCountDown = (function (_super) {
        __extends(TimeCountDown, _super);
        function TimeCountDown() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TimeCountDown.prototype.onTimer = function (event) {
            if (event === void 0) { event = null; }
            var value = this.time--;
            var show = this.getTimeFormatByNum(value, ":", this.showNum);
            var data = { value: value, show: show };
            if (this.backfunction != null)
                this.backfunction(data);
            if (value == 0) {
                this.time = 0;
                this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
            }
        };
        return TimeCountDown;
    }(TimeAbstract));
    time_1.TimeCountDown = TimeCountDown;
    __reflect(TimeCountDown.prototype, "time.TimeCountDown");
    /**
     * ...2016-11-17
     * @author vinson
     * 计时器产品
     */
    var TimeCountUp = (function (_super) {
        __extends(TimeCountUp, _super);
        function TimeCountUp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TimeCountUp.prototype.onTimer = function (event) {
            if (event === void 0) { event = null; }
            var value = this.time++;
            var show = this.getTimeFormatByNum(value, ":", this.showNum);
            var data = { value: value, show: show };
            if (this.backfunction != null)
                this.backfunction(data);
        };
        return TimeCountUp;
    }(TimeAbstract));
    time_1.TimeCountUp = TimeCountUp;
    __reflect(TimeCountUp.prototype, "time.TimeCountUp");
    /**
     * ...2016-11-17
     * @author vinson
     * 时间的简单工厂模式(生产倒计时和计时器两种产品)
     * 可根据产品标签名和类型的不同生产各种独立的产品,各产品独立运行相互不干扰
     * 在UI层上的表示,UI关闭后,产品依然在继续运行.
     * 重新打开UI后,只要判断一下产品时间是否为0,不为0则不需要重新赋直,产品会继续运行
     * 如果是倒计时,当时间为0时会自动销毁,如果是计时器则需要手动
     */
    var TimeFactory = (function () {
        function TimeFactory() {
            this.content = {};
            this._timeName = 0;
        }
        TimeFactory.getIns = function () {
            if (this._instance == null) {
                this._instance = new TimeFactory();
            }
            return this._instance;
        };
        Object.defineProperty(TimeFactory.prototype, "timeName", {
            /**如果找不到合适的key值，可以使用这个做为key值*/
            get: function () {
                this._timeName++;
                return "timeFactory" + this._timeName;
            },
            enumerable: true,
            configurable: true
        });
        /**在工厂中创建时间产品*/
        TimeFactory.prototype.createTime = function (name, type) {
            if (type === void 0) { type = "down"; }
            if (this.content[name] == null) {
                var time;
                if (type == TimeFactory.COUNT_DOWN) {
                    time = new TimeCountDown();
                    time.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
                }
                else {
                    time = new TimeCountUp();
                }
                time.name = name; //给产品标个签名
                this.content[name] = time; //把产品放入工厂仓库中
            }
            return this.content[name];
        };
        /**找到时间产品然后销毁掉(倒计时的时间到了是可以自动销毁,不过计时器是不能自动销毁的)*/
        TimeFactory.prototype.removeTime = function (name) {
            var time = this.content[name];
            if (time) {
                this.dispose(time);
            }
        };
        /**得到已经存在的时间产品*/
        TimeFactory.prototype.getContentTime = function (name) {
            var time = this.content[name];
            if (time)
                return time;
            return null;
        };
        /**当倒计时产品时间为0时表示此产品已经过期,时间工厂会自动把它销毁掉*/
        TimeFactory.prototype.onComplete = function (event) {
            var time = (event.currentTarget);
            this.dispose(time);
        };
        /**消毁时间产品*/
        TimeFactory.prototype.dispose = function (time) {
            time.dispose();
            delete this.content[time.name];
        };
        TimeFactory.COUNT_DOWN = "down";
        TimeFactory.COUNT_UP = "up";
        return TimeFactory;
    }());
    time_1.TimeFactory = TimeFactory;
    __reflect(TimeFactory.prototype, "time.TimeFactory");
})(time || (time = {}));
//# sourceMappingURL=TimeManager.js.map