//ÒıÈëhttpÄ£¿é
var http=require('http');
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.write("I am here");
	res.end()
	
}).listen(8082);