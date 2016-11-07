var http=require('http');
var querystring=require('querystring');
var util=require('util');
//post实际不要这么做，有安全和效率问题
http.createServer(function(req,res){
	var post='';
	req.on('data',function(chunk){
		post+=trunk;
	});
	req.on('end',function(){
		post=querystring.parse(post);
		res.end(util.inspect(post));
	});
}).listen(3000);
console.log("the server is listening to the 3000 port");