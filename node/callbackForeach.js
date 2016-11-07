var fs=require('fs');
var files=['a.txt','b.txt','c.txt'];
files.forEach(function(filename){
	fs.readFile(filename,"utf-8",function(err,contents){
		console.log(filename+":"+contents);
		
	});
});
/*var scope="top"; 
var f1=function(){
	console.log(scope);
} 
f1();
var f2=function(){
	var scope="f2";
	f1();
} 
f2();
*/