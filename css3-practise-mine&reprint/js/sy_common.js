
window.utils=(function(){
	
	var utils={};
	//随机产生颜色
	utils.randomColor=function(){
		return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
	};
	
	return utils;
})();
