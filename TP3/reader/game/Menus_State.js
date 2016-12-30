
class Menu {
	
	constructor(scene, name ) {
		

		this.name = name;
		this.scene = scene; 
		this.ready = false;
		this.piecesToPick = new Array(); 
		this.angles= new Array();
		
		this.camera = new Array();
		this.cameraStates = {MenuPrincipal: 0, MenuAuxiliar: 1, MenuFinal: 2, CHESS1: 3, CHESS2: 4, CHESS3: 5};
		
		this.cameraState = this.cameraStates.MenuPrincipal;
		this.internalState = { Dificuldade: 0, Ambiente: "chess1" };
		this.currTime = 0;
		
		this.material = new CGFappearance(this.scene);
		this.material.setAmbient(0.3, 0.3, 0.3, 0.3);
		this.material.setDiffuse(1.0, 0.0, 0.0, 0.3);
		this.material.setSpecular(0.8, 0.8, 0.8, 0.3);
		this.material.setEmission(0.2, 0.2, 0.2, 0.2);
		this.material.setShininess(0.8);
		this.material.setTextureWrap('REPEAT', 'REPEAT');
		
		var filename=getUrlVars()['chess1Position.dsx'] || "chess1Position.dsx";
		this.reader = this.scene.graph.reader;
		this.reader.open('scenes/'+ filename, this);
		this.degToRad= Math.PI / 180.0; 
		
	}
	
	onXMLReady() {
		if(this.ready)
			return;


		var rootElement = this.reader.xmlDoc.documentElement;
		this.rootElement = rootElement;
		var menus = rootElement.getElementsByTagName('menus');
		var elems = menus[0].getElementsByTagName('views');
		
		
		var perspectives = elems[0].getElementsByTagName('perspective');
		
		for(var i = 0; i < perspectives.length; i++){
		
		// id + near + far + angle
		var id = this.reader.getString(perspectives[i], 'id', false);
		var near = this.reader.getFloat(perspectives[i], 'near', false);
		var far = this.reader.getFloat(perspectives[i], 'far', false);
		var angle = this.reader.getFloat(perspectives[i], 'angle', false);
		
		
		
		// from x + y + z	
		var fromm = perspectives[i].getElementsByTagName('from');
		if(fromm == null || fromm.length == 0)
			continue;
		var fx = this.reader.getFloat(fromm[0],'x', false);
		var fy = this.reader.getFloat(fromm[0], 'y', false);
		var fz = this.reader.getFloat(fromm[0], 'z', false);
		
		// to x + y + z
		var to = perspectives[i].getElementsByTagName('to');
		if(to == null || to.length == 0)
			continue;
		 
		
		var tx = this.reader.getFloat(to[0], 'x', false);
		var ty = this.reader.getFloat(to[0], 'y', false);		
		var tz = this.reader.getFloat(to[0], 'z', false);
		
		// verification
		if(id == null || isNaN(near) || near == null || far == null || isNaN(far) || isNaN(angle) || angle == null || isNaN(fx) || fx == null || isNaN(fy) || fy == null || isNaN(fz) || fz == null || isNaN(tx) || tx == null || isNaN(ty) || ty == null || isNaN(tz) || tz == null)
			continue;
			
		//this.angles.push(angle*this.degToRad);	
		this.camera.push( new CGFcamera(angle* this.degToRad, near, far, [fx, fy, fz], [tx, ty, tz]));
		
		
	}
	this.initTiles(this.name);	
	
		
	}
	
	
	onXMLError() {
		
	}
	
	initTiles(name) {
		var menus = this.rootElement.getElementsByTagName('menus');
		var menuPrincipal = menus[0].getElementsByTagName(name);
		var tiles = menuPrincipal[0].getElementsByTagName('tile');
		
		for(var i = 0; i < tiles.length; i++) {
			
			var texture = this.reader.getString(tiles[i], 'textura1', false);
			var texture2 = this.reader.getString(tiles[i], 'textura2', false);
			
			var x = this.reader.getFloat(tiles[i], 'x', false);
			var y = this.reader.getFloat(tiles[i], 'y', false);
			var z = this.reader.getFloat(tiles[i], 'z', false);
			
			var text1 = new CGFtexture(this.scene, texture);
			var text2 = new CGFtexture(this.scene, texture2);
			
			this.piecesToPick.push(new Piece(new Rectangle(this.scene, -4.5, -1, 4.5, 1), x, y, z, text1, text2));
			
		}
		
		this.ready = true;
		this.scene.ready = true;
		
	}
	
	
	
}



class MenuPrincipal extends Menu {
	
	constructor(scene, ambiente, dificuldade ) {
		super(scene, 'menuPrincipal');
		if(ambiente != undefined)
			this.internalState.Ambiente = ambiente;
		if(dificuldade != undefined)
			this.internalState.Dificuldade = dificuldade;
		
		 
		
	}
	
	
	 
	
	
	
	
	display(currTime) {
		if(!this.ready)
			return;
		
		this.currTime = currTime;
		
		var id = this.scene.logPicking();
		this.scene.clearPickRegistration();
		if (id != "" && id != undefined) {
			this.mouseDown(id);
		}
		
		for(var i = 0; i < this.piecesToPick.length; i++) {				//	piece	piece.x piece.y piece.z piece.texture
			 
			this.scene.pushMatrix();
				
				
				this.scene.translate(this.piecesToPick[i].x, this.piecesToPick[i].y, this.piecesToPick[i].z);
			
				
				
				this.material.setTexture(this.piecesToPick[i].texture);
				this.material.apply();
				this.piecesToPick[i].piece.updateTexturesAmpli(9,2);
				this.scene.registerForPick(i + 1, this.piecesToPick[i].piece);
				this.piecesToPick[i].piece.display();
				
			this.scene.popMatrix();
			
			 
			
		}
		
		this.scene.clearPickRegistration();
		
	}
	
	mouseDown(id) {
		
		switch(id) {
				
			case 4:
				this.scene.state = new Transition(this.scene, new MenuAuxiliar(this.scene, this.internalState.Ambiente, this.internalState.Dificuldade), this.camera[this.cameraStates.MenuPrincipal], this.camera[this.cameraStates.MenuAuxiliar], this.currTime );
			break;
			
			default:
				
				var CHESS = 3;
				
				switch(this.internalState.Ambiente) {
					case "chess2":
						CHESS = 4;
					break;
					case "chess3":
						CHESS = 5;
					break;
					
				}
				
		this.scene.state = new Transition(this.scene, new Constroi_Tab_State(this.scene, this.internalState.Ambiente, id, this.internalState.Dificuldade, [this.camera[this.cameraStates.MenuPrincipal], this.camera[this.cameraStates.MenuFinal]]), this.camera[this.cameraStates.MenuPrincipal], this.camera[CHESS - 1], this.currTime  );
				
				
			break;
			
			
		}
		
		
	}
	
	
}


class MenuAuxiliar extends Menu {
	
	constructor(scene, ambiente, dificuldade) {
		super(scene, 'menuAuxiliar');
		this.internalState.Ambiente = ambiente;
		this.internalState.Dificuldade = dificuldade;  
		
	}
	
	
	
	mouseDown(id) {
		if(id > 0 && id < 4) {
			this.internalState.Ambiente = "chess" + id;
		
		}else if(id > 3 && id < 7) {
			this.internalState.Dificuldade = id - 4;
		
		}else {
					 
			this.scene.state = new Transition(this.scene, new MenuPrincipal(this.scene, this.internalState.Ambiente, this.internalState.Dificuldade), this.camera[this.cameraStates.MenuAuxiliar], this.camera[this.cameraStates.MenuPrincipal], this.currTime);
		}
		
		
	}
	
	 
	 
	
	display(currTime){
		
		if(!this.ready)
			return;
		
		this.currTime = currTime;
		
		var id = this.scene.logPicking();
		this.scene.clearPickRegistration();
		if (id != "" && id != undefined) {
			this.mouseDown(id);
		}
		
		for(var i = 0; i < this.piecesToPick.length; i++) {				//	piece	piece.x piece.y piece.z piece.texture1 piece.texture2
			 
			this.scene.pushMatrix();
				
				this.scene.translate(this.piecesToPick[i].x, this.piecesToPick[i].y, this.piecesToPick[i].z);
				switch(i) {
					case 0:
						if(this.internalState.Ambiente == "chess1")
							this.material.setTexture(this.piecesToPick[i].texture2);
						else
							this.material.setTexture(this.piecesToPick[i].texture);
					break;
					case 1:
						if(this.internalState.Ambiente == "chess2")
							this.material.setTexture(this.piecesToPick[i].texture2);
						else
							this.material.setTexture(this.piecesToPick[i].texture);
					break;
					case 2:
						if(this.internalState.Ambiente == "chess3")
							this.material.setTexture(this.piecesToPick[i].texture2);
						else
							this.material.setTexture(this.piecesToPick[i].texture);
					break;
					case 3:
						if(this.internalState.Dificuldade == 0)
							this.material.setTexture(this.piecesToPick[i].texture2);
						else
							this.material.setTexture(this.piecesToPick[i].texture);
					break;
					case 4:
						if(this.internalState.Dificuldade == 1)
							this.material.setTexture(this.piecesToPick[i].texture2);
						else
							this.material.setTexture(this.piecesToPick[i].texture);
					break;
					case 5:
						if(this.internalState.Dificuldade == 2)
							this.material.setTexture(this.piecesToPick[i].texture2);
						else
							this.material.setTexture(this.piecesToPick[i].texture);
					break;
					default:
						this.material.setTexture(this.piecesToPick[i].texture);
					break;
					
				}
				
				this.material.apply();
				this.piecesToPick[i].piece.updateTexturesAmpli(9,2);
				this.scene.registerForPick(i + 1, this.piecesToPick[i].piece);
				this.piecesToPick[i].piece.display();
				 
			this.scene.popMatrix();
			
			 
			
		}
		
		this.scene.clearPickRegistration();
	}
	
	
	
}


class Piece {
	
	constructor(piece, x, y, z, texture, texture2 ) {
		this.piece = piece;
		this.x = x;
		this.y = y;
		this.z = z;
		this.texture = texture;
		this.texture2 = texture2;
		
	}
	
}



