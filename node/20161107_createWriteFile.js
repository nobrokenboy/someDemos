var fs=require('fs');
var content="So good today,is a funny day,Jessica!";
fs.writeFile('today.txt',content,'utf-8',function(err){
	if(err){
		console.err(err);
		return;
	}
});
