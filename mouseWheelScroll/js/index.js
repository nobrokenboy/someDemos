$(document).ready(function(){

	$("#menu ul li a").click(function(e){
		$("#menu .hover").removeClass("hover");
	});

	$("#menu ul > li").hover(function(){
		$(this).addClass("hover");
	},function(){
		$(this).removeClass("hover");
	});


	$.fn.scrollPath("getPath")
	.moveTo(1000, 0, {name: "home"})
	.lineTo(1000, 2250, {name: "about"})
	.lineTo(1000, 3250)
	.arc(1550, 3250, 550, -Math.PI, Math.PI/2, true)
	.lineTo(2500, 3800, {name: "culture", rotate: -Math.PI/2})
	.arc(3550, 3800, 900, -Math.PI, Math.PI/2, true)
	.lineTo(4500, 4700, {name: "joinus"})
	.arc(4500, 3800, 900, Math.PI/2, 0, true)
	.lineTo(5400, 1350, {name: "address", rotate: Math.PI/2})
	.arc(5400, -50, 1350, Math.PI/2, Math.PI*1.5, true, {name: "galerie", rotate: 0})
	.lineTo(2400, -1400, {name: "kontakty"})
	.arc(2400, 0, 1400, Math.PI*1.5, Math.PI, true)
	.lineTo(2800, 1200, {name: "guangGao"})
	.arc(2800, 0, 1200, Math.PI/2,  Math.PI*1.5, true);


	$(".wrapper").scrollPath({drawPath: false, wrapAround: true});

	$("nav > ul > li > a").each(function(){
										 
		var target = $(this).attr("href").replace("#", "");
		
		$(this).click(function(e){
			if(target != "home"){
				window.location.hash = '#'+target;
			}else{
				window.location.hash = '#';
			}

			$("nav .active").removeClass("active");
			$(this).parent().addClass("active");
			$.fn.scrollPath("scrollTo", target, 2000, function(t, b, c, d) {
				return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
			});

			$(".wrap").fadeIn(1000);

		});
		
	});

});