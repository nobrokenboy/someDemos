/*
 
 * 该模块应该是支持同个页面中的所有滑动事件，应该弄成一个队列
 * 
 * 
 * */


/*const Touch_Event={
	
};
const Mouse_Event={
	
};*/
/*监听事件以及移除事件*/
const event={
	on(el,type,listener){
		if(el.addEventListener){
			el.addEventListener(type,listener,false);
		}else if(el.attachEvent){//兼容ie7,ie8
			el.attachEvent("on"+type,()=>{
				listener.apply(el);
			});
		}else{
			el["on"+type]=listener;
		}
	},
	off(el,type,listener){
		if(el.removeEventListener){
			el.removeEventListener(type,listener,false);
		}else if(el.attachEvent){
			el.detachEvent("on"+type,()=>{
				listener.apply(el);
			});
		}else{
			el["on"+type]=null;
		}
	}
};
//抽象touch模块
class syTouch{
	constructor({el}){
		this._hasTouch=('ontouchstart' in window);//判断是否支持移动端
		this.el=el;//获取当前这个对象
		this.touchPosition={
			startPosition:null,
			endPosition:null
		};//始末位置
		this.direction;//滑动的方向
		this.queue={//指触发队列
			
		};
	}
	//初始化
	init(){
		if(this._hasTouch){
			//移动端
			event.on(this.el,"touchstart",this.startMove.bind(this));
			event.on(this.el,"touchmove",this.dealMove.bind(this));
			event.on(this.el,"touchend",this.endMove.bind(this));
		}else{
			//Pc端
			event.on(this.el,"mousedown",this.startMove.bind(this));
			event.on(this.el,"mousemove",this.dealMove.bind(this));
			event.on(this.el,"mouseup",this.endMove.bind(this));
			
		}
	}
	//更新操作
	update(){
		
	}
	//销毁对象
	destory(){
		if(this.el){
			off.on(this.el,"touchstart",this.startMove.bind(this));
			off.on(this.el,"touchmove",this.dealMove.bind(this));
			off.on(this.el,"touchend",this.endMove.bind(this));
			off.on(this.el,"mousedown",this.startMove.bind(this));
			off.on(this.el,"mousemove",this.dealMove.bind(this));
			off.on(this.el,"mouseup",this.endMove.bind(this));
		}
	}
	//开始滑动的操作
	startMove(e){
		this.touchPosition.startPosition=this.sliderNums(e);
		
	}
	//滑动过程的操作
	dealMove(e){
		this.touchPosition.endPosition=this.sliderNums(e);
	}
	//结束滑动的操作
	endMove(e){
		this.direction=this.getDirection(this.touchPosition.startPosition,this.touchPosition.endPosition);
		switch(this.direction){
			case 1://上
				break;
			case 2://左
				break;
			case 3://下
				break;
			case 4://右
				break;
		}
	}
	//第二层观察
	//@param type:事件名称
	//@param 
	observe(type,triggerArea){
	 	
	}
	//第二层监听，上下左右 todo
	listen(el,type,func){
		let rect;
		if(!el){
			el=null;
		}else{
			let temp=el.getBoundingClientRect();
			rect={
				x:temp.left,
				y:temp.top,
				width:temp.width,
				height:temp.height
			};
		}
		
		
	}
	//获取位置，x坐标，y坐标
	sliderNums(e=>{
		if(_hasTouch&&e.type=="touchstart"){
			return {
				x:e.touches[0].pageX,
				y:e.touches[0].pageY
			}
		}else if(_hasTouch&&e.type=="touchmove"){
			return {
				x:e.changedTouches[0].pageX,
				y:e.changedTouches[0].pageY
			}
		}else{
			return {
				x:e.pageX,
				y:e.pageY
			};
		}
	});
	//获取方向
	getDirection((dot1,dot2)=>{
		var differX=dot2.x-dot1.x;
		var differY=dot1.y-dot2.y;//y轴向下为正方形
		var result=0,angle;
		var getAngle=((dx,dy)=>Math.atan2(dy, dx) * 180 / Math.PI);
		/*距离太短考虑*/
		if(Math.abs(differX)<2&&Math.abs(differY)<2){
			return result;
		}
		/*获取角度并传回result*/
		angle=getAngle(differX,differY);
		if(angle >= 45 && angle < 135){//向上
			result=1;
		}else if((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)){//向左
			result=2;
		}else if(angle>=-135&& angle < -45){//向下
			result=3;
		}else if(angle >= -45 && angle < 45){//向右
			result=4;
		}
		
		return result;
	});
	
}
export default syTouch;