var http=require('http');
//http.Sever()是基于事件响应
var server=new http.Server();
server.on('request',function(req,res){
	//header
	res.writeHead(200,{'Content-Type':'text/html'});
	//body
	res.write('<h1>Node.js</h1>');
	//end必须,才会发送信息给客户端
	res.end('<p>hello wrold!</p>');
});
server.listen(3000);
console.log('HTTP server is listening at port 3000.');
