var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 算法类
 * @author
 *
 */
var AStar = (function () {
    function AStar() {
        /** 是否结束寻路 */
        this.isEnd = false;
        /**启发函数方法*/
        //private _heuristic:Function = manhattan;
        //private _heuristic:Function = euclidian;
        this._heuristic = this.diagonal;
        /**直线代价权值*/
        this._straightCost = 1.0;
        /**对角线代价权值*/
        this._diagCost = Math.SQRT2;
    }
    /**在网格中是否找到路径*/
    AStar.prototype.findPath = function (grid) {
        this._grid = grid;
        this._open = [];
        this._closed = [];
        this._startNode = this._grid.startNode;
        this._endNode = this._grid.endNode;
        this._startNode.g = 0;
        this._startNode.h = this._heuristic(this._startNode);
        this._startNode.f = this._startNode.g + this._startNode.h;
        ////将开始节点加入开放列表
        this._open[0] = this._startNode;
        //this._open[0].inOpenList = true;
        return this.search();
    };
    /**寻路*/
    AStar.prototype.search = function () {
        ////九宫格中心节点
        var node;
        while (!this.isEnd) {
            // 当前节点在开放列表中的索引位置
            var currentNum;
            ////在开放列表中查找具有最小 F 值的节点，并把查找到的节点作为下一个要九宫格中心节点
            var ilen = this._open.length;
            node = this._open[0];
            currentNum = 0;
            for (i = 0; i < ilen; i++) {
                if (this._open[i].f < node.f) {
                    node = this._open[i];
                    currentNum = i;
                }
            }
            ////把当前节点从开放列表删除, 加入到封闭列表
            //node.inOpenList = false;
            //如果开放列表中最后一个节点是最小 F 节点 相当于直接openList.pop()  否则相当于交换位置来保存未比较的节点
            this._open[currentNum] = this._open[this._open.length - 1];
            this._open.pop();
            this._closed.push(node);
            ////九宫格循环 确保了检查的节点永远在网格里面
            var startX = 0 > node.x - 1 ? 0 : node.x - 1;
            var endX = this._grid.numCols - 1 < node.x + 1 ? this._grid.numCols - 1 : node.x + 1;
            var startY = 0 > node.y - 1 ? 0 : node.y - 1;
            var endY = this._grid.numRows - 1 < node.y + 1 ? this._grid.numRows - 1 : node.y + 1;
            ////一次九宫格循环节点
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    ////当前要被探查的节点
                    var test = this._grid.getNode(i, j);
                    ////若当前节点等于起始节点 或 不可通过 或 当前节点位于斜方向时其相邻的拐角节点不可通过
                    if (test == node || !test.walkable || !this._grid.getNode(node.x, test.y).walkable || !this._grid.getNode(test.x, node.y).walkable) {
                        continue;
                    }
                    ////代价计算 横竖为1 斜方向为 Math.SQRT2
                    var cost = this._straightCost;
                    if (!((node.x == test.x) || (node.y == test.y))) {
                        //cost = this._diagCost;
                        cost = 1.4;
                    }
                    var g = node.g + cost * test.costMultiplier;
                    var h = this._heuristic(test);
                    var f = g + h;
                    ////在开启列表或关闭列表中找到 表示已经被探测过的节点
                    if (this._open.indexOf(test) != -1 || this._closed.indexOf(test) != -1) {
                        ////如果该相邻节点在开放列表中, 则判断若经由当前节点到达该相邻节点的G值是否小于原来保存的G值,若小于,则将该相邻节点的父节点设为当前节点,并重新设置该相邻节点的G和F值
                        if (f < test.f) {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                        }
                    }
                    else {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        test.parent = node;
                        this._open.push(test);
                    }
                    ////循环结束条件：当结束节点被加入到开放列表作为待检验节点时，表示路径被找到，此时应终止循环
                    if (test == this._endNode) {
                        //console.log(test);
                        this.isEnd = true;
                    }
                }
            }
            ////未找到路径
            if (this._open.length == 0) {
                console.log("no path found");
                this.isEnd = true;
                return false;
            }
        }
        this.buildPath();
        return true;
    };
    /**弗洛伊德路径平滑处理*/
    AStar.prototype.floyd = function () {
        if (this.path == null)
            return;
        this._floydPath = this.path.concat();
        var len = this._floydPath.length;
        if (len > 2) {
            var vector = new NodePoint(0, 0);
            var tempVector = new NodePoint(0, 0);
            //遍历路径数组中全部路径节点，合并在同一直线上的路径节点
            //假设有1,2,3,三点，若2与1的横、纵坐标差值分别与3与2的横、纵坐标差值相等则
            //判断此三点共线，此时可以删除中间点2
            this.floydVector(vector, this._floydPath[len - 1], this._floydPath[len - 2]);
            for (var i = this._floydPath.length - 3; i >= 0; i--) {
                this.floydVector(tempVector, this._floydPath[i + 1], this._floydPath[i]);
                if (vector.x == tempVector.x && vector.y == tempVector.y) {
                    this._floydPath.splice(i + 1, 1);
                }
                else {
                    vector.x = tempVector.x;
                    vector.y = tempVector.y;
                }
            }
        }
        //合并共线节点后进行第二步，消除拐点操作。算法流程如下：
        //如果一个路径由1-10十个节点组成，那么由节点10从1开始检查
        //节点间是否存在障碍物，若它们之间不存在障碍物，则直接合并
        //此两路径节点间所有节点。
        len = this._floydPath.length;
        for (i = len - 1; i >= 0; i--) {
            for (var j = 0; j <= i - 2; j++) {
                if (this._grid.hasBarrier(this._floydPath[i].x, this._floydPath[i].y, this._floydPath[j].x, this._floydPath[j].y) == false) {
                    for (var k = i - 1; k > j; k--) {
                        this._floydPath.splice(k, 1);
                    }
                    i = j;
                    len = this._floydPath.length;
                    break;
                }
            }
        }
    };
    ////判断3点是否在一直线上
    AStar.prototype.floydVector = function (target, n1, n2) {
        target.x = n1.x - n2.x;
        target.y = n1.y - n2.y;
    };
    AStar.prototype.buildPath = function () {
        this._path = new Array();
        var node = this._endNode;
        this._path.push(node);
        while (node != this._startNode) {
            node = node.parent;
            this._path.unshift(node);
        }
    };
    Object.defineProperty(AStar.prototype, "path", {
        get: function () {
            return this._path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AStar.prototype, "floydPath", {
        get: function () {
            return this._floydPath;
        },
        enumerable: true,
        configurable: true
    });
    AStar.prototype.manhattan = function (node) {
        return Math.abs(node.x - this._endNode.x) * this._straightCost + Math.abs(node.y + this._endNode.y) * this._straightCost;
    };
    AStar.prototype.euclidian = function (node) {
        var dx = node.x - this._endNode.x;
        var dy = node.y - this._endNode.y;
        return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
    };
    AStar.prototype.diagonal = function (node) {
        var dx = node.x - this._endNode.x < 0 ? this._endNode.x - node.x : node.x - this._endNode.x;
        var dy = node.y - this._endNode.y < 0 ? this._endNode.y - node.y : node.y - this._endNode.y;
        var diag = dx < dy ? dx : dy;
        var straight = dx + dy;
        //return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
        return 1.4 * diag + this._straightCost * (straight - 2 * diag);
    };
    Object.defineProperty(AStar.prototype, "visited", {
        get: function () {
            //return this._closed.concat(this._open);
            return this._open;
        },
        enumerable: true,
        configurable: true
    });
    return AStar;
}());
__reflect(AStar.prototype, "AStar");
/**
 *
 * 节点类
 * @author
 *
 */
var NodePoint = (function () {
    function NodePoint(x, y) {
        this.walkable = true; //若是障碍节点，则设置为false
        this.alphable = false; //若是透明节点，则设置为true
        this.costMultiplier = 1.0;
        /** 埋葬深度 */
        this.buriedDepth = -1;
        this.x = x;
        this.y = y;
    }
    /** 得到此节点到另一节点的网格距离 */
    NodePoint.prototype.getDistanceTo = function (targetNode) {
        var disX = targetNode.x - this.x;
        var disY = targetNode.y - this.y;
        this.distance = Math.sqrt(disX * disX + disY * disY);
        return this.distance;
    };
    return NodePoint;
}());
__reflect(NodePoint.prototype, "NodePoint");
/**
 *
 *
 * 节点二维数组 节点操作方法
 * @author
 *
 */
var Grid = (function () {
    /**
    * 构造函数
    * @numCols 列
    * @numRows 行
    */
    function Grid(numCols, numRows, cellSize) {
        this._numCols = numCols;
        this._numRows = numRows;
        this._cellSize = cellSize;
        this._nodes = new Array();
        ////以列数作为X坐标循环
        for (var i = 0; i < this._numCols; i++) {
            this._nodes[i] = [];
            for (var j = 0; j < this._numRows; j++) {
                this._nodes[i][j] = new NodePoint(i, j);
            }
        }
    }
    ////////////////////////////////////////
    // public methods
    ////////////////////////////////////////
    /**
    * 根据坐标获取节点
    * @param x 列
    * @param y 行
    */
    Grid.prototype.getNode = function (x, y) {
        return this._nodes[x][y];
    };
    /**
    * 设置结束节点
    * @param x 列
    * @param y 行
    */
    Grid.prototype.setEndNode = function (x, y) {
        this._endNode = this._nodes[x][y];
    };
    /**
    * 设置开始节点
    * @param x 列
    * @param y 行
    */
    Grid.prototype.setStartNode = function (x, y) {
        this._startNode = this._nodes[x][y];
    };
    /**
    * 设置节点是否可以通行
    * @param x 列
    * @param y 行
    */
    Grid.prototype.setWalkable = function (x, y, value) {
        this._nodes[x][y].walkable = value;
    };
    /**
    * 设置节点是否透明
    * @param x 列
    * @param y 行
    */
    Grid.prototype.setAlphable = function (x, y, value) {
        this._nodes[x][y].alphable = value;
    };
    Object.defineProperty(Grid.prototype, "startNode", {
        ////////////////////////////////////////
        // getters / setters
        ////////////////////////////////////////
        /**
        * 返回开始节点
        */
        get: function () {
            return this._startNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "endNode", {
        /**
        * 返回结束节点
        */
        get: function () {
            return this._endNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "numCols", {
        /**
        * 返回网格总列数
        */
        get: function () {
            return this._numCols;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "numRows", {
        /**
        * 返回网格总行数
        */
        get: function () {
            return this._numRows;
        },
        enumerable: true,
        configurable: true
    });
    /**
    * 判断两节点之间是否存在障碍物
    *
    */
    Grid.prototype.hasBarrier = function (startX, startY, endX, endY) {
        //如果起点终点是同一个点那傻子都知道它们间是没有障碍物的
        if (startX == endX && startY == endY)
            return false;
        //两节点中心位置
        var point1 = new egret.Point(startX * this._cellSize + this._cellSize / 2, startY * this._cellSize + this._cellSize / 2);
        var point2 = new egret.Point(endX * this._cellSize + this._cellSize / 2, endY * this._cellSize + this._cellSize / 2);
        //根据起点终点间横纵向距离的大小来判断遍历方向
        var distX = Math.abs(endX - startX);
        var distY = Math.abs(endY - startY);
        /**遍历方向，为true则为横向遍历，否则为纵向遍历*/
        var loopDirection = distX > distY ? true : false;
        /**起始点与终点的连线方程*/
        var lineFuction;
        /** 循环递增量 */
        var i;
        /** 循环起始值 */
        var loopStart;
        /** 循环终结值 */
        var loopEnd;
        /** 起终点连线所经过的节点 */
        var passedNodeList;
        var passedNode;
        //为了运算方便，以下运算全部假设格子尺寸为1，格子坐标就等于它们的行、列号
        if (loopDirection) {
            lineFuction = MathUtil.getLineFunc(point1, point2, 0);
            loopStart = Math.min(startX, endX);
            loopEnd = Math.max(startX, endX);
            //开始横向遍历起点与终点间的节点看是否存在障碍(不可移动点) 
            for (i = loopStart; i < loopEnd; i++) {
                //由于线段方程是根据终起点中心点连线算出的，所以对于起始点来说需要根据其中心点
                //位置来算，而对于其他点则根据左上角来算
                var xpos = i * this._cellSize + this._cellSize;
                //根据x得到直线上的y值
                var yPos = lineFuction(xpos);
                //检查经过的节点是否有障碍物，若有则返回true
                passedNodeList = this.getNodesUnderPoint(i + 1, yPos / this._cellSize);
                for (var idx in passedNodeList) {
                    if (passedNodeList[idx].walkable == false)
                        return true;
                }
            }
        }
        else {
            lineFuction = MathUtil.getLineFunc(point1, point2, 1);
            loopStart = Math.min(startY, endY);
            loopEnd = Math.max(startY, endY);
            //开始纵向遍历起点与终点间的节点看是否存在障碍(不可移动点)
            for (i = loopStart; i < loopEnd; i++) {
                var ypos = i * this._cellSize + this._cellSize;
                //根据y得到直线上的x值
                var xPos = lineFuction(ypos);
                passedNodeList = this.getNodesUnderPoint(xPos / this._cellSize, i + 1);
                for (var idx in passedNodeList) {
                    if (passedNodeList[idx].walkable == false)
                        return true;
                }
            }
        }
        return false;
    };
    /**
    * 得到一个点下的所有节点
    * @param xPos             点的横向位置
    * @param yPos             点的纵向位置
    * @param exception        例外格，若其值不为空，则在得到一个点下的所有节点后会排除这些例外格
    * @return                 共享此点的所有节点
    *
    */
    Grid.prototype.getNodesUnderPoint = function (xPos, yPos, exception) {
        if (exception === void 0) { exception = null; }
        var result = [];
        var xIsInt = xPos % 1 == 0;
        var yIsInt = yPos % 1 == 0;
        //点由四节点共享情况
        if (xIsInt && yIsInt) {
            result[0] = this.getNode(xPos - 1, yPos - 1);
            result[1] = this.getNode(xPos, yPos - 1);
            result[2] = this.getNode(xPos - 1, yPos);
            result[3] = this.getNode(xPos, yPos);
        }
        else if (xIsInt && !yIsInt) {
            result[0] = this.getNode(xPos - 1, Math.floor(yPos));
            result[1] = this.getNode(xPos, Math.floor(yPos));
        }
        else if (!xIsInt && yIsInt) {
            result[0] = this.getNode(Math.floor(xPos), yPos - 1);
            result[1] = this.getNode(Math.floor(xPos), yPos);
        }
        else {
            result[0] = this.getNode(Math.floor(xPos), Math.floor(yPos));
        }
        //在返回结果前检查结果中是否包含例外点，若包含则排除掉
        if (exception && exception.length > 0) {
            for (var i = 0; i < result.length; i++) {
                //console.log(result[i].x + "  "+result[i].y);
                if (exception.indexOf(result[i]) != -1) {
                    result.splice(i, 1);
                    i--;
                }
            }
        }
        return result;
    };
    ////
    /**当终点不可移动时寻找一个离原终点最近的可移动点来替代之 */
    Grid.prototype.findReplacer = function (fromNode, toNode) {
        var result;
        //若终点可移动则根本无需寻找替代点
        if (toNode.walkable) {
            result = toNode;
        }
        else {
            //根据节点的埋葬深度选择遍历的圈
            //若该节点是第一次遍历，则计算其埋葬深度
            if (toNode.buriedDepth == -1) {
                toNode.buriedDepth = this.getNodeBuriedDepth(toNode, Math.max(this._numCols, this._numRows));
            }
            var xFrom = toNode.x - toNode.buriedDepth < 0 ? 0 : toNode.x - toNode.buriedDepth;
            var xTo = toNode.x + toNode.buriedDepth > this.numCols - 1 ? this.numCols - 1 : toNode.x + toNode.buriedDepth;
            var yFrom = toNode.y - toNode.buriedDepth < 0 ? 0 : toNode.y - toNode.buriedDepth;
            var yTo = toNode.y + toNode.buriedDepth > this.numRows - 1 ? this.numRows - 1 : toNode.y + toNode.buriedDepth;
            var n; //当前遍历节点
            for (var i = xFrom; i <= xTo; i++) {
                for (var j = yFrom; j <= yTo; j++) {
                    if ((i > xFrom && i < xTo) && (j > yFrom && j < yTo)) {
                        continue;
                    }
                    n = this.getNode(i, j);
                    if (n.walkable) {
                        //计算此候选节点到起点的距离，记录离起点最近的候选点为替代点
                        n.getDistanceTo(fromNode);
                        if (!result) {
                            result = n;
                        }
                        else if (n.distance < result.distance) {
                            result = n;
                        }
                    }
                }
            }
        }
        return result;
    };
    /** 计算全部路径点的埋葬深度 */
    Grid.prototype.calculateBuriedDepth = function () {
        var node;
        for (var i = 0; i < this._numCols; i++) {
            for (var j = 0; j < this._numRows; j++) {
                node = this._nodes[i][j];
                if (node.walkable) {
                    node.buriedDepth = 0;
                }
                else {
                    node.buriedDepth = this.getNodeBuriedDepth(node, Math.max(this._numCols, this._numRows));
                }
            }
        }
    };
    /** 计算一个节点的埋葬深度
    * @param node       欲计算深度的节点
    * @param loopCount  计算深度时遍历此节点外围圈数。默认值为10*/
    Grid.prototype.getNodeBuriedDepth = function (node, loopCount) {
        if (loopCount === void 0) { loopCount = 10; }
        //如果检测节点本身是不可移动的则默认它的深度为1
        var result = node.walkable ? 0 : 1;
        var l = 1;
        while (l <= loopCount) {
            var startX = node.x - l < 0 ? 0 : node.x - l;
            var endX = node.x + l > this.numCols - 1 ? this.numCols - 1 : node.x + l;
            var startY = node.y - l < 0 ? 0 : node.y - l;
            var endY = node.y + l > this.numRows - 1 ? this.numRows - 1 : node.y + l;
            var n;
            //遍历一个节点周围一圈看是否周围一圈全部是不可移动点，若是，则深度加一，
            //否则返回当前累积的深度值
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    n = this.getNode(i, j);
                    if (n != node && n.walkable) {
                        return result;
                    }
                }
            }
            //遍历完一圈，没发现一个可移动点，则埋葬深度加一。接着遍历下一圈
            result++;
            l++;
        }
        return result;
    };
    return Grid;
}());
__reflect(Grid.prototype, "Grid");
/**
 *
 * 寻路算法中使用到的数学方法 (二元一次直线公式)
 * @author
 *
 */
var MathUtil = (function () {
    function MathUtil() {
    }
    /**
    * 根据两点确定这两点连线的二元一次方程 y = ax + b或者 x = ay + b
    * @param ponit1
    * @param point2
    * @param type                指定返回函数的形式。为0则根据x值得到y，为1则根据y得到x
    *
    * @return 由参数中两点确定的直线的二元一次函数
    */
    MathUtil.getLineFunc = function (ponit1, point2, type) {
        if (type === void 0) { type = 0; }
        var resultFuc;
        // 先考虑两点在一条垂直于坐标轴直线的情况，此时直线方程为 y = a 或者 x = a 的形式
        if (ponit1.x == point2.x) {
            if (type == 0) {
                throw new Error("两点所确定直线垂直于y轴，不能根据x值得到y值");
            }
            else if (type == 1) {
                resultFuc = function (y) {
                    return ponit1.x;
                };
            }
            return resultFuc;
        }
        else if (ponit1.y == point2.y) {
            if (type == 0) {
                resultFuc = function (x) {
                    return ponit1.y;
                };
            }
            else if (type == 1) {
                throw new Error("两点所确定直线垂直于y轴，不能根据x值得到y值");
            }
            return resultFuc;
        }
        // 当两点确定直线不垂直于坐标轴时直线方程设为 y = ax + b
        var a;
        // 根据
        // y1 = ax1 + b
        // y2 = ax2 + b
        // 上下两式相减消去b, 得到 a = ( y1 - y2 ) / ( x1 - x2 ) 
        a = (ponit1.y - point2.y) / (ponit1.x - point2.x);
        var b;
        //将a的值代入任一方程式即可得到b
        b = ponit1.y - a * ponit1.x;
        //把a,b值代入即可得到结果函数
        if (type == 0) {
            resultFuc = function (x) {
                return a * x + b;
            };
        }
        else if (type == 1) {
            resultFuc = function (y) {
                return (y - b) / a;
            };
        }
        return resultFuc;
    };
    return MathUtil;
}());
__reflect(MathUtil.prototype, "MathUtil");
//# sourceMappingURL=AStar.js.map