var fs=require('fs');
fs.open('a.txt','r',function(err,fd){
	if(err){
		console.error(err);
		return;
	}
	var buf=new Buffer(8);
	fs.read(fd,buf,0,8,null,function(err,bytesRead,buffer){
		//读取的字节数以及缓冲区对象；
		if(err){
			console.error(err);
			return;
		}
		
		console.log('bytesRead'+bytesRead);
		console.log(buffer);
	});
});
