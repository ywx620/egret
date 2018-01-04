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
var EnemyData = (function (_super) {
    __extends(EnemyData, _super);
    function EnemyData(name) {
        var _this = _super.call(this) || this;
        _this.vx = 0;
        _this.vy = 0;
        _this.blood = 2;
        _this.render(name);
        return _this;
    }
    EnemyData.prototype.render = function (name) {
        this.skin = this.createBitmapByName(name);
        this.addChild(this.skin);
        var dx = this.skin.width / 2;
        var dy = this.skin.height / 2;
        this.radius = Math.sqrt(dx * dx + dy * dy);
        this.skin.x = -dx;
        this.skin.y = -dy;
        this.x = Math.random() * Const.MAP_WIDTH;
        this.y = Math.random() * Const.MAP_HEIGHT;
        this.vx = Math.random() * 4;
        this.vy = Math.random() * 4;
        //this.x=1136;
        //this.y=640
        //this.alpha=0.1;
        // this.scaleX=this.scaleY=0.1;
    };
    EnemyData.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    EnemyData.prototype.loop = function () {
        //     var speed:number=0.01;
        //    // if(this.alpha<1){
        //       // this.scaleX-=speed;
        //       // this.scaleY-=speed;
        //       // this.alpha+=speed;
        //    // }
        //     var x=(Const.CENTER_X-this.x)/100;
        //     var y=(Const.CENTER_Y-this.y)/100;
        //     this.x+=x;
        //     this.y+=y;
        //     if(Math.sqrt(x*x+y*y)<1){
        //        this.removeSelf();
        //     }
        this.x += this.vx;
        this.y += this.vy;
        var x = this.x, y = this.y;
        var minx = 0, maxx = Const.MAP_WIDTH;
        var miny = 0, maxy = Const.MAP_HEIGHT;
        if (x < minx) {
            this.vx *= -1;
        }
        else if (x > maxx) {
            this.vx *= -1;
        }
        else if (y < miny) {
            this.vy *= -1;
        }
        else if (y > maxy) {
            this.vy *= -1;
        }
    };
    EnemyData.prototype.checkHit = function (b) {
        var p = this.parent.localToGlobal(this.x, this.y);
        var dx = b.x - p.x;
        var dy = b.y - p.y;
        var dis = Math.sqrt(dx * dx + dy * dy);
        if (dis < this.radius) {
            this.blood--;
            if (this.blood == 0) {
                this.removeSelf();
            }
        }
    };
    EnemyData.prototype.removeSelf = function () {
        this.dispatchEvent(new egret.Event(Const.REMOVE));
    };
    return EnemyData;
}(egret.Sprite));
__reflect(EnemyData.prototype, "EnemyData");
//# sourceMappingURL=EnemyManager.js.map