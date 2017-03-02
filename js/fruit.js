var fruitObj=function()
{
	this.alive=[];//bool
	this.x=[];
	this.y=[];
	this.l=[];
	this.spd=[];
	this.fruitType=[];
	this.orange=new Image();
	this.blue=new Image();
}

fruitObj.prototype.num=30;
fruitObj.prototype.init=function()
{
	for(var i=0;i<this.num;i++)
	{
		this.alive[i]=false;
		this.x[i]=0;
		this.y[i]=0;
		this.spd[i]=Math.random()*0.017+0.003;
		// this.born(i);
		this.fruitType[i]="";
	}
	this.orange.src="./src/fruit.png";
	this.blue.src="./src/blue.png";
}
// 果实最大值，果实从出生到成熟
fruitObj.prototype.draw=function()
{
	for(var i=0;i<this.num;i++)
	{
		//draw
		//find an ane ,grow,fly up
		if(this.fruitType[i]=="blue")
		{
			var pic=this.blue;
		}
		else
		{
			var pic=this.orange;
		}
		if(this.alive[i])
		{
			if(this.l[i]<=14)
			{
				this.l[i]+=this.spd[i]*deltaTime;
			}
			else
			{
				this.y[i]-=this.spd[i]*7*deltaTime;
			}
			ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
			if(this.y[i]<10)
			{
				this.alive[i]=false;
			}
		}
	}
}
fruitObj.prototype.born=function(i)
{
	//random select an ane,we need mark the position of  ane.   we found a suitable place to settle down.
	var aneId=Math.floor(Math.random()*ane.num);
	this.x[i]=ane.x[aneId];
	this.y[i]=canHeight-ane.len[aneId];
	this.l[i]=0;
	this.alive[i]=true;
	var ran=Math.random();
	if(ran<0.3)
	{
		this.fruitType[i]="blue";
	}
	else
	{
		this.fruitType[i]="orange";
	}
}
//游戏规则，1.保持果实只有15个
//2.果实有两种,蓝色果实可以让大鱼吃的黄色果实加倍
function fruitMonitor()
{
	var num=0;
	for(var i=0;i<fruit.num;i++)
	{
		if(fruit.alive[i])num++;
	}
	if(num<15)
	{
		//强行生出一个果实
		sendFruit();
		return;
	}
}
function sendFruit()
{
	for(var i=0;i<fruit.num;i++)
	{
		if(!fruit.alive[i])
		{
			fruit.born(i);
			return;//即是说生出一个后马上return，只生出一个，其他的都不要了
		}
	}
}