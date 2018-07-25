function MPromise(fn){
	this.value;
	this.resolveFunc=function(){};
	this.rejectFunc=function(){};
	fn(this.resolve.bind(this),this.reject.bind(this));
}
MPromise.prototype.resolve=function(val){
	console.log('1')
	var self=this;
	self.value=val;
	setTimeout(function(){
		self.resolveFunc(self.value);
	},0);
}

MPromise.prototype.reject=function(val){
	console.log('2')
	var self=this;
	self.value=val;
	setTimeout(function(){
		self.rejectFunc(self.value);
	},0);
	
}
MPromise.prototype.then=function(resolve,reject){
	console.log('3')
	this.resolveFunc=resolve;
	this.rejectFunc=reject;
}
