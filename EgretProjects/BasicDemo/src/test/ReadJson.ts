class ReadJson {
    constructor() {
        this.init();
    }
    private init():void
    {
        var data:Object=RES.getRes("RoleIcon_json");
        for (var i in data){
            var d:Object=data[i];
            for(var j in d){
                trace(j+"="+d[j]);
            }
        }
    }
}