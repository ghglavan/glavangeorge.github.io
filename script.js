

window.onload = function(){

	var c =  document.getElementById("canv");

	var enemyFired = false;
	
	var finished = false;

	var context = c.getContext("2d");

	var entered = false;

	var scor = 0;

	var set =  false;

	var direction = 40;
	
	var level = 2;

	var entitati = [];
	
	var exit = 9;

	var start = 9;

	var down = 0;

	var mat = [];

	var gold = 0;

	var hasKey = false;

	var dead = false;
	var mov = 4;     

	var copaci = [];

	for(var i = 1; i < 11; i++){
		var copac = new Image();
		copac.src = "copaci/copac"+i+".png";
		copaci.push(copac);
	}

	var coinImage = new Image();
	coinImage.src = "coin.png";

	var spears = [];

	var wall = new Image();
	wall.src = "wall.png";

	var spearl = new Image();
	spearl.src = "spear1.png";
	
	var printesa = new Image();
	printesa.src = "p.png";

	var spearu = new Image();
	spearu.src = "spearsus.png";

	var speard = new Image();
	speard.src = "spearjos.png";

	var spearr = new Image();
	spearr.src = "speardreapta.png";

	var charImageW = new Image();
	charImageW.src = "mainch/walk.png";

	var charImageA = new Image();
	charImageA.src = "mainch/attack.png";

	var charImageD = new Image();
	charImageD.src = "mainch/die.png";

	var key = new Image();
	key.src = "dkey.png";

	var gkey = new Image();
	gkey.src = "gk.png";
		
	var enemy = [];

	var coins = [];

	initializare(mat,entitati,exit,start,enemy,context,level);



	var char = {
		walk : sprite({
	    context: context,
	    width: 40,
	    height: 40,
	    image: charImageW,
	    loop: 1,
	    x: 0,
	    y: start*40,
	    numberOfFrames:9,
	    yindex:0,
	    nofy:4,
	    Xerr: 9,
	    Yerr: 3,
	    Werr: 40,
	    Herr: 49,
	    xbuf: 24
	}),attack: sprite({
	    context: context,
	    width: 40,
	    height: 40,
	    image: charImageA,
	    loop: 0,
	    x: 0,
	    y: start*40,
	    numberOfFrames:9,
	    yindex:0,
	    nofy:4,
	    Xerr: 7,
	    Yerr: 3,
	    Werr: 40,
	    Herr: 49,
	    xbuf: 24
	}),die: sprite({
	    context: context,
	    width: 40,
	    height: 40,
	    image: charImageD,
	    loop: 0,
	    x: 0,
	    y: start*40,
	    numberOfFrames:5,
	    yindex:0,
	    Xerr: -1,
	    Yerr: 3,
	    Werr: 40,
	    Herr: 49,
	    xbuf:24
	}),stance: 1,
	gstance: function(){if(this.stance == 1) return this.walk;if(this.stance == 2) return this.attack; return this.die;},
	movex: function(c){this.walk.x += c;this.attack.x+=c;this.die.x+=c;
						if(c < 0) {this.walk.yindex = 1;this.attack.yindex = 1;this.die.yindex = 0;}
							else  {this.walk.yindex = 3;this.attack.yindex = 3;this.die.yindex = 0;}
	},
	movey: function(c){this.walk.y += c;this.attack.y+=c;this.die.y+=c;
						if(c < 0) { this.walk.yindex = 0;this.attack.yindex = 0;this.die.yindex = 0;}
							else  {this.walk.yindex = 2;this.attack.yindex = 2;this.die.yindex = 0;}
	},
	dead: false
	}
/*



	sprite({
	    context: context,
	    width: charImage.width,
	    height: charImage.height/4,
	    image: charImage,
	    loop: 0,
	    x: 400,
	    y: 400,
	    numberOfFrames:11,
	    xbuf:5,
	    nofy:4,
	    yindex:0,
	    Werr: 22,
	    Xerr:-12,
	    Yerr:-20
	});

*/
	var legsBox = {
			x: char.gstance().x +4,
			y: char.gstance().y +4,
			width: 25,
			height: 33
		};

		var move = {};


	var reset = function(nivel){
		level = nivel;
		spears = [];
		coins = [];
		enemy = [];
		matrice = [];
		entitati = [];
		char.walk.x = char.attack.x = char.die.x = 0;
		char.walk.y = char.attack.y = char.die.y = start*40;
		char.stance = 1;
		initializare(mat,entitati,exit,start,enemy,context,level);
		if(level == 1){
			scor = 0;
			gold = 0;
			entered = false;
			
		}
		hasKey = false;
	}	

	c.addEventListener('click',function(e){
		var poz = getMousePos(c,e);

		//305,360,200,55
		if((finished == true ||  char.dead == true) &&  poz.x >= 305 && poz.x <= 505 && poz.y >= 360 && poz.y <= 415){
			char.dead = false;
			finished = false;
			reset(1);
		}
	})



	window.addEventListener('keydown',function(e){
		
		if(char.dead == true || finished == true){
			return;
		}




		var code = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
		


		if(code == 32)
			code = 0;
		
		move[code] = true;

		
		char.gstance().loop = 1;
		if(code == 0)
			char.stance = 2;
		else {
			char.stance = 1;
		
		}
		

		if(char.gstance().x / 40 > 19 && char.gstance().y / 40 == exit){
			reset(++level);
		}

		if(code == 0 && char.stance == 2 && char.gstance().frameIndex > 7){
			var s = {};
			if(direction == 37){
				s.img = spearl;
				s.height = spearl.height;
				s.width = spearl.width;
				s.x = char.gstance().x - 10;
				s.y = char.gstance().y;
			}else if(direction == 38){
				
				s.img = spearu;
				s.height = spearu.height;
				s.width = spearu.width;
				s.x = char.gstance().x;
				s.y = char.gstance().y - 10;
			}else if(direction == 39){
				s.img = spearr;
				s.height = spearr.height;
				s.width = spearr.width;
				s.x = char.gstance().x + 10;
				s.y = char.gstance().y;
			}else if(direction == 40){
				s.img = speard;
				s.height = speard.height;
				s.width = speard.width;
				s.x = char.gstance().x - 10;
				s.y = char.gstance().y;
			}
			s.d = direction;
			s.enemy = false;
			spears.push(s);
			
			return;
		}
		if( code != 0)
		direction = code;

    	var x = char.gstance().x;
    	var y = char.gstance().y;
		
		    	switch (code) {
		        	case 37: char.gstance().yindex = 1; char.movex(-mov); break; //Left key
		        	case 38: char.gstance().yindex = 0; char.movey(-mov); break; //Up key
		        	case 39: char.gstance().yindex = 3; char.movex(mov); break; //Right key
		        	case 40: char.gstance().yindex = 2; char.movey(mov); break; //Down key
		        	default: break; //Everything else
		    	}
	    	//console.log(char.x/40 +  " " + char.y/40);


  
    	legsBox = {
			x: char.gstance().x + 4,
			y: char.gstance().y + 4,
			width: 25,
			height: 33
		};


		for(var i = 0; i < entitati.length; i++){
			if((intersection(entitati[i],legsBox) || intersection(legsBox,entitati[i])) ){
				//console.log("i: "+ i+ " j: " + j);

				char.walk.x = x;
				char.walk.y = y;
				char.attack.x = x;
				char.attack.y = y;
				char.die.x = x;
				char.die.y = y;
				
								

		    	legsBox = {
					x: char.gstance().x +4,
					y: char.gstance().y +4,
					width: 33,
					height: 33
				};
				return;
			}
    	}

    	
    	if(char.gstance().x/40 >= 5 && entered == false && level == 1){
    		entered = true;
    		mat[2][4] = 1;
    		mat[1][4] = 1;
    		entitati.push({
    			x: 160,
    			y: 80,
    			width: 25,
    			height: 33
    		});

    		entitati.push({
    			x: 160,
    			y: 40,
    			width: 38,
    			height: 38
    		});
			var ogre2 = createCar("ogre",260,500,context);
			ogre2.stance = 1;
			ogre2.gstance().yindex = 2;
			enemy.push(ogre2);

			var ogre2 = createCar("ogre",420,320,context);
			ogre2.stance = 1;
			ogre2.gstance().yindex = 1;
			enemy.push(ogre2);

			var ogre2 = createCar("ogre",260,420,context);
			ogre2.stance = 1;
			ogre2.gstance().yindex = 0;
			enemy.push(ogre2);


			var ogre2 = createCar("ogre",420,220,context);
			ogre2.stance = 1;
			ogre2.gstance().yindex = 3;
			enemy.push(ogre2);


			var ogre2 = createCar("ogre",260,80,context);
			ogre2.stance = 1;
			ogre2.gstance().yindex = 3;
			enemy.push(ogre2);

			var ogre2 = createCar("ogre",400,120,context);
			ogre2.stance = 1;
			ogre2.gstance().yindex = 0;
			enemy.push(ogre2);

    	}
    	


	},true);


	window.addEventListener('keyup',function(e){
		char.gstance().loop = 0;
		if(char.stance != 3)
		char.gstance().frameIndex = 0;
		down = 0;
		move[e.keyCode] = false;
		
	},false);




	//document.getElementById("c").innerHTML = "x,y " + coins[2].x + " " + coins[2].y + " w,h " + coins[2].actualW + " " + coins[2].actualH;



	function text(){
		context.font = "25px Pixeled";
		context.fillStyle = "green";
		context.fillText("Score: "+scor, 10, 35);
		context.fillText("Gold: "+ gold, 320, 35);
		context.fillText("Level: "+level, 630, 35);
	}


	function gameLoop () {

	  window.requestAnimationFrame(gameLoop);


		
		if(hasKey == true && gold > 30 && level == 1 && mat[exit][19] == 1){
			mat[exit][19] = 0;
			entitati = [];
			
			for(var i = 0; i < 16; i++){
				for(var j = 0 ; j < 20; j++){
					if(mat[i][j] == 1){
					
						entitati.push({
							x: j*40+1,
							y: i*40+1,
							width: 38,
							height: 38
						});
					}
				}
			}

		}	  

		if(hasKey == true && level == 2 && gold > 150 && mat[14][2] == 1){
			mat[14][2] = 0;
			entitati = [];
			
			
			for(var i = 0; i < 16; i++){
				for(var j = 0 ; j < 20; j++){
					if(mat[i][j] != 0){
					
						entitati.push({
							x: j*40+1,
							y: i*40+1,
							width: 38,
							height: 38
						});
					}
				}
			}
		}
    	context.clearRect(0, 0, c.width, c.height);

    	for(var i = 0; i < 16; i++){
			for(var j = 0 ; j < 20; j++){
				if(mat[i][j] == 1){
					context.drawImage(wall,0,20,wall.width,wall.height-20,j*40,i*40,40,40);
				}else if(mat[i][j] > 1){
					context.drawImage(copaci[mat[i][j]-2],0,0,40,40,j*40,i*40,40,40);
				}
			}
		}
    	
    	text();

	  if(hasKey == false && intersection({
    				x: char.gstance().x,
    				y: char.gstance().y,
    				width:25,
    				height:40},{
    					x:680,
    					y:80,
    					width:25,
    					height:40
    				}) || intersection({
    					x:680,
    					y:80,
    					width:25,
    					height:40
    				},{
    				x: char.gstance().x,
    				y: char.gstance().y,
    				width:25,
    				height:40
    				})){
	  	hasKey = true;
	  }

	  if(level == 2 && hasKey == false){
	  	context.drawImage(gkey,0,0,40,40,680,80,30,30);
	  }else if(level == 1 && hasKey == false){
		context.drawImage(key,0,0,40,40,680,80,30,30);
	  }
	  



    	for(var i = 0; i < coins.length; i++){
    		if(intersection(coins[i],char.gstance()) || intersection(char.gstance(),coins[i])){
    			coins.splice(i,1);
    			gold += 10;
    		}
    	}

    	for(var i = 0 ; i < enemy.length; i++){
    		if((intersection({
    				x: enemy[i].gstance().x,
    				y: enemy[i].gstance().y,
    				width: 25,
    				height:40
    			},{
    				x: char.gstance().x,
    				y: char.gstance().y,
    				width:25,
    				height:40
    			}) || intersection({
    				x: char.gstance().x,
    				y: char.gstance().y,
    				width:25,
    				height:40
    			},{
    				x: enemy[i].gstance().x,
    				y: enemy[i].gstance().y,
    				width: 25,
    				height:40
    			})) && enemy[i].dead == false ){
    			char.stance = 3;
    			char.dead = true;
    			enemy[i].stop = true;
    		}
    	}


    	for(var i = 0; i < enemy.length; i++){

    	

    		if(enemy[i].stop == false && enemy[i].ranged == false){
		    	switch(enemy[i].gstance().yindex){
		    		case 0 : enemy[i].movey(-mov/2);break;
		    		case 1 : enemy[i].movex(-mov/2);break;
		    		case 2 : enemy[i].movey(mov/2);break;
		    		case 3 : enemy[i].movex(mov/2);break;
		    	}	
		    	
	    		for(var j = 0; j < entitati.length; j++){
	    			if(intersection(entitati[j],enemy[i].gstance()) || intersection(enemy[i].gstance(),entitati[j])){
	    				switch(enemy[i].gstance().yindex){
				    		case 0 : enemy[i].movey(mov);break;
				    		case 1 : enemy[i].movex(mov);break;
				    		case 2 : enemy[i].movey(-mov);break;
				    		case 3 : enemy[i].movex(-mov);break;
				    	}
				    	break;
	    			}
	    		}
	    	}else if(enemy[i].stop == false && enemy[i].ranged == true){
	    		/**/
	    		var d = enemy[i].gstance().frameIndex;
	    		if(d == 8 && enemy[i].fired == false){
		    		var s = {};
		    		var direction = 0;
		    		enemy[i].fired = true;
		    		switch(enemy[i].gstance().yindex){
			    		case 0 : direction = 38;break;
			    		case 1 : direction = 37;break;
			    		case 2 : direction = 40;break;
			    		case 3 : direction = 39;break;
			    	}
			    	if(direction == 37){
						s.img = spearl;
						s.height = spearl.height;
						s.width = spearl.width;
						s.x = ehemy[i].gstance().x - 10;
						s.y = enemy[i].gstance().y;
					}else if(direction == 38){
						
						s.img = spearu;
						s.height = spearu.height;
						s.width = spearu.width;
						s.x = enemy[i].gstance().x;
						s.y = enemy[i].gstance().y - 10;
					}else if(direction == 39){
						s.img = spearr;
						s.height = spearr.height;
						s.width = spearr.width;
						s.x = enemy[i].gstance().x + 10;
						s.y = enemy[i].gstance().y;
					}else if(direction == 40){
						s.img = speard;
						s.height = speard.height;
						s.width = speard.width;
						s.x = enemy[i].gstance().x - 10;
						s.y = enemy[i].gstance().y;
					}
					s.d = direction;
					s.enemy = true;
					spears.push(s);
					
					
			    }else if(enemy[i].fired == true && enemy[i].set == false){
			    	enemy[i].set = true;
			    	(function(i) {
						setTimeout(function() {
							enemy[i].set = false;
							enemy[i].fired = false;
							enemy[i].gstance().frameIndex = 0;
						}, 3000);
					}(i));
			    } 
	    	}else if(enemy[i].dead == true && enemy[i].coined == false){

	    		var xc = enemy[i].gstance().x;
	    		var yc = enemy[i].gstance().y;
	    		var d = i;
	    		enemy[d].coined = true;

	    		
	    		setTimeout(function(){
	    			
	    			coins.push(sprite({
					    context: context,
					    width: 40,
					    height: 40,
					    image: coinImage,
					    loop: 1,
					    x: xc,
					    y: yc,
					    numberOfFrames:10,
					    yindex:0,
					    Xerr:4,
					    Yerr:0,
					    Werr:40,
					    Herr:40,
					    xbuf:4
					}));
	    			
	    		},500);
	    	}else if(enemy[i].stop == true && enemy[i].dead == false){
	    		enemy[i].stance = 2;
	    		enemy[i].gstance().yindex = (char.walk.yindex +2) % 4;
	    		
	    	}	
    		
    		if(!(enemy[i].ranged == true && set == false)){
    			enemy[i].frameIndex = 0;
    		}
			
			//=======================================================================================================================================
    		if(enemy[i].ranged == false || enemy[i].fired == false)
			enemy[i].gstance().update();
    		enemy[i].gstance().render();
    		//drawBox(enemy[i].gstance(),context);
    	}

    	/*
    	drawBox(char,context);
    	for(var i = 0; i < coins.length; i++){
    		drawBox(coins[i],context);
    	}
    	*/

    	
	  for(var  i = 0; i < coins.length; i++){
	  	coins[i].update();
	  	coins[i].render();
	  }

	  char.gstance().update();
	  char.gstance().render();
	  if(level == 2)
	  context.drawImage(printesa,0,0,40,40,40,560,40,40);

	  //drawBox(char.gstance(),context);

	  for(var i = 0; i < spears.length; i++){
    		if(spears[i] == undefined){

    			
    			
    			continue;
    		}
    		if(spears[i].img == undefined){
    			spears.splice(i,1);
    			break;
    		}
    		
			if(spears[i].enemy == true && (intersection({
    				x: spears[i].x,
    				y: spears[i].y,
    				width:25,
    				height:40
    			},char.gstance()) || intersection(char.gstance(),{
    				x: spears[i].x,
    				y: spears[i].y,
    				width:25,
    				height:40
    			}))){
					char.dead = true;
					char.stance = 3;
				}
			
    		context.drawImage(spears[i].img,0,0,spears[i].width,spears[i].height,spears[i].x,spears[i].y,40,40);
    		//drawBox(spears[i],context);
    		switch(spears[i].d){
    			case 37:spears[i].x -= 10;break;
    			case 38:spears[i].y -= 10;break;
    			case 39:spears[i].x += 10;break;
    			case 40:spears[i].y += 10;break;
    			default: break;
    		}

    		for(var j = 0; j < enemy.length; j++){
    			if(enemy[j].dead == true){
    				continue;
    			}
    			if(spears[i].enemy == true){
    				break;
    			}

    			if(spears[i].enemy == false && intersection({
    				x: enemy[j].gstance().x,
    				y: enemy[j].gstance().y,
    				width: 25,
    				height:40
    			},{
    				x: spears[i].x,
    				y: spears[i].y,
    				width:25,
    				height:40
    			}) || intersection({
    				x: spears[i].x,
    				y: spears[i].y,
    				width:25,
    				height:40
    			},{
    				x: enemy[j].gstance().x,
    				y: enemy[j].gstance().y,
    				width: 25,
    				height:40
    			})){
    				
    				scor += 5;

    				if(enemy[j].hp == 0){
	    				enemy[j].dead = true;
	    				enemy[j].stop = true;
	    				enemy[j].stance = 3;
	    				spears.splice(i,1);
	    				break;
    				}else{
    					enemy[j].hp --;
    					spears.splice(i,1);
	    				break;
    				}
    			}
    		}


    		for(var j = 0; j < entitati.length; j++){
    			if(spears[i] != undefined){
    				if(intersection({
		    				x: entitati[j].x,
		    				y: entitati[j].y,
		    				width: 25,
		    				height:25
		    			},{
		    				x: spears[i].x,
		    				y: spears[i].y,
		    				width:25,
		    				height:25
		    			}) || intersection({
		    				x: spears[i].x,
		    				y: spears[i].y,
		    				width:25,
		    				height:25
		    			},{
		    				x: entitati[j].x,
		    				y: entitati[j].y,
		    				width: 25,
		    				height:25
		    			})){
    					spears.splice(i,1);
    				}
    			}
    		}


    	}
	if(intersection(char.gstance(),{
		x: 30,
		y: 560,
		width: 40,
		height: 40
	}) || intersection({x: 30,
		y: 560,
		width: 40,
		height: 40
	},char.gstance())){
		finished = true;
	}
 
	if(char.dead == true){
		context.globalAlpha = 0.8;
		context.fillStyle = "black";
		context.fillRect(0,0,800,640);
		context.globalAlpha = 1.0;
		context.fillStyle = "red";
		context.font = "40px Pixeled";
		context.fillText("Ai pierdut", 250,320);
		context.fillStyle = "green";
		context.fillRect(305,360,200,55);
		context.strokeStyle = "yellow";
		context.strokeRect(305,360,200,55);
		context.fillStyle = "black";
		context.font = "20px Pixeled";
		context.fillText("Restart!",333,400);

	}
	if(finished == true){
		context.globalAlpha = 0.8;
		context.fillStyle = "black";
		context.fillRect(0,0,800,640);
		context.globalAlpha = 1.0;
		context.fillStyle = "red";
		context.font = "40px Pixeled";
		context.fillText("Ai salvat printesa!", 120,320);
		context.fillStyle = "green";
		context.fillRect(305,360,200,55);
		context.strokeStyle = "yellow";
		context.strokeRect(305,360,200,55);
		context.fillStyle = "black";
		context.font = "20px Pixeled";
		context.fillText("Restart!",333,400);
	}

	  
	}


	coinImage.addEventListener("load", gameLoop());

};






	function sprite (options) {
	
		var that = {},
        tickCount = 0,
        ticksPerFrame = 4,
        numberOfFrames = options.numberOfFrames || 1;

        that.frameIndex = 0;
		
		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.x = options.x;
		that.y = options.y;
		that.image = options.image;
		that.loop = options.loop;
		that.nofy = options.nofy || 1;
		that.xbuf = options.xbuf || 0;
		that.yindex = options.yindex || 0;
		that.Werr = options.Werr || 3;
		that.Herr = options.Herr || 4;
		that.Xerr = options.Xerr || 5;
		that.Yerr = options.Yerr || 5;
	
		that.actualH = that.image.height / that.nofy/2;
		that.actualW = that.image.width / numberOfFrames/2;
		
		that.update = function () {

        tickCount += 1;
			
        if (tickCount > ticksPerFrame) {
        
	            tickCount = 0;
	        	
	            // If the current frame index is in range
	            if (that.frameIndex < numberOfFrames - 1 ) {	
	                // Go to the next frame
	                that.frameIndex += 1;
	            }else if(that.loop == 1){
	            	that.frameIndex = 0;
	            }	
	        }
    	};
		  that.render = function () {
		  if(that.loop == 0 && this.dead == false){
		  	that.frameIndex = 0;
		  }else if(this.dead == true){
		  	that.frameIndex = 6;
		  	that.loop = 0;
		  }
		  
		  //console.log("da " + that.frameIndex + " " + numberOfFrames + " " + that.loop);

        // Draw the animation
        that.context.drawImage(
           that.image,
           that.frameIndex * (that.Werr + that.xbuf) + that.Xerr ,
           that.yindex * that.image.height / that.nofy + that.Yerr*that.yindex,
           that.Werr ,
           that.Herr ,
           that.x + 8,
           that.y ,
           32 ,
           40) ;
    };   
		
		that.getFrameWidth = function () {
			return that.width / numberOfFrames;
		};
		
		return that;
	}
	





function intersection(coin,char){
	return inside(coin.x,coin.y,char) || inside(coin.x+coin.width,coin.y,char)
		|| inside(coin.x,coin.y+coin.height,char) || inside(coin.x+coin.width,coin.y+coin.height,char);
 }



function inside(pointx,pointy,rect){
	return pointx >= rect.x && pointx <= rect.x + rect.width && 
			pointy >= rect.y && pointy <= rect.y + rect.height;
}

function strictIntersection(coin,char){

	return sinside(coin.x,coin.y,char) || sinside(coin.x+coin.width,coin.y,char)
		|| sinside(coin.x,coin.y+coin.height,char) || sinside(coin.x+coin.width,coin.y+coin.height,char);
}

function sinside(pointx,pointy,rect){
	return pointx > rect.x && pointx < rect.x + rect.width && 
			pointy > rect.y && pointy < rect.y + rect.height;
}

var getMousePos = function(canv, ev){
	var rect = canv.getBoundingClientRect();
	return {
		x: ev.clientX - rect.left,
		y: ev.clientY - rect.top
	};
}

function drawBox(box,context){
	context.beginPath();
    context.moveTo(box.x, box.y);
    context.lineTo(box.x + box.width, box.y);
	context.lineTo(box.x + box.width, box.y + box.height);
	context.lineTo(box.x, box.y + box.height);
	context.lineTo(box.x, box.y);
	context.stroke();    
}

function createCar(pat,xc,yc,context){
	var charImageW = new Image();
	charImageW.src = pat+"/walk.png";

	var charImageA = new Image();
	charImageA.src = pat+"/attack.png";

	var charImageD = new Image();
	charImageD.src = pat+"/die.png";


	var char = {
		walk : sprite({
	    context: context,
	    width: 40,
	    height: 40,
	    image: charImageW,
	    loop: 1,
	    x: xc,
	    y: yc,
	    numberOfFrames:9,
	    yindex:0,
	    nofy:4,
	    Xerr: 9,
	    Yerr: 3,
	    Werr: 40,
	    Herr: 49,
	    xbuf: 24
	}),attack: sprite({
	    context: context,
	    width: 40,
	    height: 40,
	    image: charImageA,
	    loop: 1,
	    x: xc,
	    y: yc,
	    numberOfFrames:6,
	    yindex:0,
	    nofy:4,
	    Xerr: 7,
	    Yerr: 3,
	    Werr: 40,
	    Herr: 49,
	    xbuf: 24
	}),die: sprite({
	    context: context,
	    width: 40,
	    height: 40,
	    image: charImageD,
	    loop: 0,
	    x: xc,
	    y: yc,
	    numberOfFrames:6,
	    yindex:0,
	    Xerr: -1,
	    Yerr: 3,
	    Werr: 40,
	    Herr: 49,
	    xbuf:24
	}),stance: 1,
	gstance: function(){if(this.stance == 1) return this.walk;if(this.stance == 2) return this.attack; return this.die;},
	movex: function(c){this.walk.x += c;this.attack.x+=c;this.die.x+=c;
						if(c < 0) {this.walk.yindex = 1;this.attack.yindex = 1;this.die.yindex = 0;}
							else  {this.walk.yindex = 3;this.attack.yindex = 3;this.die.yindex = 0;}
	},
	movey: function(c){this.walk.y += c;this.attack.y+=c;this.die.y+=c;
						if(c < 0) { this.walk.yindex = 0;this.attack.yindex = 0;this.die.yindex = 0;}
							else  {this.walk.yindex = 2;this.attack.yindex = 2;this.die.yindex = 0;}
	},
	dead: false,
	stop: false,
	coined: false,
	hp: 3,
	ranged: false
	}

	return char;
}

function createCarRanged(pat,xc,yc,context){


	var charImageA = new Image();
	charImageA.src = pat+"/attack.png";

	var charImageD = new Image();
	charImageD.src = pat+"/die.png";


	var char = {
	attack: sprite({
	    context: context,
	    width: 40,
	    height: 40,
	    image: charImageA,
	    loop: 1,
	    x: xc,
	    y: yc,
	    numberOfFrames:9,
	    yindex:0,
	    nofy:4,
	    Xerr: 7,
	    Yerr: 3,
	    Werr: 40,
	    Herr: 49,
	    xbuf: 24
	}),die: sprite({
	    context: context,
	    width: 40,
	    height: 40,
	    image: charImageD,
	    loop: 0,
	    x: xc,
	    y: yc,
	    numberOfFrames:6,
	    yindex:0,
	    Xerr: -1,
	    Yerr: 3,
	    Werr: 40,
	    Herr: 49,
	    xbuf:24
	}),stance: 2,
	gstance: function(){if(this.stance == 2) return this.attack; return this.die;},
	movex: function(c){this.attack.x+=c;this.die.x+=c;
						if(c < 0) {this.attack.yindex = 1;this.die.yindex = 0;}
							else  {this.attack.yindex = 3;this.die.yindex = 0;}
	},
	movey: function(c){this.attack.y+=c;this.die.y+=c;
						if(c < 0) {this.attack.yindex = 0;this.die.yindex = 0;}
							else  {this.attack.yindex = 2;this.die.yindex = 0;}
	},
	dead: false,
	stop: false,
	coined: false,
	hp: 2,
	ranged:  true
	}

	return char;
}




function initializare(mat,entitati,exit,start,enemy,context,level){
	if(level == 1){

		for(var i = 0; i < 16; i++){
			mat[i] = new Array(20);
		}

		for(var i = 0; i < 16; i++){
			for(var j = 0 ; j < 20; j++){
				mat[i][j] = 0;
			}
		}

		for(var i = 0; i < 16; i++){
			if(i == exit)
				continue;
			mat[i][0] = 1;
			mat[i][19] = 1;

		}

		mat[exit][19] = 1;

		for(var i = 0; i < 20; i++){
			mat[1][i] = 1;
			mat[0][i] = 1;
			mat[15][i] = 1;

		}
		mat[13][12] = 1;
		mat[12][12] = 1;
		mat[11][12] = 1;
		mat[10][12] = 1;
		mat[9][12] = 1;
		mat[8][12] = 1;
		mat[7][12] = 1;
		mat[6][12] = 1;
		mat[5][12] = 1;
		mat[4][12] = 1;
		mat[3][12] = 1;
		mat[2][12] = 1;
		mat[1][12] = 1;

	 	mat[13][8] = 1;
		mat[12][8] = 1;
		mat[11][8] = 1;
		mat[10][8] = 1;
		mat[9][8] = 1;
		mat[8][8] = 1;
		mat[7][8] = 1;
		mat[6][8] = 1;
		mat[5][8] = 1;
		mat[4][8] = 1;
		mat[3][8] = 1;


		mat[7][4] = 1;
		mat[7][5] = 1;
		mat[7][6] = 1;
		mat[7][7] = 1;


		mat[14][4] = 1;
		mat[13][4] = 1;
		mat[12][4] = 1;
		mat[11][4] = 1;
		mat[10][4] = 1;
		mat[9][4] = 1;
		mat[8][4] = 1;
		mat[7][4] = 1;
		mat[6][4] = 1;
		mat[5][4] = 1;
		mat[4][4] = 1;
		mat[3][4] = 1;

		mat[3][14] = 1;
		mat[3][15] = 1;
		mat[3][17] = 1;
		mat[3][16] = 1;
		mat[3][18] = 1;

		for(var i = 0; i < 16; i++){
				for(var j = 0 ; j < 20; j++){
					if(mat[i][j] == 1){
					
						entitati.push({
							x: j*40+1,
							y: i*40+1,
							width: 38,
							height: 38
						});
					}
				}
			}

		var ogre = createCar("ogre",200,200,context);
		ogre.stance = 1;

		enemy.push(ogre);

		ogre = createCar("ogre",240,440,context);
		ogre.stance = 1;
		ogre.gstance().yindex = 1;
		enemy.push(ogre);
		ogre = createCar("ogre",100,440,context);
		ogre.stance = 1;
		ogre.gstance().yindex = 0;
		enemy.push(ogre);

		ogre = createCar("ogre",680,80,context);
		ogre.stance = 1;
		ogre.gstance().yindex = 1;
		ogre.hp = 6;
		enemy.push(ogre);

		ogre = createCar("ogre",680,80,context);
		ogre.stance = 1;
		ogre.gstance().yindex = 3;
		enemy.push(ogre);
		ogre = createCar("ogre",720,200,context);
		ogre.stance = 1;
		ogre.gstance().yindex = 3;
		enemy.push(ogre);
		ogre = createCar("ogre",540,200,context);
		ogre.stance = 1;
		ogre.gstance().yindex = 1;
		enemy.push(ogre);
		ogre = createCar("ogre",540,400,context);

		ogre.stance = 1;
		ogre.gstance().yindex = 0;
		enemy.push(ogre);
		ogre = createCar("ogre",520,400,context);
		ogre.stance = 1;
		ogre.gstance().yindex = 2;
		enemy.push(ogre);
		ogre = createCar("ogre",720,400,context);
		ogre.stance = 1;
		ogre.gstance().yindex = 3;
		enemy.push(ogre);
		
		}else if(level == 2){

			for(var i = 0; i < 16; i++){
				mat[i] = new Array(20);
			}

			for(var i = 0; i < 16; i++){
				for(var j = 0 ; j < 20; j++){
					mat[i][j] = 0;
				}
			}

			for(var i = 0; i < 16; i++){
				if(i == exit)
					continue;
				mat[i][0] = 1;
				mat[i][19] = 1;

			}

			mat[exit][19] = 1;

			for(var i = 0; i < 20; i++){
				mat[0][i] = 1;
				mat[1][i] = 1;
				mat[15][i] = 1;
			}

			mat[14][2] = 1;
			mat[13][2] = 1;
			mat[13][1] = 1;

			mat[2][2] = Math.floor(Math.random()*10) + 2;
			mat[3][2] = Math.floor(Math.random()*10) + 2;
			mat[4][2] = Math.floor(Math.random()*10) + 2;
			mat[5][2] = Math.floor(Math.random()*10) + 2;
			mat[6][2] = Math.floor(Math.random()*10) + 2;
			mat[8][2] = Math.floor(Math.random()*10) + 2;
			mat[9][2] = Math.floor(Math.random()*10) + 2;
			mat[10][2] = Math.floor(Math.random()*10) + 2;
			mat[11][2] = Math.floor(Math.random()*10) + 2;
			mat[7][2] = Math.floor(Math.random()*10) + 2;

			mat[3][3] = Math.floor(Math.random()*10) + 2;

			mat[13][3] = Math.floor(Math.random()*10) + 2;
			mat[13][4] = Math.floor(Math.random()*10) + 2;
			mat[13][5] = Math.floor(Math.random()*10) + 2;
			mat[13][6] = Math.floor(Math.random()*10) + 2;
			mat[13][7] = Math.floor(Math.random()*10) + 2;
			mat[13][8] = Math.floor(Math.random()*10) + 2;
			mat[13][9] = Math.floor(Math.random()*10) + 2;
			mat[13][10] = Math.floor(Math.random()*10) + 2;
			mat[13][11] = Math.floor(Math.random()*10) + 2;
			mat[13][12] = Math.floor(Math.random()*10) + 2;
			mat[13][13] = Math.floor(Math.random()*10) + 2;
			mat[13][14] = Math.floor(Math.random()*10) + 2;
			mat[13][15] = Math.floor(Math.random()*10) + 2;
			mat[13][16] = Math.floor(Math.random()*10) + 2;
			mat[13][17] = Math.floor(Math.random()*10) + 2;

			mat[7][17] = Math.floor(Math.random()*10) + 2;
			mat[3][17] = Math.floor(Math.random()*10) + 2;
			mat[4][17] = Math.floor(Math.random()*10) + 2;
			mat[5][17] = Math.floor(Math.random()*10) + 2;
			mat[6][17] = Math.floor(Math.random()*10) + 2;
			mat[8][17] = Math.floor(Math.random()*10) + 2;
			mat[9][17] = Math.floor(Math.random()*10) + 2;
			mat[10][17] = Math.floor(Math.random()*10) + 2;
			mat[11][17] = Math.floor(Math.random()*10) + 2;
			mat[12][17] = Math.floor(Math.random()*10) + 2;
			
			mat[3][4] = Math.floor(Math.random()*10) + 2;
			mat[3][5] = Math.floor(Math.random()*10) + 2;
			mat[3][6] = Math.floor(Math.random()*10) + 2;
			mat[3][7] = Math.floor(Math.random()*10) + 2;
			mat[3][8] = Math.floor(Math.random()*10) + 2;
			mat[3][9] = Math.floor(Math.random()*10) + 2;
			mat[3][10] = Math.floor(Math.random()*10) + 2;
			mat[3][11] = Math.floor(Math.random()*10) + 2;
			mat[3][12] = Math.floor(Math.random()*10) + 2;
			mat[3][13] = Math.floor(Math.random()*10) + 2;
			mat[3][14] = Math.floor(Math.random()*10) + 2;
			mat[3][16] = Math.floor(Math.random()*10) + 2;


			mat[7][7] = Math.floor(Math.random()*10) + 2;
			mat[5][7] = Math.floor(Math.random()*10) + 2;
			mat[6][7] = Math.floor(Math.random()*10) + 2;
			mat[8][7] = Math.floor(Math.random()*10) + 2;
			mat[9][7] = Math.floor(Math.random()*10) + 2;
			mat[10][7] = Math.floor(Math.random()*10) + 2;
			mat[11][7] = Math.floor(Math.random()*10) + 2;
			mat[12][7] = Math.floor(Math.random()*10) + 2;


			mat[7][13] = Math.floor(Math.random()*10) + 2;
			mat[3][13] = Math.floor(Math.random()*10) + 2;
			mat[4][13] = Math.floor(Math.random()*10) + 2;
			mat[5][13] = Math.floor(Math.random()*10) + 2;
			mat[6][13] = Math.floor(Math.random()*10) + 2;
			mat[8][13] = Math.floor(Math.random()*10) + 2;
			mat[9][13] = Math.floor(Math.random()*10) + 2;
			mat[10][13] = Math.floor(Math.random()*10) + 2;
			mat[11][13] = Math.floor(Math.random()*10) + 2;

			for(var i = 0; i < 16; i++){
				for(var j = 0 ; j < 20; j++){
					if(mat[i][j] != 0){
					
						entitati.push({
							x: j*40+1,
							y: i*40+1,
							width: 38,
							height: 38
						});
					}
				}
			}
		
		sch = createCar("schelet",120,160,context);
		sch.stance = 1;
		sch.gstance().yindex = 2;
		enemy.push(sch);
		sch = createCar("schelet",120,200,context);
		sch.stance = 1;
		sch.gstance().yindex = 3;
		enemy.push(sch);
		sch = createCar("schelet",120,480,context);
		sch.stance = 1;
		sch.gstance().yindex = 3;
		enemy.push(sch);
		sch = createCar("schelet",200,400,context);
		sch.stance = 1;
		sch.gstance().yindex = 2;
		enemy.push(sch);

		sch = createCar("schelet",400,160,context);
		sch.stance = 1;
		sch.gstance().yindex = 3;
		enemy.push(sch);
		sch = createCar("schelet",360,160,context);
		sch.stance = 1;
		sch.gstance().yindex = 1;
		enemy.push(sch);
		sch = createCar("schelet",480,480,context);
		sch.stance = 1;
		sch.gstance().yindex = 3;
		enemy.push(sch);
		sch = createCar("schelet",440,480,context);
		sch.stance = 1;
		sch.gstance().yindex = 1;
		enemy.push(sch);
		sch = createCarRanged("scheletA",40,80,context);
		sch.stance = 2;
		sch.gstance().yindex = 2;
		sch.set = false;
		sch.fired = false;
		enemy.push(sch);
		sch = createCarRanged("scheletA",120,80,context);
		sch.stance = 2;
		sch.gstance().yindex = 3;
		sch.set = false;
		sch.fired = false;
		enemy.push(sch);
		sch = createCarRanged("scheletA",120,560,context);
		sch.stance = 2;
		sch.gstance().yindex = 3;
		sch.set = false;
		sch.fired = false;
		enemy.push(sch);
		
		sch = createCar("schelet",420,260,context);
		sch.stance = 1;
		sch.gstance().yindex = 3;
		enemy.push(sch);
		sch = createCar("schelet",440,460,context);
		sch.stance = 1;
		sch.gstance().yindex = 1;
		enemy.push(sch);
		sch = createCar("schelet",480,560,context);
		sch.stance = 1;
		sch.gstance().yindex = 3;
		enemy.push(sch);
		sch = createCar("schelet",440,380,context);
		sch.stance = 1;
		sch.gstance().yindex = 1;
		enemy.push(sch);
		sch = createCar("schelet",600,260,context);
		sch.stance = 1;
		sch.gstance().yindex = 3;
		enemy.push(sch);
		sch = createCar("schelet",600,120,context);
		sch.stance = 1;
		sch.gstance().yindex = 2;
		enemy.push(sch);
		sch = createCar("schelet",600,380,context);
		sch.stance = 1;
		sch.gstance().yindex = 1;
		enemy.push(sch);
		
	}
}


 function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}