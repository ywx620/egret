//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
/// <reference path="EXMLParser.ts" />
var EXML;
(function (EXML) {
    var parser = new eui.sys.EXMLParser();
    var requestPool = [];
    var callBackMap = {};
    var parsedClasses = {};
    var $prefixURL = "";
    Object.defineProperty(EXML, "prefixURL", {
        get: function () { return $prefixURL; },
        set: function (value) { $prefixURL = value; },
        enumerable: true,
        configurable: true
    });
    /**
     * Parsing a text of EXML file for a definition of class. You can declare the <code>class</code> property in the root
     * node of the EXML to register to the global as a class name.
     *
     * It will be fail to register and output a warning if the specified name already exists. You can get a definition
     * of a class through <code>egret.getDefinitionByName(className)</code>.
     *
     * @param text the text of a EXML file.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 解析一个 EXML 文件的文本内容为一个类定义。您可以在 EXML 文件的根节点上声明 class 属性作为要注册到全局的类名。
     * 若指定的类名已经存在，将会注册失败，并输出一个警告。注册成功后，您也可以通过 egret.getDefinitionByName(className) 方法获取这个 EXML 文件对应的类定义。
     *
     * @param text 要解析的 EXML 文件内容。
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language zh_CN
     */
    function parse(text) {
        return parser.parse(text);
    }
    EXML.parse = parse;
    /**
     * Load and parse an external EXML file for a class definition. You can declare the <code>class</code> property in the root
     * node of the EXML to register to the global as a class name.
     *
     * It will be fail to register and output a warning if the specified name already exists. You can get a definition
     * of a class through <code>egret.getDefinitionByName(className)</code>.
     *
     * @param url the path of an EXML file
     * @param callBack method to invoke with an argument of the result when load and parse completed or failed. The argument will be
     * <code>undefined</code> if load or parse failed.
     * @param thisObject <code>this</code> object of callBack
     * @param useCache use cached EXML
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 加载并解析一个外部的 EXML 文件为一个类定义。您可以在 EXML 文件的根节点上声明 class 属性作为要注册到全局的类名。
     * 若指定的类名已经存在，将会注册失败，并输出一个警告。注册成功后，您也可以通过 egret.getDefinitionByName(className) 方法获取这个 EXML 文件对应的类定义。
     *
     * @param url 要加载的 EXML 文件路径
     * @param callBack 加载并解析完成后的回调函数，无论加载成功还是失败，此函数均会被回调。失败时将传入 undefined 作为回调函数参数。
     * @param thisObject 回调函数的 this 引用。
     * @param useCache 使用缓存的EXML
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language zh_CN
     */
    function load(url, callBack, thisObject, useCache) {
        if (useCache === void 0) { useCache = false; }
        if (true) {
            if (!url) {
                egret.$error(1003, "url");
            }
        }
        if (useCache && (url in parsedClasses)) {
            callBack && callBack.call(thisObject, parsedClasses[url], url);
            return;
        }
        var list = callBackMap[url];
        if (list) {
            list.push([callBack, thisObject]);
            return;
        }
        callBackMap[url] = [[callBack, thisObject]];
        request(url, $parseURLContent);
    }
    EXML.load = load;
    /**
     * @private
     */
    function $loadAll(urls, callBack, thisObject, useCache) {
        if (useCache === void 0) { useCache = false; }
        if (!urls || urls.length == 0) {
            callBack && callBack.call(thisObject, [], urls);
            return;
        }
        var exmlContents = [];
        urls.forEach(function (url) {
            var loaded = function (url, text) {
                exmlContents[url] = text;
                exmlContents.push(url);
                if (exmlContents.length == urls.length)
                    onLoadAllFinished(urls, exmlContents, callBack, thisObject);
            };
            if (useCache && (url in parsedClasses)) {
                loaded(url, "");
                return;
            }
            request(url, loaded);
        });
    }
    EXML.$loadAll = $loadAll;
    /**
     * @private
     */
    function onLoadAllFinished(urls, exmlContents, callBack, thisObject) {
        var clazzes = [];
        urls.forEach(function (url, i) {
            if ((url in parsedClasses) && !exmlContents[url]) {
                clazzes[i] = parsedClasses[url];
                return;
            }
            var text = exmlContents[url];
            var clazz = $parseURLContent(url, text);
            clazzes[i] = clazz;
        });
        callBack && callBack.call(thisObject, clazzes, urls);
    }
    /**
     * @private
     * @param url
     * @param text
     */
    function $parseURLContentAsJs(url, text, className) {
        var clazz = null;
        if (text) {
            clazz = parser.$parseCode(text, className);
        }
        if (url) {
            parsedClasses[url] = clazz;
            var list = callBackMap[url];
            delete callBackMap[url];
            var length_1 = list ? list.length : 0;
            for (var i = 0; i < length_1; i++) {
                var arr = list[i];
                if (arr[0] && arr[1])
                    arr[0].call(arr[1], clazz, url);
            }
        }
        return clazz;
    }
    EXML.$parseURLContentAsJs = $parseURLContentAsJs;
    /**
     * @private
     */
    function $parseURLContent(url, text) {
        var clazz = null;
        if (text) {
            try {
                clazz = parse(text);
            }
            catch (e) {
                console.error(url + "\n" + e.message);
            }
        }
        if (url) {
            parsedClasses[url] = clazz;
            var list = callBackMap[url];
            delete callBackMap[url];
            var length_2 = list ? list.length : 0;
            for (var i = 0; i < length_2; i++) {
                var arr = list[i];
                if (arr[0] && arr[1])
                    arr[0].call(arr[1], clazz, url);
            }
        }
        return clazz;
    }
    EXML.$parseURLContent = $parseURLContent;
    /**
     * @private
     */
    function request(url, callback) {
        var openUrl = url;
        if (url.indexOf("://") == -1) {
            openUrl = $prefixURL + url;
        }
        var onConfigLoaded = function (str) {
            if (!str) {
                str = "";
            }
            callback(url, str);
        };
        eui.getTheme(openUrl, onConfigLoaded);
    }
})(EXML || (EXML = {}));
//# sourceMappingURL=EXML.js.map