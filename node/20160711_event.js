var EventEmitter=require("events").EventEmitter;
var event=new EventEmitter();
/*绑定*/
event.on('some_event',function(){
	console.log("some_event occured");
});
setTimeout(function(){
	/*触发事件*/
	event.emit("some_event");
},1000);