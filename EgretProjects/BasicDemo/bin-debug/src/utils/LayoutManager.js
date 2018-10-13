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
var LayoutManager = (function (_super) {
    __extends(LayoutManager, _super);
    function LayoutManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 可视对象排列
     * xNum在x轴上排列的数量
     * xDis,yDis,在x轴与y轴上的间距
     * x,y初始位置
     * sign:正1从左向右从上向下排当sign为负1时则反过来,,*/
    LayoutManager.displayRank = function (array, xNum, xDis, yDis, x, y, sign) {
        if (xNum === void 0) { xNum = 1; }
        if (xDis === void 0) { xDis = 0; }
        if (yDis === void 0) { yDis = 0; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (sign === void 0) { sign = 1; }
        var display;
        for (var i = 0; i < array.length; i++) {
            display = array[i];
            display.x = x + Math.floor(i % xNum) * (display.width + xDis) * sign;
            display.y = y + Math.floor(i / xNum) * (display.height + yDis) * sign;
        }
    };
    /**
     * 分部的可视对象排列
     * array:视对象数组
     * part1,part2：[len:number,xNum:number,xDis:number,yDis:number,x:number,y:number],参看方求displayRank的参数
     * sign:正1从左向右从上向下排当sign为负1时则反过来
     * part1[0]+part2[0]==array.length;//如果为false,会有问题
     * */
    LayoutManager.displayRankPart = function (array, part1, part2, sign) {
        if (part2 === void 0) { part2 = null; }
        if (sign === void 0) { sign = 1; }
        var len1, len2, xNum, xDis, yDis, x, y;
        var display;
        len1 = part1[0];
        xNum = part1[1];
        xDis = part1[2];
        yDis = part1[3];
        x = part1[4];
        y = part1[5];
        var arr1 = array.slice(0, len1);
        LayoutManager.displayRank(arr1, xNum, xDis, yDis, x, y, sign);
        if (part2) {
            len2 = part2[0];
            xNum = part2[1];
            xDis = part2[2];
            yDis = part2[3];
            x = part2[4];
            y = part2[5];
            var arr2 = array.slice(len1, len1 + len2);
            LayoutManager.displayRank(arr2, xNum, xDis, yDis, x, y, sign);
        }
    };
    /**
     * 按顺时针环绕圆形/扇形/椭圆形的排列布局
     * center中心位置
     * radius半径距离
     * loop环形排列为2*Math.PI,如果值是Math.PI/2是90度的扇形
     * skewR偏离的弧度（90度=Math.PI/2弧度）
     * skewX偏离的X轴位置
     * skewY偏离的Y轴位置
     * skewXR在X轴上半径增加的值（椭圆布局）
     * skewYR在Y轴上半径增加的值（椭圆布局）
     * */
    LayoutManager.displayCircle = function (array, centerX, centerY, radius, loop, skewR, skewX, skewY, skewXR, skewYR) {
        if (loop === void 0) { loop = 2 * Math.PI; }
        if (skewR === void 0) { skewR = 0; }
        if (skewX === void 0) { skewX = 0; }
        if (skewY === void 0) { skewY = 0; }
        if (skewXR === void 0) { skewXR = 0; }
        if (skewYR === void 0) { skewYR = 0; }
        var display;
        var count = array.length;
        var radian = loop / count;
        if (loop < 2 * Math.PI) {
            radian = loop / (count - 1);
        }
        for (var i = 0; i < count; i++) {
            display = array[i];
            display.x = centerX + Math.cos(radian * i - skewR) * (radius + skewXR) + skewX;
            display.y = centerY + Math.sin(radian * i - skewR) * (radius + skewYR) + skewY;
        }
    };
    /**
     * 按顺时针环绕多边形的排列布局
     * center中心位置
     * radius半径距离
     * size边数
     * skewR偏离的弧度（90度=Math.PI/2弧度）
     * 需要注意的是边数必须是数组长度的除数
     * */
    LayoutManager.displayPolygon = function (array, centerX, centerY, radius, size, skewR) {
        if (radius === void 0) { radius = 100; }
        if (size === void 0) { size = 5; }
        if (skewR === void 0) { skewR = 0; }
        if (size < 3 || size > array.length) {
            console.log("多边形的边数不正确");
            return;
        }
        var display;
        var count = array.length;
        var radian = 2 * Math.PI / size; //每个边的弧度
        var num = Math.floor(count / size); //每个边的个数
        for (var i = 0; i < size; i++) {
            var x1 = centerX + Math.cos(i * radian - skewR) * radius;
            var y1 = centerY + Math.sin(i * radian - skewR) * radius;
            var j = i + 1;
            j = j == size ? 0 : j;
            var x2 = centerX + Math.cos(j * radian - skewR) * radius;
            var y2 = centerY + Math.sin(j * radian - skewR) * radius;
            for (var k = 0; k < num; k++) {
                var m = k + num * i;
                if (m < count) {
                    display = array[m];
                    display.x = x1;
                    display.y = y1;
                    display.x += (x2 - x1) / num * k;
                    display.y += (y2 - y1) / num * k;
                }
            }
        }
    };
    /**
     * 三角形排列布局
     * xDis,yDis,在x轴与y轴上的间距
     * x,y初始位置
     * sign:正1从左向右从上向下排当sign为负1时则反过来
     * isCenter是等腰三角形，为false时是直角三角形
     * */
    LayoutManager.displayTrigon = function (array, xDis, yDis, x, y, sign, isCenter) {
        if (xDis === void 0) { xDis = 0; }
        if (yDis === void 0) { yDis = 0; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (sign === void 0) { sign = 1; }
        if (isCenter === void 0) { isCenter = true; }
        var display;
        var start = 0;
        var len = 1;
        var index = 1;
        var temps = array.slice(start, len);
        rank();
        function rank() {
            var cx = 0;
            var tempLen = temps.length;
            if (tempLen > 1 && isCenter) {
                cx = (tempLen - 1) * (display.width + xDis) / -2 * sign;
            }
            for (var i = 0; i < tempLen; i++) {
                display = temps[i];
                display.x = x + i * (display.width + xDis) * sign + cx;
                display.y = y + (index - 1) * (display.height + yDis) * sign;
            }
            index++;
            start = len;
            len = start + index;
            temps = array.slice(start, len);
            if (len <= array.length + start) {
                rank();
            }
        }
    };
    /**
     * 可视对象砖块（墙）排列
     * xNum在x轴上排列的数量
     * xDis,yDis,在x轴与y轴上的间距
     * x,y初始位置
     * offX:偏移的距离,*/
    LayoutManager.displayWall = function (array, xNum, xDis, yDis, x, y, offX) {
        if (xNum === void 0) { xNum = 1; }
        if (xDis === void 0) { xDis = 0; }
        if (yDis === void 0) { yDis = 0; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (offX === void 0) { offX = 10; }
        var display;
        for (var i = 0; i < array.length; i++) {
            var xx = Math.floor(i / xNum) % 2 == 0 ? offX : 0;
            display = array[i];
            display.x = x + Math.floor(i % xNum) * (display.width + xDis) + xx;
            display.y = y + Math.floor(i / xNum) * (display.height + yDis);
        }
    };
    /**面积不相等的块在X轴的排列
     * xNum在x轴上排列的数量
     * xDis,在x轴上的间距
     * x,y初始位置
     * offX:偏移的距离,*/
    LayoutManager.displayRankX = function (array, xNum, xDis, x, y) {
        if (xNum === void 0) { xNum = 1; }
        if (xDis === void 0) { xDis = 0; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var display;
        var count = array.length;
        var prevx = 0;
        for (var i = 0; i < count; i++) {
            display = array[i];
            var width = display.width;
            display.y = y;
            display.x = prevx;
            prevx = display.x + (display.width + xDis);
        }
    };
    /**
     * 可视对象梯形的排列
     * min在x轴上排列的最小的数值，用于拐弯
     * max在x轴上排列的最大的数值，用于拐弯
     * xDis,yDis,在x轴与y轴上的间距
     * x,y初始位置
     */
    LayoutManager.displayLadder = function (array, min, max, xDis, yDis, x, y) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 200; }
        if (xDis === void 0) { xDis = 0; }
        if (yDis === void 0) { yDis = 0; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var j = 0;
        var s = 1;
        var display;
        var count = array.length;
        for (var i = 0; i < count; i++) {
            display = array[i];
            var width = display.width;
            var height = display.height;
            display.y = y + i * (height + xDis);
            display.x = x + j * (width + yDis);
            j += s;
            if (display.x > max) {
                s = -1;
            }
            else if (display.x < min) {
                s = 1;
            }
        }
    };
    return LayoutManager;
}(egret.HashObject));
__reflect(LayoutManager.prototype, "LayoutManager");
//# sourceMappingURL=LayoutManager.js.map