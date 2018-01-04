/**基础命令类 */
class BasicCommand extends puremvc.SimpleCommand
{
    protected num1:number;
    protected num2:number;
    protected value:number;
    public execute(notification: puremvc.INotification): void
    {
        this.num1=notification.getBody().num1;
        this.num2=notification.getBody().num2;
        this.calculate();
        this.facade().sendNotification(MVCConst.CMD_SOUND);
    }
    /**计算 */
    protected calculate():void
    {

    }
    /**发布 */
    protected release():void
    {
        this.facade().sendNotification(MVCConst.RESULT_RELEASE,this.value);
    }
}
/**运算－加*/
class PlusCommand extends BasicCommand
{
    protected calculate():void
    {
        this.value=this.num1+this.num2;
        this.release();
    }
}
/**运算－减*/
class SubtractCommand extends BasicCommand
{
    protected calculate():void
    {
        this.value=this.num1-this.num2;
        this.release();
    }
}
/**运算－乘*/
class MultiplyCommand extends BasicCommand
{
    protected calculate():void
    {
        this.value=this.num1*this.num2;
        this.release();
    }
}
/**运算－除*/
class DivideCommand extends BasicCommand
{
    protected calculate():void
    {
        this.value=this.num1/this.num2;
        this.release();
    }
}
//------------------
/**开始命令 */
class StartCommand extends puremvc.MacroCommand
{
    public initializeMacroCommand(): void {
        this.addSubCommand(InitCommand);
    }
}
/**初始化命令 */
class InitCommand extends puremvc.SimpleCommand
{
    public execute(notification: puremvc.INotification): void
    {
        this.facade().registerCommand(MVCConst.CMD_TRANSPOND,TranspondCommand);
        this.facade().registerCommand(MVCConst.CMD_SOUND,SoundCommand);

        this.facade().registerCommand(MVCConst.CMD_CALCULATE_PLUS,PlusCommand);
        this.facade().registerCommand(MVCConst.CMD_CALCULATE_SUBTRACT,SubtractCommand);
        this.facade().registerCommand(MVCConst.CMD_CALCULATE_MULTIPLY,MultiplyCommand);
        this.facade().registerCommand(MVCConst.CMD_CALCULATE_DIVIDE,DivideCommand);
    }
}
/**数据转发，用来转发数字与计算符号 */
class TranspondCommand extends puremvc.SimpleCommand
{
    public execute(notification: puremvc.INotification): void
    {
        var data:any=notification.getBody();
        this.facade().sendNotification(MVCConst.DATA_TRANSPOND,data);
        this.facade().sendNotification(MVCConst.CMD_SOUND);
    }
}
/**播放声音命令 */
class SoundCommand extends puremvc.SimpleCommand
{
    public execute(notification: puremvc.INotification): void
    {
       SoundControl.getIns().play("keyDown_mp3");
    }
}