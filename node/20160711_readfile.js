var fs=require("fs");
fs.readFile("file.txt",'utf-8',function(err,data){
	if(err){
		console.log(err);
	}
	if(data){
		console.log(data);
	}
	
});
console.log("is end");