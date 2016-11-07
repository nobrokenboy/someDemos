var fs=require('fs');
fs.open('today1.txt','w',function(err,fd){
	if(err){
		console.error(err);
		return;
	}
	var buf=new Buffer(8);
	fs.write(fd,buf,0,8,null,function(err,bytesWrite,buffer){
		if(err){
			console.error(err);
			return;
		}
		console.log("bytesWrite"+bytesWrite);
		console.log(buffer);
	});
	
	
});
