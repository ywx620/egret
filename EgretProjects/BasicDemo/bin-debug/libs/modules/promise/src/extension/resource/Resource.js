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
/// <reference path="core/ResourceItem.ts" />
/// <reference path="core/ResourceConfig.ts" />
/// <reference path="core/ResourceLoader.ts" />
/// <reference path="events/ResourceEvent.ts" />
/// <reference path="analyzer/BinAnalyzer.ts" />
/// <reference path="analyzer/ImageAnalyzer.ts" />
/// <reference path="analyzer/TextAnalyzer.ts" />
/// <reference path="analyzer/JsonAnalyzer.ts" />
/// <reference path="analyzer/SheetAnalyzer.ts" />
/// <reference path="analyzer/FontAnalyzer.ts" />
/// <reference path="analyzer/SoundAnalyzer.ts" />
/// <reference path="analyzer/XMLAnalyzer.ts" />
/// <reference path="version/IVersionController.ts" />
/// <reference path="version/Html5VersionController.ts" />
/// <reference path="version/NativeVersionController.ts" />
var RES;
(function (RES) {
    /**
     * Conduct mapping injection with class definition as the value.
     * @param type Injection type.
     * @param analyzerClass Injection type classes need to be resolved.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample extension/resource/Resource.ts
     * @language en_US
     */
    /**
     * 以类定义为值进行映射注入。
     * @param type 注入的类型。
     * @param analyzerClass 注入类型需要解析的类。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample extension/resource/Resource.ts
     * @language zh_CN
     */
    function registerAnalyzer(type, analyzerClass) {
        instance.registerAnalyzer(type, analyzerClass);
    }
    RES.registerAnalyzer = registerAnalyzer;
    /**
     * Get mapping injection.
     * @param type Injection type.
     * @version Egret 3.2.6
     * @platform Web,Native
     * @includeExample extension/resource/Resource.ts
     * @language en_US
     */
    /**
     * 获取映射注入。
     * @param type 注入的类型。
     * @version Egret 3.2.6
     * @platform Web,Native
     * @includeExample extension/resource/Resource.ts
     * @language zh_CN
     */
    function getAnalyzer(type) {
        return instance.$getAnalyzerByType(type);
    }
    RES.getAnalyzer = getAnalyzer;
    /**
     * Register the VersionController
     * @param vcs The VersionController to register.
     * @version Egret 2.5
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 注册版本控制器,通过RES模块加载资源时会从版本控制器获取真实url
     * @param vcs 注入的版本控制器。
     * @version Egret 2.5
     * @platform Web,Native
     * @language zh_CN
     */
    function registerVersionController(vcs) {
        instance.$registerVersionController(vcs);
    }
    RES.registerVersionController = registerVersionController;
    /**
     * Returns the VersionController
     * @version Egret 2.5
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 获得版本控制器.
     * @version Egret 2.5
     * @platform Web,Native
     * @language zh_CN
     */
    function getVersionController() {
        return instance.vcs;
    }
    RES.getVersionController = getVersionController;
    /**
     * Load configuration file and parse.
     * @param url Configuration file path (path resource.json).
     * @param resourceRoot Resource path. All URL in the configuration is the relative value of the path. The ultimate URL is the value of the sum of the URL of the string and the resource in the configuration.
     * @param type Configuration file format. Determine what parser to parse the configuration file. Default "json".
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 加载配置文件并解析。
     * @param url 配置文件路径(resource.json的路径)。
     * @param resourceRoot 资源根路径。配置中的所有url都是这个路径的相对值。最终url是这个字符串与配置里资源项的url相加的值。
     * @param type 配置文件的格式。确定要用什么解析器来解析配置文件。默认"json"
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    function loadConfig(url, resourceRoot, type) {
        if (resourceRoot === void 0) { resourceRoot = ""; }
        if (type === void 0) { type = "json"; }
        instance.loadConfig(url, resourceRoot, type);
    }
    RES.loadConfig = loadConfig;
    /**
     * Load a set of resources according to the group name.
     * @param name Group name to load the resource group.
     * @param priority Load priority can be negative, the default value is 0.
     * <br>A low priority group must wait for the high priority group to complete the end of the load to start, and the same priority group will be loaded at the same time.
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 根据组名加载一组资源。
     * @param name 要加载资源组的组名。
     * @param priority 加载优先级,可以为负数,默认值为 0。
     * <br>低优先级的组必须等待高优先级组完全加载结束才能开始，同一优先级的组会同时加载。
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    function loadGroup(name, priority) {
        if (priority === void 0) { priority = 0; }
        instance.loadGroup(name, priority);
    }
    RES.loadGroup = loadGroup;
    /**
     * Check whether a resource group has been loaded.
     * @param name Group name。
     * @returns Is loading or not.
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 检查某个资源组是否已经加载完成。
     * @param name 组名。
     * @returns 是否正在加载。
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    function isGroupLoaded(name) {
        return instance.isGroupLoaded(name);
    }
    RES.isGroupLoaded = isGroupLoaded;
    /**
     * A list of groups of loading is obtained according to the group name.
     * @param name Group name.
     * @returns The resource item array of group.
     * @see RES.ResourceItem
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 根据组名获取组加载项列表。
     * @param name 组名。
     * @returns 加载项列表。
     * @see RES.ResourceItem
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    function getGroupByName(name) {
        return instance.getGroupByName(name);
    }
    RES.getGroupByName = getGroupByName;
    /**
     * Create a custom load resource group, note that this method is valid only after the resource configuration file is loaded.
     * <br>You can monitor the ResourceEvent.CONFIG_COMPLETE event to verify that the configuration is complete.
     * @param name Group name to create the load resource group.
     * @param keys To be included in the list of key keys, the corresponding configuration file in the name or sbuKeys property one or a resource group name.
     * @param override Is the default false for the same name resource group already exists.
     * @returns Create success or fail.
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 创建自定义的加载资源组,注意：此方法仅在资源配置文件加载完成后执行才有效。
     * <br>可以监听 ResourceEvent.CONFIG_COMPLETE 事件来确认配置加载完成。
     * @param name 要创建的加载资源组的组名。
     * @param keys 要包含的键名列表，key 对应配置文件里的 name 属性或 sbuKeys 属性的一项或一个资源组名。
     * @param override 是否覆盖已经存在的同名资源组,默认 false。
     * @returns 是否创建成功。
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    function createGroup(name, keys, override) {
        if (override === void 0) { override = false; }
        return instance.createGroup(name, keys, override);
    }
    RES.createGroup = createGroup;
    /**
     * Check whether the configuration file contains the specified resources.
     * @param key A sbuKeys attribute or name property in a configuration file.
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 检查配置文件里是否含有指定的资源。
     * @param key 对应配置文件里的 name 属性或 sbuKeys 属性的一项。
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    function hasRes(key) {
        return instance.hasRes(key);
    }
    RES.hasRes = hasRes;
    /**
     * parse a configuration file at run time，it will not clean the exist data.
     * @param data Configuration file data, please refer to the resource.json configuration file format. JSON object can be introduced into the corresponding.
     * @param folder Path prefix for load.
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 运行时动态解析一个配置文件,此操作不会清空之前已存在的配置。
     * @param data 配置文件数据，请参考 resource.json 的配置文件格式。传入对应的 json 对象即可。
     * @param folder 加载项的路径前缀。
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    function parseConfig(data, folder) {
        if (folder === void 0) { folder = ""; }
        instance.parseConfig(data, folder);
    }
    RES.parseConfig = parseConfig;
    /**
     * The synchronization method for obtaining the cache has been loaded with the success of the resource.
     * <br>The type of resource and the corresponding return value types are as follows:
     * <br>RES.ResourceItem.TYPE_BIN : ArrayBuffer JavaScript primary object
     * <br>RES.ResourceItem.TYPE_IMAGE : img Html Object，or egret.BitmapData interface。
     * <br>RES.ResourceItem.TYPE_JSON : Object
     * <br>RES.ResourceItem.TYPE_SHEET : Object
     * <br>  1. If the incoming parameter is the name of the entire SpriteSheet is returned is {image1: Texture, "image2": Texture}.
     * <br>  2. If the incoming is "sheet.image1", the return is a single resource.
     * <br>  3. If the incoming is the name of the "image1" single resource, the return is a single resource.
     * But if there are two SpriteSheet in a single picture of the same name, the return of the image after the load.
     * <br>RES.ResourceItem.TYPE_SOUND : HtmlSound Html Object
     * <br>RES.ResourceItem.TYPE_TEXT : string
     * @param key A subKeys attribute or name property in a configuration file.
     * @see RES.ResourceItem
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 同步方式获取缓存的已经加载成功的资源。
     * <br>资源类型和对应的返回值类型关系如下：
     * <br>RES.ResourceItem.TYPE_BIN : ArrayBuffer JavaScript 原生对象
     * <br>RES.ResourceItem.TYPE_IMAGE : img Html 对象，或者 egret.BitmapData 接口。
     * <br>RES.ResourceItem.TYPE_JSON : Object
     * <br>RES.ResourceItem.TYPE_SHEET : Object
     * <br>  1. 如果传入的参数是整个 SpriteSheet 的名称返回的是 {"image1":Texture,"image2":Texture} 这样的格式。
     * <br>  2. 如果传入的是 "sheet.image1"，返回的是单个资源。
     * <br>  3. 如果传入的是 "image1" 单个资源的名称，返回的是单个资源。但是如果有两张 SpriteSheet 中有单个图片资源名称相同，返回的是后加载的那个图片资源。
     * <br>RES.ResourceItem.TYPE_SOUND : HtmlSound Html 对象
     * <br>RES.ResourceItem.TYPE_TEXT : string
     * @param key 对应配置文件里的 name 属性或 subKeys 属性的一项。
     * @see RES.ResourceItem
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    function getRes(key) {
        return instance.getRes(key);
    }
    RES.getRes = getRes;
    /**
     * Asynchronous mode to get the resources in the configuration. As long as the resources exist in the configuration file, you can get it in an asynchronous way.
     * @param key A sbuKeys attribute or name property in a configuration file.
     * @param compFunc Call back function. Example：compFunc(data,key):void.
     * @param thisObject This pointer of call back function.
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 异步方式获取配置里的资源。只要是配置文件里存在的资源，都可以通过异步方式获取。
     * @param key 对应配置文件里的 name 属性或 sbuKeys 属性的一项。
     * @param compFunc 回调函数。示例：compFunc(data,key):void。
     * @param thisObject 回调函数的 this 引用。
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    function getResAsync(key, compFunc, thisObject) {
        instance.getResAsync(key, compFunc, thisObject);
    }
    RES.getResAsync = getResAsync;
    /**
     * Access to external resources through the full URL.
     * @param url The external path to load the file.
     * @param compFunc Call back function. Example：compFunc(data,url):void。
     * @param thisObject This pointer of call back function.
     * @param type File type (optional). Use the static constants defined in the ResourceItem class. If you do not set the file name extension.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample extension/resource/GetResByUrl.ts
     * @language en_US
     */
    /**
     * 通过完整URL方式获取外部资源。
     * @param url 要加载文件的外部路径。
     * @param compFunc 回调函数。示例：compFunc(data,url):void。
     * @param thisObject 回调函数的 this 引用。
     * @param type 文件类型(可选)。请使用 ResourceItem 类中定义的静态常量。若不设置将根据文件扩展名生成。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample extension/resource/GetResByUrl.ts
     * @language zh_CN
     */
    function getResByUrl(url, compFunc, thisObject, type) {
        if (type === void 0) { type = ""; }
        instance.getResByUrl(url, compFunc, thisObject, type);
    }
    RES.getResByUrl = getResByUrl;
    /**
     * Destroy a single resource file or a set of resources to the cache data, to return whether to delete success.
     * @param name Name attribute or resource group name of the load item in the configuration file.
     * @param force Destruction of a resource group when the other resources groups have the same resource situation whether the resources will be deleted, the default value true.
     * @returns Are successful destruction.
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 销毁单个资源文件或一组资源的缓存数据,返回是否删除成功。
     * @param name 配置文件中加载项的name属性或资源组名。
     * @param force 销毁一个资源组时其他资源组有同样资源情况资源是否会被删除，默认值 true。
     * @see #setMaxRetryTimes
     * @returns 是否销毁成功。
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    function destroyRes(name, force) {
        return instance.destroyRes(name, force);
    }
    RES.destroyRes = destroyRes;
    /**
     * Sets the maximum number of concurrent load threads, the default value is 2.
     * @param thread The number of concurrent loads to be set.
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 设置最大并发加载线程数量，默认值是 2。
     * @param thread 要设置的并发加载数。
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    function setMaxLoadingThread(thread) {
        instance.setMaxLoadingThread(thread);
    }
    RES.setMaxLoadingThread = setMaxLoadingThread;
    /**
     * Sets the number of retry times when the resource failed to load, and the default value is 3.
     * @param retry To set the retry count.
     * @includeExample extension/resource/Resource.ts
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 设置资源加载失败时的重试次数，默认值是 3。
     * @param retry 要设置的重试次数。
     * @includeExample extension/resource/Resource.ts
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    function setMaxRetryTimes(retry) {
        instance.setMaxRetryTimes(retry);
    }
    RES.setMaxRetryTimes = setMaxRetryTimes;
    /**
     * Add event listeners, reference ResourceEvent defined constants.
     * @param type Event name。
     * @param listener Listener functions for handling events. This function must accept the Event object as its only parameter, and can't return any results,
     * As shown in the following example: function (evt:Event):void can have any name.
     * @param thisObject The this object that is bound to a function.
     * @param useCapture Determine the listener is running on the capture or running on the target and the bubbling phase. Set useCapture to true,
     * then the listener in the capture phase processing events, but not in the target or the bubbling phase processing events.
     * If useCapture is false, then the listener only in the target or the bubbling phase processing events.
     * To listen for events in all three stages, please call addEventListener two times: once the useCapture is set to true, once the useCapture is set to false.
     * @param priority Event listener priority. Priority is specified by a 32 - bit integer with a symbol. The higher the number, the higher the priority.
     * All listeners with a priority for n will be processed before the -1 n listener.
     * If two or more listeners share the same priority, they are processed in accordance with the order of their added. The default priority is 0.
     * @see RES.ResourceEvent
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 添加事件侦听器,参考 ResourceEvent 定义的常量。
     * @param type 事件的类型。
     * @param listener 处理事件的侦听器函数。此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，
     * 如下面的示例所示： function(evt:Event):void 函数可以有任何名称。
     * @param thisObject 侦听函数绑定的 this 对象。
     * @param useCapture 确定侦听器是运行于捕获阶段还是运行于目标和冒泡阶段。如果将 useCapture 设置为 true，
     * 则侦听器只在捕获阶段处理事件，而不在目标或冒泡阶段处理事件。如果 useCapture 为 false，则侦听器只在目标或冒泡阶段处理事件。
     * 要在所有三个阶段都侦听事件，请调用 addEventListener 两次：一次将 useCapture 设置为 true，一次将 useCapture 设置为 false。
     * @param priority 事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
     * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
     * @see RES.ResourceEvent
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    function addEventListener(type, listener, thisObject, useCapture, priority) {
        if (useCapture === void 0) { useCapture = false; }
        if (priority === void 0) { priority = 0; }
        instance.addEventListener(type, listener, thisObject, useCapture, priority);
    }
    RES.addEventListener = addEventListener;
    /**
     * Remove event listeners, reference ResourceEvent defined constants.
     * @param type Event name。
     * @param listener Listening function。
     * @param thisObject The this object that is bound to a function.
     * @param useCapture Is used to capture, and this property is only valid in the display list.
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 移除事件侦听器,参考ResourceEvent定义的常量。
     * @param type 事件名。
     * @param listener 侦听函数。
     * @param thisObject 侦听函数绑定的this对象。
     * @param useCapture 是否使用捕获，这个属性只在显示列表中生效。
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    function removeEventListener(type, listener, thisObject, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        instance.removeEventListener(type, listener, thisObject, useCapture);
    }
    RES.removeEventListener = removeEventListener;
    function $getVirtualUrl(url) {
        if (instance.vcs) {
            return instance.vcs.getVirtualUrl(url);
        }
        else {
            return url;
        }
    }
    RES.$getVirtualUrl = $getVirtualUrl;
    /**
     * @private
     */
    var Resource = (function (_super) {
        __extends(Resource, _super);
        /**
         * 构造函数
         * @method RES.constructor
         * @private
         */
        function Resource() {
            var _this = _super.call(this) || this;
            /**
             * 解析器字典
             */
            _this.analyzerDic = {};
            _this.analyzerClassMap = {};
            _this.configItemList = [];
            _this.callLaterFlag = false;
            /**
             * 配置文件加载解析完成标志
             */
            _this.configComplete = false;
            /**
             * 已经加载过组名列表
             */
            _this.loadedGroups = [];
            _this.groupNameList = [];
            /**
             * 异步获取资源参数缓存字典
             */
            _this.asyncDic = {};
            _this._loadedUrlTypes = {};
            _this.init();
            return _this;
        }
        /**
         * 根据type获取对应的文件解析库
         */
        Resource.prototype.$getAnalyzerByType = function (type) {
            var analyzer = this.analyzerDic[type];
            if (!analyzer) {
                var clazz = this.analyzerClassMap[type];
                if (!clazz) {
                    if (true) {
                        egret.$error(3203, type);
                    }
                    return null;
                }
                analyzer = this.analyzerDic[type] = new clazz();
            }
            return analyzer;
        };
        /**
         * 注册一个自定义文件类型解析器
         * @param type 文件类型字符串，例如：bin,text,image,json等。
         * @param analyzerClass 自定义解析器的类定义
         */
        Resource.prototype.registerAnalyzer = function (type, analyzerClass) {
            this.analyzerClassMap[type] = analyzerClass;
        };
        Resource.prototype.$registerVersionController = function (vcs) {
            this.vcs = vcs;
        };
        /**
         * 初始化
         */
        Resource.prototype.init = function () {
            this.vcs = new RES.VersionController();
            var analyzerClassMap = this.analyzerClassMap;
            analyzerClassMap[RES.ResourceItem.TYPE_BIN] = RES.BinAnalyzer;
            analyzerClassMap[RES.ResourceItem.TYPE_IMAGE] = RES.ImageAnalyzer;
            analyzerClassMap[RES.ResourceItem.TYPE_TEXT] = RES.TextAnalyzer;
            analyzerClassMap[RES.ResourceItem.TYPE_JSON] = RES.JsonAnalyzer;
            analyzerClassMap[RES.ResourceItem.TYPE_SHEET] = RES.SheetAnalyzer;
            analyzerClassMap[RES.ResourceItem.TYPE_FONT] = RES.FontAnalyzer;
            analyzerClassMap[RES.ResourceItem.TYPE_SOUND] = RES.SoundAnalyzer;
            analyzerClassMap[RES.ResourceItem.TYPE_XML] = RES.XMLAnalyzer;
            this.resConfig = new RES.ResourceConfig();
            this.resLoader = new RES.ResourceLoader();
            this.resLoader.callBack = this.onResourceItemComp;
            this.resLoader.resInstance = this;
            this.resLoader.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this);
            this.resLoader.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupError, this);
        };
        /**
         * 开始加载配置
         * @method RES.loadConfig
         * @param url {string}
         * @param resourceRoot {string}
         * @param type {string}
         */
        Resource.prototype.loadConfig = function (url, resourceRoot, type) {
            if (type === void 0) { type = "json"; }
            var configItem = { url: url, resourceRoot: resourceRoot, type: type };
            this.configItemList.push(configItem);
            if (!this.callLaterFlag) {
                egret.callLater(this.startLoadConfig, this);
                this.callLaterFlag = true;
            }
        };
        Resource.prototype.startLoadConfig = function () {
            var _this = this;
            this.callLaterFlag = false;
            var configList = this.configItemList;
            this.configItemList = [];
            this.loadingConfigList = configList;
            var length = configList.length;
            var itemList = [];
            for (var i = 0; i < length; i++) {
                var item = configList[i];
                var resItem = new RES.ResourceItem(item.url, item.url, item.type);
                itemList.push(resItem);
            }
            var callback = {
                onSuccess: function (data) {
                    _this.resLoader.loadGroup(itemList, Resource.GROUP_CONFIG, Number.MAX_VALUE);
                },
                onFail: function (err, data) {
                    RES.ResourceEvent.dispatchResourceEvent(_this, RES.ResourceEvent.CONFIG_LOAD_ERROR);
                }
            };
            if (this.vcs) {
                this.vcs.fetchVersion(callback);
            }
            else {
                this.resLoader.loadGroup(itemList, Resource.GROUP_CONFIG, Number.MAX_VALUE);
            }
        };
        /**
         * 检查某个资源组是否已经加载完成
         * @method RES.isGroupLoaded
         * @param name {string}
         * @returns {boolean}
         */
        Resource.prototype.isGroupLoaded = function (name) {
            return this.loadedGroups.indexOf(name) != -1;
        };
        /**
         * 根据组名获取组加载项列表
         * @method RES.getGroupByName
         * @param name {string}
         * @returns {Array<egret.ResourceItem>}
         */
        Resource.prototype.getGroupByName = function (name) {
            return this.resConfig.getGroupByName(name);
        };
        /**
         * 根据组名加载一组资源
         * @method RES.loadGroup
         * @param name {string}
         * @param priority {number}
         */
        Resource.prototype.loadGroup = function (name, priority) {
            if (priority === void 0) { priority = 0; }
            if (this.loadedGroups.indexOf(name) != -1) {
                RES.ResourceEvent.dispatchResourceEvent(this, RES.ResourceEvent.GROUP_COMPLETE, name);
                return;
            }
            if (this.resLoader.isGroupInLoading(name))
                return;
            if (this.configComplete) {
                var group = this.resConfig.getGroupByName(name);
                this.resLoader.loadGroup(group, name, priority);
            }
            else {
                this.groupNameList.push({ name: name, priority: priority });
            }
        };
        /**
         * 创建自定义的加载资源组,注意：此方法仅在资源配置文件加载完成后执行才有效。
         * 可以监听ResourceEvent.CONFIG_COMPLETE事件来确认配置加载完成。
         * @method RES.ResourceConfig#createGroup
         * @param name {string} 要创建的加载资源组的组名
         * @param keys {egret.string[]} 要包含的键名列表，key对应配置文件里的name属性或一个资源组名。
         * @param override {boolean} 是否覆盖已经存在的同名资源组,默认false。
         * @returns {boolean}
         */
        Resource.prototype.createGroup = function (name, keys, override) {
            if (override === void 0) { override = false; }
            if (override) {
                var index = this.loadedGroups.indexOf(name);
                if (index != -1) {
                    this.loadedGroups.splice(index, 1);
                }
            }
            return this.resConfig.createGroup(name, keys, override);
        };
        /**
         * 队列加载完成事件
         */
        Resource.prototype.onGroupComp = function (event) {
            if (event.groupName == Resource.GROUP_CONFIG) {
                var length_1 = this.loadingConfigList.length;
                for (var i = 0; i < length_1; i++) {
                    var config = this.loadingConfigList[i];
                    var resolver = this.$getAnalyzerByType(config.type);
                    var data = resolver.getRes(config.url);
                    resolver.destroyRes(config.url);
                    this.resConfig.parseConfig(data, config.resourceRoot);
                }
                this.configComplete = true;
                this.loadingConfigList = null;
                RES.ResourceEvent.dispatchResourceEvent(this, RES.ResourceEvent.CONFIG_COMPLETE);
                this.loadDelayGroups();
            }
            else {
                this.loadedGroups.push(event.groupName);
                this.dispatchEvent(event);
            }
        };
        /**
         * 启动延迟的组加载
         */
        Resource.prototype.loadDelayGroups = function () {
            var groupNameList = this.groupNameList;
            this.groupNameList = [];
            var length = groupNameList.length;
            for (var i = 0; i < length; i++) {
                var item = groupNameList[i];
                this.loadGroup(item.name, item.priority);
            }
        };
        /**
         * 队列加载失败事件
         */
        Resource.prototype.onGroupError = function (event) {
            if (event.groupName == Resource.GROUP_CONFIG) {
                this.loadingConfigList = null;
                RES.ResourceEvent.dispatchResourceEvent(this, RES.ResourceEvent.CONFIG_LOAD_ERROR);
            }
            else {
                this.dispatchEvent(event);
            }
        };
        /**
         * 检查配置文件里是否含有指定的资源
         * @method RES.hasRes
         * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
         * @returns {boolean}
         */
        Resource.prototype.hasRes = function (key) {
            var type = this.resConfig.getType(key);
            if (type == "") {
                var prefix = RES.AnalyzerBase.getStringTail(key);
                type = this.resConfig.getType(prefix);
                if (type == "") {
                    return false;
                }
            }
            return true;
        };
        /**
         * 运行时动态解析一个配置文件,
         * @param data {any} 配置文件数据，请参考resource.json的配置文件格式。传入对应的json对象即可。
         * @param folder {string} 加载项的路径前缀。
         */
        Resource.prototype.parseConfig = function (data, folder) {
            this.resConfig.parseConfig(data, folder);
            if (!this.configComplete && !this.loadingConfigList) {
                this.configComplete = true;
                this.loadDelayGroups();
            }
        };
        /**
         * 通过key同步获取资源
         * @method RES.getRes
         * @param key {string}
         * @returns {any}
         */
        Resource.prototype.getRes = function (key) {
            var type = this.resConfig.getType(key);
            if (type == "") {
                var prefix = RES.AnalyzerBase.getStringPrefix(key);
                type = this.resConfig.getType(prefix);
                if (type == "") {
                    return null;
                }
            }
            var analyzer = this.$getAnalyzerByType(type);
            return analyzer.getRes(key);
        };
        /**
         * 通过key异步获取资源
         * @method RES.getResAsync
         * @param key {string}
         * @param compFunc {Function} 回调函数。示例：compFunc(data,url):void。
         * @param thisObject {any}
         */
        Resource.prototype.getResAsync = function (key, compFunc, thisObject) {
            var type = this.resConfig.getType(key);
            var name = this.resConfig.getName(key);
            if (type == "") {
                name = RES.AnalyzerBase.getStringPrefix(key);
                type = this.resConfig.getType(name);
                if (type == "") {
                    egret.$callAsync(compFunc, thisObject);
                    return;
                }
            }
            var analyzer = this.$getAnalyzerByType(type);
            var res = analyzer.getRes(key);
            if (res) {
                egret.$callAsync(compFunc, thisObject, res, key);
                return;
            }
            var args = { key: key, compFunc: compFunc, thisObject: thisObject };
            if (this.asyncDic[name]) {
                this.asyncDic[name].push(args);
            }
            else {
                this.asyncDic[name] = [args];
                var resItem = this.resConfig.getResourceItem(name);
                this.resLoader.loadItem(resItem);
            }
        };
        /**
         * 通过url获取资源
         * @method RES.getResByUrl
         * @param url {string}
         * @param compFunc {Function}
         * @param thisObject {any}
         * @param type {string}
         */
        Resource.prototype.getResByUrl = function (url, compFunc, thisObject, type) {
            if (type === void 0) { type = ""; }
            if (!url) {
                egret.$callAsync(compFunc, thisObject);
                return;
            }
            if (!type)
                type = this.getTypeByUrl(url);
            if (this._loadedUrlTypes[url] != null && this._loadedUrlTypes[url] != type) {
                egret.$warn(3202);
            }
            this._loadedUrlTypes[url] = type;
            var analyzer = this.$getAnalyzerByType(type);
            var name = url;
            var res = analyzer.getRes(name);
            if (res) {
                egret.$callAsync(compFunc, thisObject, res, url);
                return;
            }
            var args = { key: name, compFunc: compFunc, thisObject: thisObject };
            if (this.asyncDic[name]) {
                this.asyncDic[name].push(args);
            }
            else {
                this.asyncDic[name] = [args];
                var resItem = new RES.ResourceItem(name, url, type);
                this.resLoader.loadItem(resItem);
            }
        };
        /**
         * 通过url获取文件类型
         */
        Resource.prototype.getTypeByUrl = function (url) {
            var suffix = url.substr(url.lastIndexOf(".") + 1);
            if (suffix) {
                suffix = suffix.toLowerCase();
            }
            var type;
            switch (suffix) {
                case RES.ResourceItem.TYPE_XML:
                case RES.ResourceItem.TYPE_JSON:
                case RES.ResourceItem.TYPE_SHEET:
                    type = suffix;
                    break;
                case "png":
                case "jpg":
                case "gif":
                case "jpeg":
                case "bmp":
                    type = RES.ResourceItem.TYPE_IMAGE;
                    break;
                case "fnt":
                    type = RES.ResourceItem.TYPE_FONT;
                    break;
                case "txt":
                    type = RES.ResourceItem.TYPE_TEXT;
                    break;
                case "mp3":
                case "ogg":
                case "mpeg":
                case "wav":
                case "m4a":
                case "mp4":
                case "aiff":
                case "wma":
                case "mid":
                    type = RES.ResourceItem.TYPE_SOUND;
                    break;
                default:
                    type = RES.ResourceItem.TYPE_BIN;
                    break;
            }
            return type;
        };
        /**
         * 一个加载项加载完成
         */
        Resource.prototype.onResourceItemComp = function (item) {
            var argsList = this.asyncDic[item.name];
            delete this.asyncDic[item.name];
            var analyzer = this.$getAnalyzerByType(item.type);
            var length = argsList.length;
            for (var i = 0; i < length; i++) {
                var args = argsList[i];
                var res = analyzer.getRes(args.key);
                args.compFunc.call(args.thisObject, res, args.key);
            }
        };
        /**
         * 销毁单个资源文件或一组资源的缓存数据,返回是否删除成功。
         * @method RES.destroyRes
         * @param name {string} 配置文件中加载项的name属性或资源组名
         * @param force {boolean} 销毁一个资源组时其他资源组有同样资源情况资源是否会被删除，默认值true
         * @returns {boolean}
         */
        Resource.prototype.destroyRes = function (name, force) {
            if (force === void 0) { force = true; }
            var group = this.resConfig.getRawGroupByName(name);
            if (group && group.length > 0) {
                var index = this.loadedGroups.indexOf(name);
                if (index != -1) {
                    this.loadedGroups.splice(index, 1);
                }
                var length_2 = group.length;
                for (var i = 0; i < length_2; i++) {
                    var item = group[i];
                    if (!force && this.isResInLoadedGroup(item.name)) {
                    }
                    else {
                        item.loaded = false;
                        var analyzer = this.$getAnalyzerByType(item.type);
                        analyzer.destroyRes(item.name);
                        this.removeLoadedGroupsByItemName(item.name);
                    }
                }
                return true;
            }
            else {
                var type = this.resConfig.getType(name);
                if (type == "") {
                    type = this._loadedUrlTypes[name];
                    if (type == null || type == "") {
                        return false;
                    }
                    delete this._loadedUrlTypes[name];
                    var analyzer_1 = this.$getAnalyzerByType(type);
                    analyzer_1.destroyRes(name);
                    return true;
                }
                var item = this.resConfig.getRawResourceItem(name);
                item.loaded = false;
                var analyzer = this.$getAnalyzerByType(type);
                var result = analyzer.destroyRes(name);
                this.removeLoadedGroupsByItemName(item.name);
                return result;
            }
        };
        Resource.prototype.removeLoadedGroupsByItemName = function (name) {
            var loadedGroups = this.loadedGroups;
            var loadedGroupLength = loadedGroups.length;
            for (var i = 0; i < loadedGroupLength; i++) {
                var group = this.resConfig.getRawGroupByName(loadedGroups[i]);
                var length_3 = group.length;
                for (var j = 0; j < length_3; j++) {
                    var item = group[j];
                    if (item.name == name) {
                        loadedGroups.splice(i, 1);
                        i--;
                        loadedGroupLength = loadedGroups.length;
                        break;
                    }
                }
            }
        };
        Resource.prototype.isResInLoadedGroup = function (name) {
            var loadedGroups = this.loadedGroups;
            var loadedGroupLength = loadedGroups.length;
            for (var i = 0; i < loadedGroupLength; i++) {
                var group = this.resConfig.getRawGroupByName(loadedGroups[i]);
                var length_4 = group.length;
                for (var j = 0; j < length_4; j++) {
                    var item = group[j];
                    if (item.name == name) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         * 设置最大并发加载线程数量，默认值是2.
         * @method RES.setMaxLoadingThread
         * @param thread {number} 要设置的并发加载数。
         */
        Resource.prototype.setMaxLoadingThread = function (thread) {
            if (thread < 1) {
                thread = 1;
            }
            this.resLoader.thread = thread;
        };
        /**
         * 设置资源加载失败时的重试次数。
         * @param retry 要设置的重试次数。
         */
        Resource.prototype.setMaxRetryTimes = function (retry) {
            retry = Math.max(retry, 0);
            this.resLoader.maxRetryTimes = retry;
        };
        /**
         * 配置文件组组名
         */
        Resource.GROUP_CONFIG = "RES__CONFIG";
        return Resource;
    }(egret.EventDispatcher));
    __reflect(Resource.prototype, "Resource");
    /**
     * Resource单例
     */
    var instance = new Resource();
})(RES || (RES = {}));
//# sourceMappingURL=Resource.js.map