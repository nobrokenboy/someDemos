var fs=require('fs');
var files=['a.txt','b.txt','c.txt'];
for(var i=0,j=files.length;i<j;i++){
	//利用函数式编程建立闭包，缺点：降低程序的可读性
	(function(i){
		//file[i]被传递可以定位到文件，然而i是指向退出循环之后的实例
		fs.readFile(files[i],"utf-8",function(err,contents){
			console.log(files[i]+":"+contents);
			/*console.log(files);
			console.log(i);
			console.log(files[i]);*/
		});
	})(i)
}
