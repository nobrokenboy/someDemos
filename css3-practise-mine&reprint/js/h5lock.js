/*
HTML5 9 Grid Scream Lock
Author:EchoSoar
漏 2015 IWenKu.net CTime:2015/10/10
*/
function h5lock(canvasId,fun){
	var isMouseDown=false;
	var OverId=0;
	var mouseX=0;
	var mouseY=0;
	var obj=this;
	var selectId=new Array();
	var res='';
	var lastX=0,lastY=0;
	this.canvasId=canvasId;
	this.color="#ccc";
	this.init=function(){
		this.canvas=document.getElementById(this.canvasId);
		if(!this.canvas.getContext('2d')){
			this.canvas.innerHTML="Don't support canvas!";
			return;
		}
		this.context=this.canvas.getContext('2d');
		
		this.context.clearRect(0,0,this.canvasWidth,this.canvasHeight);
		
		this.canvasWidth=this.canvas.offsetWidth;
		this.canvasHeight=this.canvas.offsetHeight;
		this.canvasSize=this.canvas.offsetWidth>this.canvas.offsetHeight?this.canvas.offsetHeight:this.canvas.offsetWidth;
		this.everyLockSize=Math.floor(this.canvasSize/7);
		this.marginLeft=(this.canvasWidth-5*this.everyLockSize)/2;
		this.marginTop=(this.canvasHeight-5*this.everyLockSize)/2;
		this.context.fillStyle=this.color;
		for(var i=0;i<9;i++){
			col=i%3;
			row=Math.floor(i/3);
			this.context.beginPath();
			this.context.arc(this.marginLeft+(col*2+0.5)*this.everyLockSize,this.marginTop+(row*2+0.5)*this.everyLockSize,(this.everyLockSize/2),0,Math.PI*2,true);
			this.context.closePath();
			this.context.fill();
		}
	}
	this.init();
	this.setColor=function(color){
		this.color=color;
		return this;
	}

	var isSelectId=function(id){
		if(selectId[id]){
			return true;
		}else{
			return false;
		}
	}

	this.canvas.onmousemove=this.canvas.ontouchmove=function(e){
		e.preventDefault();
		mouseX=e.offsetX||e.targetTouches[0].clientX-obj.canvas.offsetLeft;
		mouseY=e.offsetY||e.targetTouches[0].clientY-obj.canvas.offsetTop;
		for(var i=0;i<9;i++){
			col=i%3;
			row=Math.floor(i/3);
			temX=obj.marginLeft+(col*2+0.5)*obj.everyLockSize;
			temY=obj.marginTop+(row*2+0.5)*obj.everyLockSize;
			
			if(Math.pow(mouseX-temX,2)+Math.pow(mouseY-temY,2)<=Math.pow(obj.everyLockSize/2,2)){

				OverId=i+1;
				if(isMouseDown&&!isSelectId(OverId)){
					col=i%3;
					row=Math.floor(i/3);
					
					if(lastX!=0&&lastY!=0){
						obj.context.lineWidth = 6;
						obj.context.strokeStyle = 'rgba(196,196,48,.7)';
						obj.context.beginPath();
						obj.context.moveTo(lastX,lastY);
						obj.context.lineTo(obj.marginLeft+(col*2+0.5)*obj.everyLockSize,obj.marginTop+(row*2+0.5)*obj.everyLockSize);
						obj.context.stroke();

						obj.context.lineWidth = 0;
						obj.context.beginPath();
						obj.context.arc(lastX,lastY,(obj.everyLockSize/4),0,Math.PI*2,true);
						obj.context.closePath();
						obj.context.fillStyle="#333";
						obj.context.fill();

					}
					
					obj.context.lineWidth = 0;
					obj.context.beginPath();
					obj.context.arc(obj.marginLeft+(col*2+0.5)*obj.everyLockSize,obj.marginTop+(row*2+0.5)*obj.everyLockSize,(obj.everyLockSize/4),0,Math.PI*2,true);
					obj.context.closePath();
					obj.context.fillStyle="#333";
					obj.context.fill();
					
					lastX=obj.marginLeft+(col*2+0.5)*obj.everyLockSize;
					lastY=obj.marginTop+(row*2+0.5)*obj.everyLockSize;
					selectId[OverId]=true;
					res+=OverId+'';
					console.log(res);
				}

			}
			
		}
		
	}
	this.canvas.onmousedown=this.canvas.ontouchstart=function(){
		if(!isMouseDown){
			isMouseDown=true;
		}
	}
	this.canvas.onmouseup=this.canvas.ontouchend=function(){
		if(isMouseDown){
			var re=fun(res);
			if(re!=true){
				obj.init();
				res='';
				isMouseDown=false;
				selectId=new Array();
				lastX=0;
				lastY=0;
			}
		}
	}		
}