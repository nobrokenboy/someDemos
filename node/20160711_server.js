var http=require("http");
http.createServer(function(req,res){
	res.writeHead(200,{"Content-Type":"text/html"});
	res.write('<h1>hello world</h1>');
	res.end('<p>turn to end</p>');
}).listen(3000);
console.log("the server is listening to the 3000 port");