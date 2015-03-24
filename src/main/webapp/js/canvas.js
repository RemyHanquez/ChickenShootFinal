var canvas;
var ctx;
var tc = 32;



var chargerCanvas = function(){
	canvas = document.getElementById("mon_canvas");
	ctx = canvas.getContext("2d");
	window.addEventListener("keyup", release, false );
	window.addEventListener("keydown", press, false );
	window.addEventListener("mousedown", clique, false);
	window.addEventListener("mouseup", releaseClique, false);
	window.addEventListener("mousemove", motion, false);
	console.log('chargement du canvas terminé');
}

var afficherCarte = function(carte){	
	var map = carte.data.carte;
	var players = carte.data.players;	
	var balles = carte.data.balles;
	var bombes = carte.data.bombes;
	for(var i=0;i<map.length;i++){
		for(var j=0;j<map[i].length;j++){
			switch(map[i][j]){
			case BLOCK_GRASS:
				ctx.drawImage(imgGrass,i*tc,j*tc);
				break;
			case BLOCK_WALL:
				ctx.drawImage(imgWall,i*tc,j*tc);
				break;
			case BLOCK_TREE:
				ctx.drawImage(imgGrass,i*tc,j*tc);
				break;
			case BLOCK_ROCK:
				ctx.drawImage(imgGrass,i*tc,j*tc);
				ctx.drawImage(imgStone,i*tc,j*tc);
				break;
			}
		}
	}
	
	var player;
	for(var i=0;i<players.length;i++){
		player = players[i];
		if(player.type == "Poulet"){
			drawRotatedImage(player.x,player.y,player.angle,imgPoulet);
		}
	}
	
	//Pour que les persos puissent se cacher sous les arbres on les dessinent après
	for(var i=0;i<map.length;i++){
		for(var j=0;j<map[i].length;j++){
			switch(map[i][j]){
			case BLOCK_TREE:
				ctx.drawImage(imgTree,i*tc,j*tc);
				break;
			}
		}
	}
	
	for(var i=0;i<players.length;i++){
		player = players[i];
		if(player.type == "Chasseur"){
			drawRotatedImage(player.x,player.y,player.angle,imgChasseur);
		}
	}
	
	//On dessine les barres de vies
	for(var i=0;i<players.length;i++){
		drawBarreDeVie(player);
	}
	
	var bombe;
	for(var i=0;i<bombes.length;i++){
		bombe = bombes[i];
		ctx.drawImage(imgBombe,bombe.x,bombe.y);
	}
	
	var balle;
	for(var i=0;i<balles.length;i++){
		balle = balles[i];
		drawRotatedImage(balle.x,balle.y,balle.angle,imgFleche);
	}
	console.log('affichage de la carte terminé');	
	
}

var drawRotatedImage = function(x,y,angle,img){
	ctx.save(); 
	ctx.translate(x, y);
	ctx.rotate(angle);
	ctx.drawImage(img, -(img.width/2), -(img.height/2));
	ctx.restore(); 
}

var drawBarreDeVie = function(player){
	ctx.fillStyle = "black";
	ctx.strokeStyle = "black";
	ctx.fillRect(player.x-25,player.y-50,50,10);
	var pourcentageVita = (player.vie*50)/player.vieInitiale;
	
	if(pourcentageVita>player.vieInitiale*0.6)
		ctx.fillStyle = "#45E600";
	else if(pourcentageVita<=player.vieInitiale*0.6 && pourcentageVita>player.vieInitiale*0.2)
		ctx.fillStyle = "#F3AA00";
	else
		ctx.fillStyle = "#FF0000";
	
	ctx.fillRect(player.x-25,player.y-50,pourcentageVita,10);
	ctx.strokeRect(player.x-25,player.y-50,50,10);
	ctx.fillStyle = "black";
	ctx.fillText(player.type,player.x-25, player.y-55);
}
