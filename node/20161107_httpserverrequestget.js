var http=require('http');
var url=require('url');
var util=require('util');
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	//util.inspect将对象解析为字符串 url.parse将path解析为对象
	res.end(util.inspect(url.parse(req.url,true)));
}).listen(3000);
console.log("the server is listening to the 3000 port");