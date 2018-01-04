/**
*
* @xyl 
* 自定义事件管理器
*/
class EventManager {
    private static eventList: any = {};

    // 添加事件
    public static addEvent(type: string, fun: Function, thisObject: any): void {
        if (this.eventList[type] == null) {
            this.eventList[type] = [];
        }
        var len: number = this.eventList[type].length;
        this.eventList[type][len] = { "fun": fun, "this": thisObject };
    }

    //删除事件
    public static removeEvent(type: string, fun: Function, thisObject?:any): void {
        var dic: any = this.eventList[type];
        if (dic == null) return;

        for (var i in dic) {
            var data: any = dic;
            if (data["fun"] == fun) {
                dic.splice(i, 1);
            }
        }
    }

    //派发事件
    public static dispatchEvent(type: string, data: any): void {
        var dic: Array<Function> = this.eventList[type];
        if (!dic) return;
        for (var i: number = 0; i < dic.length; i++) {
            var data1: any = dic;
            (<Function>data1["fun"]).apply(data1["this"], [data]);
        }
    }

    public static hasEvent(type: string): boolean {
        var dic: Array<Function> = this.eventList[type];
        if (!dic) return false;
        return true;
    }

    //删除无用事件类型
    public static gc() {

        }
    }