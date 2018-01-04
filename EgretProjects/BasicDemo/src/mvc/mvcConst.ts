/** */
class MVCConst{
    public static readonly DATA_TRANSPOND:string="data transpond";//数据转发
    public static readonly RESULT_RELEASE:string="send result";//结果发布
    public static readonly CMD_TRANSPOND:string="cmd transpond";//转发命令
    public static readonly CMD_START:string="cmd start";//开始命令
    public static readonly CMD_SOUND:string="cmd sound";//声音命令
    public static readonly CMD_CALCULATE_PLUS:string="cmd calculate plus";//加
    public static readonly CMD_CALCULATE_SUBTRACT:string="cmd calculate subtract";//减
    public static readonly CMD_CALCULATE_MULTIPLY:string="cmd calculate multiply";//乘
    public static readonly CMD_CALCULATE_DIVIDE:string="cmd calculate divide";//除
    public static readonly HAS_SIGN:string="has sign";//有符号
    public static readonly SIGNS:string[]=["+","-","x","/","=","c"]//特殊符号
    public static readonly CMDS:string[]=[MVCConst.CMD_CALCULATE_PLUS,MVCConst.CMD_CALCULATE_SUBTRACT,MVCConst.CMD_CALCULATE_MULTIPLY,MVCConst.CMD_CALCULATE_DIVIDE]
}