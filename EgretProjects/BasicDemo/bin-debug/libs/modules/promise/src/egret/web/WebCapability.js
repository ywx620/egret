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
var egret;
(function (egret) {
    var web;
    (function (web) {
        /**
         * @private
         */
        var WebCapability = (function () {
            function WebCapability() {
            }
            /**
             * @private
             * 检测系统属性
             */
            WebCapability.detect = function () {
                var capabilities = egret.Capabilities;
                var ua = navigator.userAgent.toLowerCase();
                capabilities.$isMobile = (ua.indexOf('mobile') != -1 || ua.indexOf('android') != -1);
                if (capabilities.$isMobile) {
                    if (ua.indexOf("windows") < 0 && (ua.indexOf("iphone") != -1 || ua.indexOf("ipad") != -1 || ua.indexOf("ipod") != -1)) {
                        capabilities.$os = "iOS";
                    }
                    else if (ua.indexOf("android") != -1 && ua.indexOf("linux") != -1) {
                        capabilities.$os = "Android";
                    }
                    else if (ua.indexOf("windows") != -1) {
                        capabilities.$os = "Windows Phone";
                    }
                }
                else {
                    if (ua.indexOf("windows nt") != -1) {
                        capabilities.$os = "Windows PC";
                    }
                    else if (ua.indexOf("mac os") != -1) {
                        capabilities.$os = "Mac OS";
                    }
                }
                var language = (navigator.language || navigator["browserLanguage"]).toLowerCase();
                var strings = language.split("-");
                if (strings.length > 1) {
                    strings[1] = strings[1].toUpperCase();
                }
                capabilities.$language = strings.join("-");
                WebCapability.injectUIntFixOnIE9();
            };
            WebCapability.injectUIntFixOnIE9 = function () {
                if (/msie 9.0/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
                    var IEBinaryToArray_ByteStr_Script = "<!-- IEBinaryToArray_ByteStr -->\r\n" +
                        "<script type='text/vbscript' language='VBScript'>\r\n" +
                        "Function IEBinaryToArray_ByteStr(Binary)\r\n" +
                        "   IEBinaryToArray_ByteStr = CStr(Binary)\r\n" +
                        "End Function\r\n" +
                        "Function IEBinaryToArray_ByteStr_Last(Binary)\r\n" +
                        "   Dim lastIndex\r\n" +
                        "   lastIndex = LenB(Binary)\r\n" +
                        "   if lastIndex mod 2 Then\r\n" +
                        "       IEBinaryToArray_ByteStr_Last = Chr( AscB( MidB( Binary, lastIndex, 1 ) ) )\r\n" +
                        "   Else\r\n" +
                        "       IEBinaryToArray_ByteStr_Last = " + '""' + "\r\n" +
                        "   End If\r\n" +
                        "End Function\r\n" + "<\/script>\r\n" +
                        "<!-- convertResponseBodyToText -->\r\n" +
                        "<script>\r\n" +
                        "let convertResponseBodyToText = function (binary) {\r\n" +
                        "   let byteMapping = {};\r\n" +
                        "   for ( let i = 0; i < 256; i++ ) {\r\n" +
                        "       for ( let j = 0; j < 256; j++ ) {\r\n" +
                        "           byteMapping[ String.fromCharCode( i + j * 256 ) ] =\r\n" +
                        "           String.fromCharCode(i) + String.fromCharCode(j);\r\n" +
                        "       }\r\n" +
                        "   }\r\n" +
                        "   let rawBytes = IEBinaryToArray_ByteStr(binary);\r\n" +
                        "   let lastChr = IEBinaryToArray_ByteStr_Last(binary);\r\n" +
                        "   return rawBytes.replace(/[\\s\\S]/g," +
                        "                           function( match ) { return byteMapping[match]; }) + lastChr;\r\n" +
                        "};\r\n" +
                        "<\/script>\r\n";
                    document.write(IEBinaryToArray_ByteStr_Script);
                }
            };
            return WebCapability;
        }());
        web.WebCapability = WebCapability;
        __reflect(WebCapability.prototype, "egret.web.WebCapability");
        WebCapability.detect();
    })(web = egret.web || (egret.web = {}));
})(egret || (egret = {}));
//# sourceMappingURL=WebCapability.js.map