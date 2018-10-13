var egret;
(function (egret) {
    var experimental;
    (function (experimental) {
        /**
        * @language en_US
        * The pickPhoto method provides ability for picking a photo.
        * @version Egret 4.0
        * @platform Web
        */
        /**
         * @language zh_CN
         * pickPhoto API提供用于选取照片的方法。
         * @version Egret 4.0
         * @platform Web
         */
        function pickPhoto() {
            return new Promise(function (resolve, reject) {
                var fileInput = document.createElement("input");
                fileInput.type = "file";
                fileInput.accept = "image/*";
                fileInput.style.display = "none";
                document.body.insertBefore(fileInput, document.body.firstChild);
                fileInput.addEventListener("change", function (evt) {
                    var mime = { "png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg", "bmp": "image/bmp" };
                    var file = evt.target.files[0];
                    var type = file.type;
                    if (!type) {
                        type = mime[file.name.match(/\.([^\.]+)$/i)[1]];
                    }
                    var ret = "";
                    if (window.URL) {
                        ret = window["URL"]["createObjectURL"](file);
                    }
                    else {
                        ret = window["webkitURL"]["createObjectURL"](file);
                    }
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", ret, true);
                    xhr.responseType = "blob";
                    xhr.onload = function (e) {
                        if (this["status"] == 200) {
                            var myBlob = this["response"];
                            var arrayBuffer_1 = null;
                            var fileReader = new FileReader();
                            fileReader.onload = function () {
                                arrayBuffer_1 = this.result;
                                var exif = experimental.EXIF.readFromBinaryFile(arrayBuffer_1);
                                var orientation = -1;
                                if (exif) {
                                    orientation = exif["Orientation"];
                                }
                                var image = new Image();
                                image.onload = function () {
                                    var canvas = document.createElement("canvas");
                                    var ctx = canvas.getContext("2d");
                                    canvas.width = image.width;
                                    canvas.height = image.height;
                                    if (orientation > 4) {
                                        canvas.width = image.height;
                                        canvas.height = image.width;
                                    }
                                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                                    switch (orientation) {
                                        case 2:
                                            // horizontal flip
                                            ctx.translate(canvas.width, 0);
                                            ctx.scale(-1, 1);
                                            break;
                                        case 3:
                                            // 180° rotate left
                                            ctx.translate(canvas.width, canvas.height);
                                            ctx.rotate(Math.PI);
                                            break;
                                        case 4:
                                            ctx.translate(0, canvas.height);
                                            ctx.scale(1, -1);
                                            break;
                                        case 5:
                                            ctx.rotate(0.5 * Math.PI);
                                            ctx.scale(1, -1);
                                            break;
                                        case 6:
                                            ctx.rotate(0.5 * Math.PI);
                                            ctx.translate(0, -image.height);
                                            break;
                                        case 7:
                                            ctx.rotate(0.5 * Math.PI);
                                            ctx.translate(canvas.width, -canvas.height);
                                            ctx.scale(-1, 1);
                                            break;
                                        case 8:
                                            ctx.rotate(-0.5 * Math.PI);
                                            ctx.translate(-canvas.height, 0);
                                            break;
                                        default: ctx.transform(1, 0, 0, 1, 0, 0);
                                    }
                                    ctx.drawImage(image, 0, 0);
                                    var imagetype = "png";
                                    if (orientation !== -1) {
                                        imagetype = "jpeg";
                                    }
                                    var resultURL = "";
                                    if (imagetype === "jpg" || imagetype === "jpeg") {
                                        resultURL = canvas.toDataURL("image/" + imagetype);
                                    }
                                    else {
                                        resultURL = canvas.toDataURL("image/" + imagetype);
                                    }
                                    resolve(resultURL);
                                    image.parentNode.removeChild(image);
                                    fileInput.parentNode.removeChild(fileInput);
                                };
                                image.src = ret;
                                image.style.display = "none";
                                document.body.appendChild(image);
                                fileInput.value = "";
                            };
                            fileReader.readAsArrayBuffer(myBlob);
                        }
                    };
                    xhr.send();
                }, false);
                fileInput.click();
            });
        }
        experimental.pickPhoto = pickPhoto;
    })(experimental = egret.experimental || (egret.experimental = {}));
})(egret || (egret = {}));
//# sourceMappingURL=PhotoPicker.js.map