function Constroi_Tab_State(scene, boardID, tipoDeJogo, dificuldade, cameras)  {
		
		
		this.cameras = cameras;
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
		
		this.states = { PIECECHOOSED: 0, NOPIECECHOOSED: 1, AUTOMATICMOVE: 2, PLAYERA: 3, PLAYERB: 4};
		this.internalState = this.states.NOPIECECHOOSED;
		this.playerTurn = this.states.PLAYERA;
		
		 
		 
		 
		this.automaticTime = 0.5;	
		

		
		this.movesTRACK = [];			// array of playerMove 
		
		this.currTime;
		
		this.tile_choosed =  null;
		
		this.players = [];
		this.players.push( new jogadorPeca(this.scene, 'A', 19, 6.5, 29, 1, 1));
		this.players.push( new jogadorPeca(this.scene, 'B', 19, 6.5, 71, 8, 1));
				
		
		
		var filename=getUrlVars()['chess1Position.dsx'] || "chess1Position.dsx";
		this.reader = this.scene.graph.reader;
		this.reader.open('scenes/'+ filename, this);

		//makeRequest();
		
	};
	
	
	
Constroi_Tab_State.prototype.onXMLReady=function() 
{
		var rootElement = this.reader.xmlDoc.documentElement;
		var board = rootElement.getElementsByTagName('board');
		for(var i = 0; i < board.length; i++){
			var id = this.reader.getString(board[i], 'id', false);
			if(id == this.boardID){
				this.processBoard(board[i]);
				if(this.errors == false){
					this.ready == true;
					setPiecesToBePicked();
					
					
				}
			}
		}
		
		this.scene.ready = true;
		
	}
	
	
Constroi_Tab_State.prototype.processBoard = function(root) {
		 
		/*
			Colocação das tiles para o gameBoard		
		*/
			
		var tiles = root.getElementsByTagName('tiles');
		var tile = tiles[0].getElementsByTagName('tile');
		
		for(var i = 0; i < tile.length; i++) {						
			
			var id = this.reader.getString(tile[i], 'id', false);
			var x = this.reader.getFloat(tile[i], 'posX', false);
			var y = this.reader.getFloat(tile[i], 'posY', false);
			var z = this.reader.getFloat(tile[i], 'posZ', false); 
			
			
			this.gameBoard.board[Math.floor(i/8)][i%8] = new Tile(this.scene, id, x, y, z, null);
			
		}	

		
		/*
			Colocação das peças
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

		
		

		this.ready = true;

		
		 
		 
	}
	
	
	
	
		
	//@override
Constroi_Tab_State.prototype.display = function(currTime) {
		
		this.verifyEnd(); 	
		
		var id = this.scene.logPicking();
		this.scene.clearPickRegistration();
		if (id != "" && id != undefined) {
			this.mouseDown(id);
		}
		
		
		
		if(!this.ready)
			return;
		
		
		this.currTime = currTime;
		
		this.gameBoard.display(currTime);
	
		for(var i = 0; i < this.gameConstructBoard.length; i++)
		{
			this.gameConstructBoard[i].display(currTime);
				
		}
			
		this.players[0].display();
		this.players[1].display();
		
			
		
	}

	
Constroi_Tab_State.prototype.verifyEnd = function() {
	
	if(this.gameBoard.complete) {
		//scene, Board, dificuldade, tipo_de_jogo, currTime, players
		if(this.internalState == this.states.NOPIECECHOOSED)
		this.scene.state = new EmJogo_State(this.scene, this.gameBoard, this.dificuldade, this.tipoDeJogo, this.currTime, this.players);
		
	}
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
						tile.peca.setAutomaticMove(this, tile.x, tile.y, tile.z, 0.5, this.currTime, 10);
						this.internalState = this.states.AUTOMATICMOVE;
									
						
						
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
		this.NoTilesToPick_PiecesToPick();
	}
	
	//@override
Constroi_Tab_State.prototype.keyDown = function() {					// neste caso para o 'U'ndo
		
	}
	
	
Constroi_Tab_State.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};


class PlayerMove {					// move.oldX, move.newX, move.oldY, move.newY
		
		constructor(player, move){
			this.player = player;
			this.move = move;
		}		
		
	}