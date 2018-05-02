class CheckerboardPainter { 
	static get inputProperties() { 
		return [ 
			'--checkerboard-spacing', 
			'--checkerboard-size'
		]
	} 
    paint(ctx, geom, properties) { 
    	console.log('获取属性');
    	console.log(properties);
//  	const size = parseInt(properties.get('--checkerboard-size').toString()); 
//  	console.log(properties.get('--checkerboard-size'));
//  	const spacing = parseInt(properties.get('--checkerboard-spacing').toString());
	  	const size=32;
	  	const spacing=10;
    	const colors = ['red', 'green', 'blue']; 
    	for(let y = 0; y < geom.height/size; y++) { 
    		for(let x = 0; x < geom.width/size; x++) { 
    			ctx.fillStyle = colors[(x + y) % colors.length]; 
    			ctx.beginPath(); 
    			ctx.rect(x*(size + spacing), y*(size + spacing), size, size); 
    			ctx.fill(); 
    		} 
    	} 
    } 
} 

registerPaint('checkerboarder', CheckerboardPainter);
