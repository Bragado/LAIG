var allMoves = "";
var movesChanged = false;
var bestMoveReady = false;
var bestMove = "";
var theEnd = false;

class EmJogo_State {
	
	constructor(scene, Board, dificuldade, tipo_de_jogo, currTime, players, cameras, piecesToPick, crono, boardID) {
		
		this.scene = scene;
		this.initTime = currTime;
		//this.crono = crono;
		//this.crono.state = this;
		this.boardID = boardID;
		if(tipo_de_jogo == 3)
			this.dificuldade = 1;
		else
			this.dificuldade = dificuldade;
		
		this.piecesToPickk = piecesToPick;
		
		this.gameBoard = Board;
		this.tipo_de_jogo = tipo_de_jogo;
		this.cameras = cameras;			/* Menu Principal, Menu Final, 3 Diferentes câmaras */
		this.cameraState = 2;
		
		this.states = { PLAYERA: 0, PLAYERB: 1, WAITING: 2, AUTOMATICMOVE: 3, ALLMOVES:4, BESTMOVE: 5, UPDATEVIEW: 6, CHANGEPLAYER: 7 };
		
		this.internalState = this.states.WAITING;
		this.player = this.states.PLAYERA;
		this.prolog_Answer = this.states.ALLMOVES;
		
		this.players = players;
		
		this.changeView = {OLDSTATE: 0, INITTIME: 1, OLDCAMERA: 2, NEWCAMERA: 3, SPANTIME: 0 };
		this.movesTRACK = [];
		
		this.piecesAvailable = new Array();
		this.firstTime = true;
		this.calculaPecasDisponiveis();
		
		var sstr = Board.toString();
		
		this.firstMove();
		this.ready = false; 
	}
	
	firstMove() {
		
		this.gameBoard.board[0][0].peca.setSpecialAutomaticMove(this, -1, 0.5, this.initTime);
		this.gameBoard.board[0][7].peca.setSpecialAutomaticMove(this, -1, 0.5, this.initTime);
		this.gameBoard.board[3][3].peca.setSpecialAutomaticMove(this, -1, 0.5, this.initTime);
		this.gameBoard.board[3][4].peca.setSpecialAutomaticMove(this, -1, 0.5, this.initTime);
		this.gameBoard.board[4][3].peca.setSpecialAutomaticMove(this, -1, 0.5, this.initTime);
		this.gameBoard.board[4][3].peca.setSpecialAutomaticMove(this, -1, 0.5, this.initTime);
		this.gameBoard.board[4][4].peca.setSpecialAutomaticMove(this, -1, 0.5, this.initTime);
		this.gameBoard.board[3][3].peca.setSpecialAutomaticMove(this, -1, 0.5, this.initTime);
		this.gameBoard.board[7][0].peca.setSpecialAutomaticMove(this, -1, 0.5, this.initTime);
		this.gameBoard.board[7][7].peca.setSpecialAutomaticMove(this, -1, 0.5, this.initTime);
		this.internalState = this.states.AUTOMATICMOVE;
	}
	
	stopSpecialAutomatic() {
			this.internalState = this.states.WAITING;
			this.ready = true;
			 
	}
	
	
	display(currTime) {
			if(this.ready) {
				this.dealwithIt();
			}
		
		
		this.currTime = currTime;
		
		this.gameBoard.display(currTime);
		this.players[0].display(currTime);
		this.players[1].display(currTime);
		this.displayPieces();
		this.crono.display(this.currTime); 
	}
	
	
	dealwithIt() {
		if(this.crono == undefined)
			this.crono = new Crono(this.scene, this.boardID, this.currTime, this);
		
		if(this.internalState != this.states.UPDATEVIEW && this.internalState != this.states.CHANGEPLAYER)	{			
			this.dealWithProlog();
									
			var id = this.scene.logPicking();
			if(id != undefined && id > 999 && id < 1004) {
				this.dealWithPieces(id);
			}else if (id != "" && id != undefined) {
				this.mouseDown(id);
			}
					
										
					
			}else if(this.internalState == this.states.UPDATEVIEW) {
				if(this.changeView.SPANTIME > this.currTime - this.changeView.INITTIME + 0.01)
					transition(this.scene, this.changeView.INITTIME, this.currTime, this.changeView.SPANTIME, this.changeView.OLDCAMERA, this.changeView.NEWCAMERA);
				else {
					this.internalState = this.changeView.OLDSTATE;
					
				}
					
			}
		
	}
	
	dealWithPieces(id)    {
		
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
			break;	
		}
	
	
	
}
	
	
	
	
	displayPieces() {
		for(var i = 0; i < this.piecesToPickk.length; i++) {				//	piece	piece.x piece.y piece.z piece.texture
			 
			this.scene.pushMatrix();
				
				
				this.scene.translate(this.piecesToPickk[i].x, this.piecesToPickk[i].y, this.piecesToPickk[i].z);
				this.scene.rotate(-Math.PI/4, 1, 0, 0);
				
				
				this.piecesToPickk[i].texture.bind(0);
				
				this.piecesToPickk[i].piece.updateTexturesAmpli(5,5);
				this.scene.registerForPick(i + 1000, this.piecesToPickk[i].piece);
				this.piecesToPickk[i].piece.display();
				this.piecesToPickk[i].texture.unbind(0);
				
			this.scene.popMatrix();
			
			 
			
		}
		
		this.scene.clearPickRegistration();	
		
	}
	
	dealWithProlog() {
	
		
		if(theEnd ) {
			this.theEndHasArrived();
		}
		else { 		
			
			if(movesChanged && (this.tipo_de_jogo == 1 ||  (this.tipo_de_jogo == 2 && this.players[this.player].id == 'A'))){
						
							this.decodeMoves(allMoves);
							movesChanged = false;
							this.piecesToPick();
							
			}else if (!(this.tipo_de_jogo == 1 ||  (this.tipo_de_jogo == 2 && this.players[this.player].id == 'A'))){
				if(this.tipo_de_jogo == 3 && this.firstTime) {
					this.firstTime = false;
					allMoves = "[2,3,6]";
					this.bestMoveRequest();
					
				}
				if(movesChanged) {
					 
					movesChanged = false;
					this.bestMoveRequest(); 					
				}
				if(bestMoveReady) {
					bestMoveReady = false;
					this.applyBestMove();
					
				}
			}
		}
	}
	
	bestMoveRequest() {
		var stringRequest = "move(" + this.gameBoard.toString() + "," + allMoves + ","+ this.players[this.player].col + "," + this.players[this.player].row + "," + this.players[Math.abs(this.player - 1)].col + "," + this.players[Math.abs(this.player - 1)].row + "," + (this.dificuldade + 1) + ")";
		makeRequest(stringRequest, this, 1);
	}
	
	applyBestMove() {
		this.piecesAvailable = new Array();
				
		
		this.addPieceAvailable(parseInt(bestMove));
		var move = {oldX: this.players[this.player].x, oldY: this.players[this.player].y, oldZ: this.players[this.player].z, newX: this.piecesAvailable[0].x, newY: this.piecesAvailable[0].y, newZ: this.piecesAvailable[0].z }
					
		this.movesTRACK.push(new PlayerMove(this.players[this.player].id, move));
		this.noPiecesToPick();
		this.players[this.player].setAnimeOn(true, this.piecesAvailable[0].x, this.piecesAvailable[0].z, this.currTime, this);
		this.internalState = this.states.AUTOMATICMOVE;
		
	}
	
	
	
	theEndHasArrived() {
		if(this.internalState == this.states.WAITING) {
			//types: 0 -> empate, 1 -> playerA ganhou, 2 -> playerB ganhou 
			var type = 0;
			
			for(var i = 0; i < this.players.length; i++) {
				if(this.players[i].id == 'A') {
					if(this.players[i].row == 8 && this.players[i].col == 8)
						type = 1;
					this.scene.PLAYERA_RESULT++;
					
				} else {
					if(this.players[i].row == 1 && this.players[i].col == 8)
						type = 2;
					this.scene.PLAYERB_RESULT++;	
				}				
				
			}
			
			
			this.scene.state = new Transition(this.scene, new MenuFinal(this.scene, this.gameBoard, this.movesTRACK, type,  [this.cameras[0], this.cameras[3]]), this.scene.camera, this.cameras[1], this.currTime );
			
			
		}
			 
			
		
	}
	
	
	mouseDown(id) {
		
		if(this.internalState == this.states.WAITING ) {
			
			for(var i = 0; i < this.piecesAvailable.length; i++) {
				
				if(id == this.piecesAvailable[i].id) {
					
					var move = {oldX: this.players[this.player].x, oldY: this.players[this.player].y, oldZ: this.players[this.player].z, newX: this.piecesAvailable[i].x, newY: this.piecesAvailable[i].y, newZ: this.piecesAvailable[i].z }
					
					this.movesTRACK.push(new PlayerMove(this.players[this.player].id, move));
					this.noPiecesToPick();
					this.players[this.player].setAnimeOn(true, this.piecesAvailable[i].x, this.piecesAvailable[i].z, this.currTime, this);
					this.internalState = this.states.AUTOMATICMOVE;
				}
			}
			
			
			
				
		}
		
		
		
		
	}
	
	cronoAlert() {
		if(this.internalState != this.states.CHANGEPLAYER && this.ready) {
			this.noPiecesToPick();
			
			this.stopAutomatic();
		}
		else {
			this.internalState = this.states.WAITING;
		}
	}
	
	
	stopAutomatic() {
		this.internalState = this.states.WAITING;
		
		this.trocaJogador();
		this.calculaPecasDisponiveis();
				
	}
	
	rotationFinished () {
		this.internalState = this.states.WAITING;
	}
	
	calculaPecasDisponiveis() {
		if(this.tipo_de_jogo == 3 && this.firstTime) 
			return;
		
		if(this.firstTime ) {					 
			this.piecesAvailable.push(this.gameBoard.board[0][1].peca);
			this.piecesAvailable.push(this.gameBoard.board[1][1].peca);
			this.piecesAvailable.push(this.gameBoard.board[1][0].peca);
			this.firstTime = false;
			this.piecesToPick();
			
			 
			
		}else {
			// falar com prolog
			var board = this.gameBoard.toString();
			var requestString = "moves(" + board + "," + this.players[this.player].col + "," + this.players[this.player].row + "," + this.players[Math.abs(this.player - 1)].col + "," + this.players[Math.abs(this.player - 1)].row + ")";
			makeRequest(requestString, this, 0);	
			
		}
		
			
		
	}
	
	trocaJogador() {
		 
		this.testTheEnd();
		this.internalState = this.states.CHANGEPLAYER;
		
		this.player = (this.player == this.states.PLAYERA) ? this.states.PLAYERB : this.states.PLAYERA;
		this.crono.changePlayer(this.currTime);	
		
	}
	
	piecesToPick() {
		console.log("piecesToPick");
		for(var i = 0; i < this.piecesAvailable.length; i++) {
			this.piecesAvailable[i].pick = this.piecesAvailable[i].states.TOPPICK;
		}
	}
	
	noPiecesToPick() {
		for(var i = 0; i < this.piecesAvailable.length; i++) {
			this.piecesAvailable[i].pick = this.piecesAvailable[i].states.NOPICK;
		}
		
	}
	
	
	allMoves(data) {
		
		allMoves = data.target.response;
		movesChanged = true;
			
		
	}
	
	testTheEnd() {
		var stringRequest = "fim(" + this.gameBoard.toString() + "," + this.players[this.player].id + "," + this.players[this.player].col + "," + this.players[this.player].row + "," + this.players[Math.abs(this.player - 1)].id  +"," + this.players[Math.abs(this.player - 1)].col + "," + this.players[Math.abs(this.player - 1)].row + ")";
		makeRequest(stringRequest, this, 2);
		
	}
	
	
	
	bestMove(data) {
		
		bestMove = data.target.response;
		bestMoveReady = true;
	}
	
	theEnd(data) {
		if(parseInt(data.target.response) == 1)
			theEnd = true;
		
	}
	
	
	
	decodeMoves(moves) {
		if(moves[0] != "[")
			return;
		 
		this.piecesAvailable = new Array();
		
		for(var i = 0; i < moves.length; i++) {
			if( moves[i] >=  '1' && moves[i] <= '9')			
				this.addPieceAvailable(parseInt(moves[i]));
		}
		
		if(this.piecesAvailable.length == 0 && !theEnd)
			this.addPieceAvailable(5);
		
		
		
	}
	
	addPieceAvailable(move) {
		var col = this.players[this.player].col;
		var row = this.players[this.player].row;
		switch(move) {
			case 1:
				this.piecesAvailable.push(this.gameBoard.board[row][col-2].peca);				 
			break;
			case 2:
				this.piecesAvailable.push(this.gameBoard.board[row][col-1].peca);
			break;
			case 3:
				this.piecesAvailable.push(this.gameBoard.board[row][col].peca);
			break;
			case 4:
				this.piecesAvailable.push(this.gameBoard.board[row-1][col-2].peca);
			break;
			case 5:
				this.piecesAvailable.push(this.gameBoard.board[row - 1][col-1].peca);
			break;
			case 6:
				this.piecesAvailable.push(this.gameBoard.board[row-1][col].peca);
			break;
			case 7:
				this.piecesAvailable.push(this.gameBoard.board[row - 2][col-2].peca);
			break;
			case 8:
				this.piecesAvailable.push(this.gameBoard.board[row - 2][col-1].peca);
			break;
			case 9:
				this.piecesAvailable.push(this.gameBoard.board[row - 2][col].peca);
			break;
			
		}
		
		
		
	}
	
	
	
}

