class Peca {
	
	constructor(scene, id, x, y, z) {
		CGFobject.call(this, scene);
		this.scene = scene;
		this.id = id;
		this.x = x;
		this.y = y;
		this.z = z;
		
		this.animeOn = false;	
		
		this.states = {NOPICK: 0, PICK: 1, TOPPICK: 2};
		
		
		
		
		
		this.pick = this.states.PICK;
		
		
		this.activeShader = false;
		
		 
		
		
		 
	}
	
	
	updateTexturesAmpli(length_s, length_t) {
		
	}
	
	
	calculaDist(ponto1, ponto2) {
		return Math.sqrt(
			Math.pow(ponto1[0] - ponto2[0], 2 ) +
			Math.pow(ponto1[1] - ponto2[1], 2 ) +
			Math.pow(ponto1[2] - ponto2[2], 2 ));
	}
	
};
	



class normalPeca extends Peca {
	constructor(scene, id, x, y, z, textureRef) {
		super(scene, id, x, y, z);
		this.texture = new CGFtexture(this.scene, textureRef);					// necessário criar uma textura
		
			// to draw the object
		this.quad = new Rectangle(scene, -3, -3, 3, 3);
		this.top = new Plane(scene, 6, 6, 4, 4); 
		//this.top.updateTexturesAmpli(6,6);
		this.quad.updateTexturesAmpli(6, 6);


		this.placed = false;
		this.automaticMove = false;
		this.automaticToMove = {State: null, xTarget: -1, yTarget: -1, zTarget: -1, spanTime: -1, currentTime: -1, altura: 10};
		
		
		this.material = new CGFappearance(this.scene);
		this.material.setAmbient(0.3, 0.3, 0.3, 0.3);
		this.material.setDiffuse(1.0, 0.0, 0.0, 0.3);
		this.material.setSpecular(0.8, 0.8, 0.8, 0.3);
		this.material.setEmission(0.2, 0.2, 0.2, 0.2);
		this.material.setShininess(0.8);
		this.material.setTextureWrap('REPEAT', 'REPEAT');
		
		var colorRed = [1.0, 0.0, 0.0, 1.0];
		
		this.shader = new CGFshader(this.scene.gl, "shaders/piece.vert", "shaders/piece.frag");
	
		this.shader.setUniformsValues({
								  uSampler : 0,
                                  cs: colorRed
								});
		
	}
	
	getPosition(currTime){
		
		
		if(!this.automaticMove) {
			var posicao = {x: this.x, y: this.y, z: this.z};	
			return posicao;
			
		}
		
		if (currTime >= this.automaticToMove.spanTime + this.automaticToMove.currentTime) {
			this.automaticMove = false;
			this.x = this.automaticToMove.xTarget;
			this.y = this.automaticToMove.yTarget;
			this.z = this.automaticToMove.zTarget;
			this.automaticToMove.State.stopAutomatic();
			
		}
		
		
		var posicao = {x: this.x, y: this.y, z: this.z};
		
		var dt = (currTime - this.automaticToMove.currentTime )/ this.automaticToMove.spanTime; 
		posicao.x = this.x * (1.0 - dt) + this.automaticToMove.xTarget*dt;									// Simulação do movimento: 	
																											//			
		posicao.z = this.z * (1.0 - dt) + this.automaticToMove.zTarget*dt;									//                 **   						|	
																											//			   *	    *						|	this.altura
   		var angle2 = Math.asin(this.automaticToMove.yTarget /this.automaticToMove.altura);						//		    *			   *					|				         this.altura > abs(yTarget)	
		var angle = (Math.PI ) * dt;																//		  *	                 *					|
																											//		*                      *  			 		
		posicao.y = this.automaticToMove.altura * Math.sin(angle) /*- this.automaticToMove.altura * Math.sin(angle2) */;						//                               *				|   yTarget
																											//			                       *            | 
		return posicao;
		
	}
	
	setAutomaticMove(state, x, y, z, span, currTime, alt) {
		this.automaticToMove = {State: state, xTarget: x, yTarget: y, zTarget: z, spanTime: 1, currentTime: currTime, altura: 10 + (this.y - y)*3};
		this.automaticMove = true;
	}
	
	
	
	
	
	display(currTime) {
		
	 	this.scene.clearPickRegistration();
		
		var posicao = this.getPosition(currTime);	
		
		this.scene.clearPickRegistration();
		this.material.apply();
		
		this.scene.pushMatrix();		//base
			this.scene.translate(0.0, -3.0, 0.0);
			this.scene.translate(posicao.x, posicao.y, posicao.z);	 					
			this.scene.rotate(Math.PI/2, 1, 0, 0);			
			if(this.states.PICK ==  this.pick )
				this.scene.registerForPick(parseInt(this.id), this.quad);
			this.quad.display();
		this.scene.popMatrix();
		
			
		this.scene.pushMatrix();	 					 
			this.scene.translate(0.0, 0.0, 3.0);
			this.scene.translate(posicao.x, posicao.y, posicao.z);
			//if(this.states.PICK ==  this.pick )
			//	this.scene.registerForPick(parseInt(this.id), this.quad);
			this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			 
			this.scene.translate(0.0, 0.0, -3);
			this.scene.translate(posicao.x, posicao.y, posicao.z);
			this.scene.rotate(Math.PI, 1, 0, 0);
			//if(this.states.PICK == this.pick )
			//	this.scene.registerForPick(parseInt(this.id), this.quad);
			this.quad.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			
			this.scene.translate(-3.0, 0.0, 0);
			this.scene.translate(posicao.x, posicao.y, posicao.z);
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
			//if(this.states.PICK == this.pick )
			//	this.scene.registerForPick(parseInt(this.id), this.quad);       
			this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			
			this.scene.translate(3.0, 0.0, 0);
			this.scene.translate(posicao.x, posicao.y, posicao.z);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			//if(this.states.PICK == this.pick )
			//	this.scene.registerForPick(parseInt(this.id), this.quad);       
			this.quad.display();
		this.scene.popMatrix();

		
		this.scene.pushMatrix();	// topo
			this.scene.translate(posicao.x, posicao.y, posicao.z);
			this.scene.translate(0.0, 3.0, 0.0);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			
			//this.material.setTexture(this.texture);	
			//this.material.apply();
			this.texture.bind(0);
			if(this.states.TOPPICK == this.pick){
				this.scene.registerForPick(parseInt(this.id), this.quad);
				this.scene.setActiveShader(this.shader);
				this.quad.display();
				this.scene.setActiveShader(this.scene.defaultShader);
			}
			else 
				this.quad.display();
			
			
			this.texture.unbind(0);
		this.scene.popMatrix();
			// retirar o registo de picking
		this.scene.clearPickRegistration();
	
		//this.material.setTexture(null);
		//this.material.apply();
	}
		
}


class jogadorPeca extends Peca {
	
	constructor(scene, id, x, y, z, row, col) {
		super(scene, id, x, y, z);
			
		this.row = row;
		this.col = col;
			// to draw the object
		this.cylinder = new Cylinder(scene, 2, 2, 1, 16, 2);
		//this.material = new CGFMaterial();
		
		
			// for animations
		this.animeOn = false;
		this.animeInitTime = 0;
		this.xTarget;
		this.zTarget;
		this.span = 0.5;
		 
		this.altura = 5;
		
		this.material = new CGFappearance(this.scene);
		this.material.setAmbient(0.3, 0.3, 0.3, 0.3);
		this.material.setDiffuse(0.8, 0.8, 0.8, 0.3);
		this.material.setSpecular(0.8, 0.8, 0.8, 0.3);
		this.material.setEmission(0.5, 0.5, 0.5, 0.0);
		this.material.setShininess(0.0);
		this.material.setTextureWrap('REPEAT', 'REPEAT');
	/*	this.shader = new CGFshader(this.scene.gl, "shaders/jogador.vert", "shaders/jogador.frag");
		this.shader.setUniformsValues({
								  uSampler : 0,
                                  uAlpha: 0.5
								});*/
	}
	
	setAnimeOn(bool, xTarget, zTarget, currTime, state) {
		this.animeOn = bool;
		this.animeInitTime = currTime;
		this.xTarget = xTarget;
		this.zTarget = zTarget;
		this.state = state;
		this.col += this.xTarget > this.x ? 1 : 0;
		this.row += this.zTarget > this.z ? 1 : 0;
		this.col += this.xTarget < this.x ? -1 : 0;
		this.row += this.zTarget < this.z ? -1 : 0;
	}
	
	display(currTime) {
		 
		var posicao = this.getPosicao(currTime);
		this.scene.pushMatrix();
			this.scene.translate(posicao.x, posicao.y, posicao.z);
			this.scene.rotate(Math.PI/2, 1, 0, 0); 
			this.material.apply();
			 
			this.cylinder.display();
			 
		this.scene.popMatrix();
		
	 
	}
	
	getPosicao(currTime) {
		
		var posicao = {
			x: this.x,
			y: this.y,
			z: this.z
		}
		
		if(!this.animeOn)
			return posicao;	
		
		
		
		
		if(currTime - this.animeInitTime > this.span){
			this.x = this.xTarget;
			this.z = this.zTarget;
						
			this.animeOn = false;
			posicao.x = this.xTarget;
			posicao.z = this.zTarget;
			this.state.stopAutomatic();
			
		}
		
		else {
			
			var dt = (currTime - this.animeInitTime )/ this.span;							// Simulação do movimento: 
			var angle = Math.PI * dt;														//			
																							//                 **   						|	
																							//			   *	    *						|	this.altura
			posicao.x = this.x * (1.0-dt) + this.xTarget *  dt;									//		    *			   *				|								
			 																	//		  *	                 *					|	
			posicao.z = this.z * (1.0-dt) + this.zTarget *  dt;									
			 																					
			posicao.y = this.y + this.altura * Math.sin(angle);
			 										
		}
		
		
		return posicao;
		
	}
	
	
	
}








