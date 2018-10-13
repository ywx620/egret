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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 *
 *
 * 编译器和运行时都会处理此处逻辑。
 * 为了保证编译器更方便提取出此处逻辑，使用ECMAScript 2015 装饰器语法
 *
 * 在编译时（ 执行 res build ），命令行会遍历 resource 文件夹中的所有文件，
 * 将其中每个文件执行 RES.mapConfig 中第三个参数所对应的函数。
 * 如果函数返回值不为空，则被添加到资源配置中。
 * 资源配置最终会写入 RES.mapConfig 的第一个参数所对应的文件中
 *
 * 在运行时，资源管理框架会首先加载 RES.mapConfig 第一个参数所对应的配置文件，
 * 之后加载的每一个文件，都会通过 RES.mapConfig 的第三个参数去确认加载类型，
 * 进而用对应类型的处理器进行预处理（ 如图片处理，JSON解析等）
 * 最后再将处理后的最终结果返回给用户
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, function (event) {
            //异步函数会返回一个 Promise            
            _this.loadAssets()
                .then(function () {
                _this.createGameScene();
            })
                .catch(function (e) {
                // RES.loadConfig 、RES.loadGroup 相关逻辑的报错都会执行到此处逻辑
                console.error(e);
            });
        }, _this);
        return _this;
    }
    Main.prototype.loadAssets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingUI;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loadingUI = new LoadingUI();
                        this.addChild(loadingUI);
                        //  使用 async / await 语法处理资源加载，无需复杂的事件侦听函数或者回调函数嵌套
                        return [4 /*yield*/, RES.loadConfig()];
                    case 1:
                        //  使用 async / await 语法处理资源加载，无需复杂的事件侦听函数或者回调函数嵌套
                        _a.sent();
                        //  虽然没有显式声明 LoadingUI implements PromiseTaskReporter，
                        //  但是 LoadingUI 事实上实现了 PromiseTaskReporter 接口，
                        //  这就已经可以通过 RES.loadGroup(groupName,priority,reporter) 的类型检查
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingUI)];
                    case 2:
                        //  虽然没有显式声明 LoadingUI implements PromiseTaskReporter，
                        //  但是 LoadingUI 事实上实现了 PromiseTaskReporter 接口，
                        //  这就已经可以通过 RES.loadGroup(groupName,priority,reporter) 的类型检查
                        _a.sent();
                        this.removeChild(loadingUI);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.createGameScene = function () {
        var sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
    };
    /**
     * 通过类型推断，这个函数的返回值为 egret.Bitmap，无需开发者手动设置
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Main = __decorate([
        RES.mapConfig("config.json", function () { return "resource"; }, function (path) {
            var ext = path.substr(path.lastIndexOf(".") + 1);
            var typeMap = {
                "jpg": "image",
                "png": "image",
                "webp": "image",
                "json": "json",
                "fnt": "font",
                "pvr": "pvr",
                "mp3": "sound"
            };
            var type = typeMap[ext];
            if (type == "json") {
                if (path.indexOf("sheet") >= 0) {
                    type = "sheet";
                }
                else if (path.indexOf("movieclip") >= 0) {
                    type = "movieclip";
                }
                ;
            }
            return type;
        })
    ], Main);
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map