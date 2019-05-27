function Map(){
    console.log('构造函数呢');
}
Map.prototype.init=function(options){
    console.log(options);
    this.canvas=options.canvas;
    console.log(this.canvas);
    this.ctx=this.canvas.getContext('2d');
    this.width=options.width;
    this.height=options.height;
}
Map.prototype.clear=function(){
    this.ctx.clearRect(0,0,this.width,this.height);
}
Map.prototype.render=function(){
    this.clear();
    this.ctx.fillStyle='black';
    console.log('宽高');
    console.log(this.width);
    console.log(this.height);
    this.ctx.fillRect(0,0,this.width,this.height);
}



