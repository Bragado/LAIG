function Constroi_Tab_State(scene, boardID, tipoDeJogo, dificuldade, cameras)  {
		
		
		this.cameras = cameras;			/* Menu Principal, Menu Final, 3 Diferentes c�maras */
		this.internalCamera = 2;
		this.ready = false;													// Colocar isto a dar...
		scene.ready = false;
		this.erros = false;
		
		this.scene = scene;
		this.boardID = boardID;
		this.tipoDeJogo = tipoDeJogo;
		this.dificuldade = dificuldade;
		
		
		this.gameBoard = new Board(scene);							 
		this.gameConstructBoard = new Array(); 	 
		
		/*
			Internal States
		*/
		
		this.states = { PIECECHOOSED: 0, NOPIECECHOOSED: 1, AUTOMATICMOVE: 2, PLAYERA: 3, PLAYERB: 4, UPDATEVIEW: 5, CHANGEPLAYER: 6};
		this.internalState = this.states.NOPIECECHOOSED;
		this.playerTurn = this.states.PLAYERA;
		
		 this.test = 1;
		 
		 
		this.automaticTime = 0.5;	
		

		
		this.movesTRACK = [];			// array of playerMove 
		
		this.currTime;
		
		this.tile_choosed =  null;
		
		this.players = [];
		
		this.changeView = {OLDSTATE: 0, INITTIME: 1, OLDCAMERA: 2, NEWCAMERA: 3, SPANTIME: 0 };
		this.degToRad= Math.PI / 180.0; 		
		
		
		var filename=getUrlVars()['chess1Position.dsx'] || "chess1Position.dsx";
		this.reader = this.scene.graph.reader;
		this.reader.open('scenes/'+ filename, this);
		
		this.lastPiece = {
			Tile: null,
			Peca: null,
			xOld: -1, yOld: -1, zOld: -1
		}
		
		
	
	};
	
	
	
Constroi_Tab_State.prototype.onXMLReady=function() 
{
		var rootElement = this.reader.xmlDoc.documentElement;
		var board = rootElement.getElementsByTagName('board');
		for(var i = 0; i < board.length; i++){
			var id = this.reader.getString(board[i], 'id', false);
			if(id == this.boardID){
				this.scene.ready = true;
				this.processBoard(board[i]);
				
				if(this.errors == false){
					this.ready == true;
					if(this.tipoDeJogo < 2)
					setPiecesToBePicked();
					
					
				}
			}
		}
		
		//
		
		
	}
	
	
Constroi_Tab_State.prototype.processBoard = function(root) {
		 	
		/*
			Coloca��o das tiles para o gameBoard		
		*/
			
		var tiles = root.getElementsByTagName('tiles');
		var tile = tiles[0].getElementsByTagName('tile');
		
		for(var i = 0; i < tile.length; i++) {						
			
			var id = this.reader.getString(tile[i], 'id', false);
			var x = this.reader.getFloat(tile[i], 'posX', false);
			var y = this.reader.getFloat(tile[i], 'posY', false);
			var z = this.reader.getFloat(tile[i], 'posZ', false); 
			var texture = this.reader.getString(tile[i], 'textura', false);
			
			
			this.gameBoard.board[Math.floor(i/8)][i%8] = new Tile(this.scene, id, x, y, z, texture, null);
			
		}	

		
		/*
			Coloca��o das pe�as
		*/
		
		var pecas = root.getElementsByTagName('pecas');
		var peca = pecas[0].getElementsByTagName('peca');	
		 
				
		this.scene.pieces = new Array(); 
		this.scene.pieces.push(null); 
		 
		for(var i = 0; i < peca.length; i++) {
			
			var id = this.reader.getString(peca[i], 'id', false);
			var x = this.reader.getFloat(peca[i], 'posX', false);
			var y = this.reader.getFloat(peca[i], 'posY', false);
			var z = this.reader.getFloat(peca[i], 'posZ', false);  
			var texturef = this.reader.getString(peca[i], 'textura', false);
			var piece;
			switch(i) {
				case 56:
					piece = new normalPeca(this.scene, i + 1, x, y, z, texturef);
					piece.pick = piece.states.NOPICK;
					this.gameBoard.board[0][0].setPeca(piece);
					this.gameBoard.board[0][0].internalState = this.gameBoard.board[0][0].states.PIECE; 
					break;
				case 57:
					piece = new normalPeca(this.scene, i + 1, x, y, z, texturef);
					piece.pick = piece.states.NOPICK;
					this.gameBoard.board[7][0].setPeca( piece);
					this.gameBoard.board[7][0].internalState = this.gameBoard.board[0][0].states.PIECE;
					break;
				case 58:
					piece = new normalPeca(this.scene, i + 1, x, y, z, texturef);
					piece.pick = piece.states.NOPICK;
					this.gameBoard.board[7][7].setPeca( piece);
					this.gameBoard.board[7][7].internalState = this.gameBoard.board[0][0].states.PIECE;
					break;
				case 59:
					piece = new normalPeca(this.scene, i + 1, x, y, z, texturef);
					piece.pick = piece.states.NOPICK;
					this.gameBoard.board[0][7].setPeca( piece);
					this.gameBoard.board[0][7].internalState = this.gameBoard.board[0][0].states.PIECE;
					break;
				case 60:
					piece = new normalPeca(this.scene, i + 1, x, y, z, texturef);
					piece.pick = piece.states.NOPICK;
					this.gameBoard.board[3][3].setPeca( piece);
					this.gameBoard.board[3][3].internalState = this.gameBoard.board[0][0].states.PIECE;
					break;
				case 61:
					piece = new normalPeca(this.scene, i + 1, x, y, z, texturef);
					piece.pick = piece.states.NOPICK;
					this.gameBoard.board[3][4].setPeca( piece);
					this.gameBoard.board[3][4].internalState = this.gameBoard.board[0][0].states.PIECE;
					break;
				case 62:
					piece = new normalPeca(this.scene, i + 1, x, y, z, texturef);
					piece.pick = piece.states.NOPICK;
					this.gameBoard.board[4][3].setPeca(piece);
					this.gameBoard.board[4][3].internalState = this.gameBoard.board[0][0].states.PIECE;
					break;
				case 63:
					piece = new normalPeca(this.scene, i + 1, x, y, z, texturef);
					piece.pick = piece.states.NOPICK;
					this.gameBoard.board[4][4].setPeca( piece);
					this.gameBoard.board[4][4].internalState = this.gameBoard.board[0][0].states.PIECE;
					break;
				default:
					this.gameConstructBoard.push(new normalPeca(this.scene, i + 1, x, y, z, texturef));
					break;
				
			}
			
			
			
			
			this.scene.pieces.push(id);
		}

		/*
			Jogadores	
		
		*/
		
		var players = root.getElementsByTagName('jogadores');
		var jogador = players[0].getElementsByTagName('jogador');
		
		for(var i = 0; i < jogador.length; i++) {
			var id = this.reader.getString(jogador[i], 'id', false);;
			var posX = this.reader.getFloat(jogador[i], 'posX', false);
			var posY = this.reader.getFloat(jogador[i], 'posY', false);
			var posZ = this.reader.getFloat(jogador[i], 'posZ', false);
			var col = 1;
			var row = 8;
			if(i == 0)
				row = 1;
			
			this.players.push( new jogadorPeca(this.scene, id, posX, posY, posZ, row, col));
				
			
		}
		
		/*
			Views
			
		*/
		
		var views = root.getElementsByTagName('views');
		var perspectives = views[0].getElementsByTagName('perspective');
		
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
				
				
			this.cameras.push( new CGFcamera(angle* this.degToRad, near, far, [fx, fy, fz], [tx, ty, tz]));
			
			
		}
		/*
		
			Menu Trocas
		*/
		this.piecesToPick = new Array();
		var menuTroca = root.getElementsByTagName('menuTrocas');
		var tiles = menuTroca[0].getElementsByTagName('tile');
		
		for(var i = 0; i < tiles.length; i++) {
			
			var texture = this.reader.getString(tiles[i], 'textura1', false);
			 
			
			
			
			var x = this.reader.getFloat(tiles[i], 'x', false);
			var y = this.reader.getFloat(tiles[i], 'y', false);
			var z = this.reader.getFloat(tiles[i], 'z', false);
			
			var text1 = new CGFtexture(this.scene, texture);
			
				this.piecesToPick.push(new Piece(new Rectangle(this.scene, -2.5, -2.5, 2.5, 2.5), x, y, z, text1));
			
		}
		
		
	
		this.ready = true;

		
		 
		 
	}
	
	
	
	
		
	//@override
Constroi_Tab_State.prototype.display = function(currTime) {
		if(this.crono == undefined)
			this.crono = new Crono(this.scene, this.boardID, currTime, this);
		
		if(!this.ready)
			return;
		 	
		this.test++;
		
		if(this.tipoDeJogo == 3 && this.test % 100 == 0) {
			this.dealWithTipoDeJogo();
			
		} else if(this.tipoDeJogo != 3)
			this.dealWithTipoDeJogo();
		
		
		
		
		
		
		this.currTime = currTime;
		
		this.gameBoard.display(currTime);
	
		for(var i = 0; i < this.gameConstructBoard.length; i++)
		{
			this.gameConstructBoard[i].display(currTime);
				
		}
			
		this.players[0].display();
		this.players[1].display();
		this.displayPieces();
		this.crono.display(currTime);	
		
	}
	
	
Constroi_Tab_State.prototype.displayPieces = function() {
	for(var i = 0; i < this.piecesToPick.length; i++) {				//	piece	piece.x piece.y piece.z piece.texture
			 
			this.scene.pushMatrix();
				
				
				this.scene.translate(this.piecesToPick[i].x, this.piecesToPick[i].y, this.piecesToPick[i].z);
				this.scene.rotate(-Math.PI/4, 1, 0, 0);
				
				
				this.piecesToPick[i].texture.bind(0);
				
				this.piecesToPick[i].piece.updateTexturesAmpli(5,5);
				this.scene.registerForPick(i + 1000, this.piecesToPick[i].piece);
				this.piecesToPick[i].piece.display();
				this.piecesToPick[i].texture.unbind(0);
				
			this.scene.popMatrix();
			
			 
			
		}
		
		this.scene.clearPickRegistration();
	
}	

Constroi_Tab_State.prototype.dealWithPieces = function(id)    {
		
		switch(id) {
			case 1000:	// up
				
				if(this.internalCamera < 4) {
					this.internalCamera++;
					this.changeView = {OLDSTATE: this.internalState, INITTIME: this.currTime, OLDCAMERA: this.cameras[this.internalCamera - 1], NEWCAMERA: this.cameras[this.internalCamera], SPANTIME: 0.8 };		
					this.internalState = this.states.UPDATEVIEW;
				}	
				
			break;
			case 1001:
				if(this.internalCamera > 2) {
					this.internalCamera--;
					this.changeView = {OLDSTATE: this.internalState, INITTIME: this.currTime, OLDCAMERA: this.cameras[this.internalCamera + 1], NEWCAMERA: this.cameras[this.internalCamera], SPANTIME: 0.8 };		
					this.internalState = this.states.UPDATEVIEW;
				}
				
				
			break;
			case 1002:	//back
				this.scene.state = new Transition(this.scene, new MenuPrincipal(this.scene, "chess1", 1), this.scene.camera, this.cameras[0], this.currTime);
			break;
			case 1003:	// undo
				if(this.lastPiece.Peca != null) {
					this.lastPiece.Peca.setAutomaticMove(this, this.lastPiece.xOld, this.lastPiece.yOld, this.lastPiece.zOld, 0.5, this.currTime, 10);
					this.lastPiece.Tile.internalState = this.lastPiece.Tile.states.NOPIECE;
					this.lastPiece.Tile.peca.placed = false;
					this.lastPiece.Tile.peca = null;
					this.lastPiece.Peca = null;
				}
			break;	
		}
	
	
	
}

Constroi_Tab_State.prototype.cronoAlert = function() {
	if(this.internalState != this.states.CHANGEPLAYER) {
		this.lastPiece.Peca = null;
		this.stopAutomatic();
	}
	else {
		this.internalState = this.states.NOPIECECHOOSED;
		this.test = 0;
	}
	
}
	
	
Constroi_Tab_State.prototype.dealWithTipoDeJogo = function() {
		
		if(this.internalState == this.states.CHANGEPLAYER)
			return;
		
		if(this.internalState == this.states.UPDATEVIEW) {
			if(this.changeView.SPANTIME > this.currTime - this.changeView.INITTIME + 0.01)
				transition(this.scene, this.changeView.INITTIME, this.currTime, this.changeView.SPANTIME, this.changeView.OLDCAMERA, this.changeView.NEWCAMERA);
			else {
				this.internalState = this.changeView.OLDSTATE;
				
			}
			return;
		}
		
		
		
		var id = this.scene.logPicking();
		if(id != undefined && id < 1004 && id > 999) {
			this.dealWithPieces(id);
			return;
		}
			
		
		
		switch(this.tipoDeJogo) {
			case 1:
				
				this.scene.clearPickRegistration();
				if (id != "" && id != undefined) {
					this.mouseDown(id);
				}
			break;
			case 2:
				if(this.playerTurn == this.states.PLAYERA) {
					
					this.scene.clearPickRegistration();
					if (id != "" && id != undefined) {
						this.mouseDown(id);
					}
					break;
				
				}
				
			
			default:
				if(this.internalState == this.states.NOPIECECHOOSED && this.test%80 == 0) {
					
					var peca = this.findFreePiece();
					var tile = this.findFreeTile();
					tile.setPeca(peca);
					tile.internalState = tile.states.PIECE;
					//tile.peca.pick = tile.piece.states.NOPICK;
					this.lastPiece = {Tile: tile, Peca: peca, xOld: peca.x, yOld: peca.y, zOld: peca.z};
					tile.peca.setAutomaticMove(this, tile.x, tile.y, tile.z, 0.5, this.currTime, 10);
					this.internalState = this.states.AUTOMATICMOVE;
					tile.peca.placed = true;		
				}
			
			break;
		
			
			
			
		}
		
		

}	

Constroi_Tab_State.prototype.findFreePiece = function() {
	while(1) {
		var random = Math.random();
		var indice = Math.floor(this.gameConstructBoard.length*random);
		 
		if(indice < this.gameConstructBoard.length && !this.gameConstructBoard[indice].placed )
			return this.gameConstructBoard[indice];
		
	}
	
}

Constroi_Tab_State.prototype.findFreeTile = function () {
	while(1) {
		var random1 = Math.random();
		var random2 = Math.random();
		var col = Math.floor(this.gameBoard.board.length*random1);
		var row = Math.floor(this.gameBoard.board.length*random2);
		if(col < this.gameBoard.board.length && row < this.gameBoard.board.length && this.gameBoard.board[row][col].internalState == this.gameBoard.board[row][col].states.NOPIECE)
				return this.gameBoard.board[row][col];
		
		
	}
	
	
	
}




	
Constroi_Tab_State.prototype.verifyEnd = function() {
	
	if(this.gameBoard.complete) {
		//scene, Board, dificuldade, tipo_de_jogo, currTime, players
		if(this.internalState == this.states.NOPIECECHOOSED)
		
		for(var i = 0; i < this.gameConstructBoard.length; i++) {
			this.gameConstructBoard[i].pick = this.gameConstructBoard[i].states.NOPICK;	
		}
	
		this.scene.state = new EmJogo_State(this.scene, this.gameBoard, this.dificuldade, this.tipoDeJogo, this.currTime, this.players, this.cameras, this.piecesToPick, this.crono, this.boardID);
		return true;
	}
	return false;
}
	
	
Constroi_Tab_State.prototype.setPieceChoosed= function(id) {
		
	
		
		for(var i = 0; i < this.gameConstructBoard.length; i++)
			if(this.gameConstructBoard[i].id == id) {
				this.tile_choosed = this.gameConstructBoard[i];
				
				 
				this.internalState = this.states.PIECECHOOSED;
				this.tilesToPick_NoPieceToPick();
			}
	}
	
	
Constroi_Tab_State.prototype.findBoardTile = function(id) {
		for(var i = 0; i < this.gameBoard.board.length; i++) {
			for(var j = 0; j < this.gameBoard.board[i].length; j++) {
				if(this.gameBoard.board[i][j].id == id)
					return this.gameBoard.board[i][j];
			}
		}
		
		return null;
	}


Constroi_Tab_State.prototype.NoTilesToPick_PiecesToPick = function() {
				
		for(var i = 0; i < this.gameConstructBoard.length; i++) {
			this.gameConstructBoard[i].pick = this.gameConstructBoard[i].states.PICK;	
		}		
		
		for(var i = 0; i < this.gameBoard.board.length; i++)
			for(var j = 0; j < this.gameBoard.board.length; j++){
				this.gameBoard.board[i][j].pick = this.gameBoard.board[i][j].NOPICKING;
				
				if(this.gameBoard.board[i][j].internalState == this.gameBoard.board[i][j].states.PIECE) {
					this.gameBoard.board[i][j].peca.pick = this.gameBoard.board[i][j].peca.states.NOPICK;
				}
				
				
			}
		
			
}
	
Constroi_Tab_State.prototype.tilesToPick_NoPieceToPick = function() {
		
		for(var i = 0; i < this.gameConstructBoard.length; i++) {
			this.gameConstructBoard[i].pick = this.gameConstructBoard[i].states.NOPICK;	
		}
			
		for(var i = 0; i < this.gameBoard.board.length; i++)
			for(var j = 0; j < this.gameBoard.board.length; j++){
				 
				
				if(this.gameBoard.board[i][j].internalState == this.gameBoard.board[i][j].states.NOPIECE) {
					this.gameBoard.board[i][j].pick = this.gameBoard.board[i][j].states.PICKING;
				}
				
				
			}	
			
}	


Constroi_Tab_State.prototype.trocaPlayer = function() {
		if(this.playerTurn == this.states.PLAYERA)
			this.playerTurn = this.states.PLAYERB;
		else
			this.playerTurn = this.states.PLAYERA;
		this.internalState = this.states.CHANGEPLAYER;
		this.crono.changePlayer(this.currTime);
		
	
}
	
	
	
	//@override
Constroi_Tab_State.prototype.mouseDown = function(id) {
		
		switch(this.internalState) {
				
			case this.states.PIECECHOOSED:
				 
				if(id == 0) {
					this.internalState == this.states.NOPIECECHOOSED;
					
				}
				else { 
					var tile = this.findBoardTile(id);
					if(tile != null && tile.internalState == tile.states.NOPIECE){
							
						tile.setPeca(this.tile_choosed);
						tile.internalState = tile.states.PIECE;
						//tile.peca.pick = tile.piece.states.NOPICK;
						this.lastPiece = {Tile: tile, Peca: this.tile_choosed, xOld: this.tile_choosed.x, yOld: this.tile_choosed.y, zOld: this.tile_choosed.z};
						tile.peca.setAutomaticMove(this, tile.x, tile.y, tile.z, 0.5, this.currTime, 10);
						this.internalState = this.states.AUTOMATICMOVE;
						tile.peca.placed = true;			
						
						
					}
					else {
						this.internalState = this.states.NOPIECECHOOSED;	
						
					}					
				}
				this.NoTilesToPick_PiecesToPick();	
				
				break;
			
			case this.states.NOPIECECHOOSED:
				
				 
				if(id != 0){
					this.setPieceChoosed(id);
									
				}
				break;
			default:
				break;
			
		}
		
				
		
	}
	
	//@override
Constroi_Tab_State.prototype.stopAutomatic = function() {
		this.internalState = this.states.NOPIECECHOOSED;
		
		
		if(this.tipoDeJogo == 1 || (this.tipoDeJogo==2 && this.playerTurn == this.states.PLAYERA))
			this.NoTilesToPick_PiecesToPick();
		
		if(!this.verifyEnd())
		this.trocaPlayer();
	}
	
	//@override
Constroi_Tab_State.prototype.keyDown = function() {					// neste caso para o 'U'ndo
		
	}
	
	
Constroi_Tab_State.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};


