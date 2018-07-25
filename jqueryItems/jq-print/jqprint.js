/* 
 * 1.了解window调用打印的原理
 * 
 * 
 * */
;(function($){
	var opt;
	$.fn.jqprint=function(options){
		/*
		 
		 * @param {Boolean} debug:是否已经在debug
		 * @param {Boolean} operaSupport:是否支持operaSupport
		 * @param {Boolean}	printContainer:要打印的容器
		 * @param {Boolean}	importCss:指是否有外部引入css
		 * */
		var defaults={
			debug:false,
			operaSupport:true,
			printContainer:true,
			importCss:true
		};
		//继承
		opt=$.extend({}, defaults, options);
		//判断当前是否为jQuery对象
		var $this=(this instanceof jQuery)?this:$(this);
		//window对象
		var tab='';
		//文档对象
		var doc='';
		//打开窗口
		if(opt.operaSupport&&$.testBrower.opera){
			
			tab=window.open('','printArea');
			doc=tab.document;
			doc.open();
		}else{
			var $iframe=$('<iframe/>');
			if(!opt.debug){
				$iframe.css({
					position:'absolute',
					width:0,
					height:0,
					top:'-600px',
					left:'-600px'
				});
			}
			$iframe.appendTo('body');
			doc=$iframe[0].contentWindow.document;
		}
		
		
		//复制样式
		if(opt.importCss){//外部引入
			if($('link[media=print]').length>0){
				$('link[media=print]').each(function(){
					doc.write("<link type='text/css' rel='stylesheet' ref='"+$(this).attr("href")+"' media='print'/>");
				});
			}else{
				$('link').each(function(){
					doc.write("<link type='text/css' rel='stylesheet' href='"+$(this).attr("href")+"' />");
				});
			}
		}else{//内嵌
			if($('style[media=print]').length>0){
				$('style[media=print]').each(function(){
					var styleContent=$(this).html();
					doc.write("<style type='text/css' media='print'>"+styleContent+"</style>");
					console.log(doc);
				});
			}else{
				$('style').each(function(){
					var styleContent=$(this).html();
					doc.write("<style type='text/css'>"+styleContent+"</style>");
				});
			}
		}
		
		
		//doc写入
		console.log(doc);
		if(opt.printContainer){
			doc.write($this.outer());
		}else{
			//疑问
			$this.each(function(){
				doc.write($(this).html());
			});
		}
		
		
		
	
		doc.close();
		
		(opt.operaSupport&&$.testBrower.opera?tab:$iframe[0].contentWindow).focus();
		
		setTimeout(function(){
			(opt.operaSupport&&$.testBrower.opera?tab:$iframe[0].contentWindow).print();
			if(tab){
				tab.close();
			}
		},1000);
	}
	//克隆
	$.fn.outer=function(){
		return $($('<div></div>').html(this.clone())).html();
	}
	//检测浏览器
	$.testBrower={
		mozilla:/firefox/.test(navigator.userAgent.toLowerCase()),
		webkit:/webkit/.test(navigator.userAgent.toLowerCase()),
		opera:/opera/.test(navigator.userAgent.toLowerCase()),
		msie:/msie/.test(navigator.userAgent.toLowerCase()),
		version:navigator.appVersion,
	};
})(jQuery);
