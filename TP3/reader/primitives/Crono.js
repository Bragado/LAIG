function Crono(scene, boardID) {
	
	this.scene = scene;
 
	this.boardID = boardID;
	this.ready = false;
	this.quad = new Rectangle(this.scene, -10, -7, 10, 7);
	this.genericQuad = new Rectangle(this.scene, -0.5, -0.5, 0.5, 0.5);
	
	this.material = new CGFappearance(this.scene);
	this.material.setAmbient(1.0, 0.3, 0.3, 1.0);
	this.material.setDiffuse(0.3, 0.3, 0.3, 1.0);
	this.material.setSpecular(0.8, 0.8, 0.8, 1.0);
	this.material.setEmission(1.0, 0.2, 0.2, 1.0);
	this.material.setShininess(0.8);
	this.material.setTextureWrap('REPEAT', 'REPEAT');
	
	this.textureFundo = new CGFtexture(this.scene, "../resources/game/madeira_taco.png");
	this.textureRed = new CGFtexture(this.scene, "../resources/red.jpg");
	
	var filename=getUrlVars()['chess1Position.dsx'] || "chess1Position.dsx";
	this.reader = this.scene.graph.reader;
	this.reader.open('scenes/'+ filename, this);
	
	
	
}



Crono.prototype.onXMLReady=function() 
{
		var rootElement = this.reader.xmlDoc.documentElement;
		var board = rootElement.getElementsByTagName('board');
		for(var i = 0; i < board.length; i++){
			var id = this.reader.getString(board[i], 'id', false);
			if(id == this.boardID){
				this.process(board[i]);
								
				}
			}
		
		
		this.scene.ready = true;
		
}

Crono.prototype.process= function(root) {
	var crono = root.getElementsByTagName('cronometro');
	this.x = this.reader.getFloat(crono[0], 'posX', false);
	this.y = this.reader.getFloat(crono[0], 'posY', false);
	this.z = this.reader.getFloat(crono[0], 'posZ', false);

	this.textures = new Array();
	
	var texture = crono[0].getElementsByTagName('texture');
	for(var i = 0; i < texture.length; i++) {
		
		var textRef = this.reader.getString(texture[i], 'id', false);
		this.textures.push(new CGFtexture(this.scene, textRef));
		
	}
	
}

Crono.prototype.display = function(currTime) {
	this.material.apply();
	
	this.scene.pushMatrix();
		this.scene.translate(this.x, this.y, this.z); 
		//this.scene.rotate(Math.PI/2, 0, 1,0);				||||| Aqui será chamado o ângulo que irá variar durante a troca de jogadores
		this.scene.pushMatrix();			// frente
			this.scene.translate(0,0,3);
			this.textureFundo.bind(0);
			this.quad.display();
			
			this.scene.pushMatrix();	// meio
				this.scene.translate(0,0,0.1);
				this.scene.scale(18, 4, 1);
				this.textureRed.bind(0);
				this.genericQuad.display();
				this.textureRed.unbind(0);
			this.scene.popMatrix();
			
			this.scene.pushMatrix();	// cima -> Score
				this.scene.translate(0, 4.5,0.1);
				this.scene.scale(18, 4, 1);
				this.textureRed.bind(0);
				//this.genericQuad.display();
				this.textureRed.unbind(0);
				
				this.scene.pushMatrix();
					this.scene.translate(0, 0, 0.1);
					this.scene.scale(1/3, 1, 1);
					this.textures[13].bind(0);
					this.genericQuad.updateTexturesAmpli(1,1);
					this.genericQuad.display();
					this.textures[13].unbind(0);
				this.scene.popMatrix();
				
				this.scene.pushMatrix();
					this.scene.translate(-7/18, 0, 0.1 );
					this.scene.scale(4/18, 1, 1);
					this.textures[this.scene.PLAYERA_RESULT].bind(0);
					this.genericQuad.updateTexturesAmpli(1,1);
					this.genericQuad.display();
					this.textures[this.scene.PLAYERA_RESULT].unbind(0);
				this.scene.popMatrix();

				this.scene.pushMatrix();
					this.scene.translate(7/18, 0, 0.1 );
					this.scene.scale(4/18, 1, 1);
					this.textures[this.scene.PLAYERB_RESULT].bind(0);
					this.genericQuad.updateTexturesAmpli(1,1);
					this.genericQuad.display();
					this.textures[this.scene.PLAYERA_RESULT].unbind(0);
				this.scene.popMatrix();
				
			this.scene.popMatrix();
			
			this.scene.pushMatrix();	// baixo
				this.scene.translate(0,-4.5,0.1);
				this.scene.scale(18, 4, 1);
				this.textureRed.bind(0);
				this.genericQuad.display();
				this.textureRed.unbind(0);
			this.scene.popMatrix();	
			this.textureFundo.unbind(0);
		this.scene.popMatrix();
		
		this.scene.pushMatrix();			// lado direito		
			this.textureFundo.bind(0);
			this.scene.translate(10, 0, 0);
			this.scene.rotate(Math.PI/2, 0, 1,0);
			this.scene.scale(6,14,1);
			
			this.genericQuad.display();
			this.textureFundo.unbind(0);
		this.scene.popMatrix();
		
		this.scene.pushMatrix();			// lado esquerdo		
			this.textureFundo.bind(0);
			this.scene.translate(-10, 0, 0);
			this.scene.rotate(-Math.PI/2, 0, 1,0);
			this.scene.scale(6,14,1);
			
			this.genericQuad.display();
			this.textureFundo.unbind(0);
		this.scene.popMatrix();
		
		this.scene.pushMatrix();			// cima	
			this.textureFundo.bind(0);
			this.scene.translate(0,7,0);
			this.scene.rotate(-Math.PI/2, 1, 0,0);
			this.scene.scale(20,6,1);
			this.genericQuad.display();
			this.textureFundo.unbind(0);
		this.scene.popMatrix();
		
		this.scene.pushMatrix();			// baixo		
			this.textureFundo.bind(0);
			this.scene.translate(0,-7,0);
			this.scene.rotate(Math.PI/2, 1, 0,0);
			this.scene.scale(20,6,1);
			this.genericQuad.display();
			this.textureFundo.unbind(0);
		this.scene.popMatrix();
		
		this.scene.pushMatrix();	// parte de trás
			this.textureFundo.bind(0);
			this.scene.translate(0,0,-3);
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.quad.display();
			this.textureFundo.unbind(0);
		this.scene.popMatrix();
		
		
		
		
	this.scene.popMatrix();
	
	
}



Crono.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};