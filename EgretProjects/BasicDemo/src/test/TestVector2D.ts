class TestVector2D extends moon.BasicView{
    /**加载到舞台之后调用 */
	private rect:Sprite;
	private v2d:utils.Vector2D;
    protected render():void
    {
		super.render();
		this.rect=moon.MoonUI.getRect(100,100);
		this.addChild(this.rect);

		this.v2d=new utils.Vector2D(1,5);
		this.v2d.length=3;
		
		egret.startTick(this.onLoop,this)
    }
	
	protected onLoop(num:number):boolean
	{
		this.rect.x+=this.v2d.x;
		this.rect.y+=this.v2d.y;
		return true;
	}
}
