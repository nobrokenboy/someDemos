/*var http=require('http');
var url="http://www.imooc.com/learn/348";
http.get(url,function(res){
	var html="";
	res.on('data',function(data){
		html+=data;
	});
	
	res.on('end',function(){
		console.log(html)
	});
}).on('error',function(){
	console.log("课程有误");
})*/
var http=require('http');
var cheerio=require('cheerio');
var url="http://www.imooc.com/learn/348";
function filerChapters(html){
	var $=cheerio.load(html);
	var chapters=$('.learnchapter');
	
	var courseData=[];
	chapters.each(function(){
		var chapter=$(this);
		var chapterTitle=chapter.find('strong').text();
		var videos=chapter.find(".vedio").children("li");
		var chapterData={
			chapterTitle:chapterTitle,
			vedios:[]
		}
		
		 videos.each(function(){
			 var vedio=$(this).find('.studyvedio');
			 var vedioTitle=vedio.text();
			 var id=vedio.attr("href").split("vedio/")[1];
			 chapterData.vedio.push({
				 title:vedioTitle,
				 id:id
			 });
		 });
		 
		 courseData.push(chapterData);
	});
	
	return courseData;
	
}

function printCourseInfo(courseData){
	course.forEach(function(item){
		var chapterTitle=item.chapterTitle;
		console.log(chapterTitle+"\n");
		
		item.vedios.forEach(function(vedio){
		console.log('【'+vedio.id+'】'+vedio.title+"\n");
		})
	});
}
http.get(url,function(res){
	var html="";
	res.on('data',function(data){
		html+=data;
	});
	
	res.on('end',function(){
		var courseData=filerChapters(html);
		
	});
}).on('error',function(){
	console.log("课程有误");
})