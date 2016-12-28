var allMoves = "";
var movesChanged = false;
var bestMoveReady = false;
var bestMove = "";


class EmJogo_State {
	
	constructor(scene, Board, dificuldade, tipo_de_jogo, currTime, players) {
		
		this.scene = scene;
		this.initTime = currTime;
		this.dificuldade = dificuldade;
		this.gameBoard = Board;
		this.tipo_de_jogo = tipo_de_jogo;
		
		this.states = { PLAYERA: 0, PLAYERB: 1, WAITING: 2, AUTOMATICMOVE: 3, ALLMOVES:4, BESTMOVE: 5 };
		
		this.internalState = this.states.WAITING;
		this.player = this.states.PLAYERA;
		this.prolog_Answer = this.states.ALLMOVES;
		
		this.players = players;
		
		this.movesTRACK = [];
		
		this.piecesAvailable = new Array();
		this.firstTime = true;
		this.calculaPecasDisponiveis();
		
		var sstr = Board.toString();
		
	}
	
	
	display(currTime) {
		
		if(movesChanged) {
			this.decodeMoves(allMoves);
			movesChanged = false;
			if (this.tipo_de_jogo == 1 || (this.tipo_de_jogo == 2 && this.players[this.player].id) == 'A') {
				this.piecesToPick();
			}
				
			
			else {
				// chamar a best move e executar
				
			}
		}
		
		var id = this.scene.logPicking();
		this.scene.clearPickRegistration();
		if (id != "" && id != undefined) {
			this.mouseDown(id);
		}
		
		
		this.currTime = currTime;
		
		this.gameBoard.display(currTime);
		this.players[0].display(currTime);
		this.players[1].display(currTime);
		
	}
	
	
	
	mouseDown(id) {
		
		if(this.internalState == this.states.WAITING) {
			
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
	
	stopAutomatic() {
		this.internalState = this.states.WAITING;
		this.trocaJogador();
		this.calculaPecasDisponiveis();
				
	}
	
	rotationFinished () {
		this.internalState = this.states.WAITING;
	}
	
	calculaPecasDisponiveis() {
		if(this.firstTime) {					// #TODO fazer o método special pieces 
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
		// programar o cronometro 
		this.player = (this.player == this.states.PLAYERA) ? this.states.PLAYERB : this.states.PLAYERA;
			
		
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
	
	
	bestMove(data) {
		
		
	}
	
	
	
	decodeMoves(moves) {
		//replace(/t/g,"");
		this.piecesAvailable = new Array();
		
		for(var i = 0; i < moves.length; i++) {
			if( moves[i] >=  '1' && moves[i] <= '9')			
				this.addPieceAvailable(parseInt(moves[i]));
		}
		
		
		
	}
	
	addPieceAvailable(move) {
		var col = this.players[this.player].col;
		var row = this.players[this.player].row;
		switch(move) {
			case 1:
				col--;
				row++;
			break;
			case 2:
				row++;
			break;
			case 3:
				col++;
				row++;
			break;
			case 4:
				col--;
			break;
			case 6:
				col++;
			break;
			case 7:
				row--;
				col--;
			break;
			case 8:
				row--;
			break;
			case 9:
				row--;
				col++;
			break;
			
		}
		
		this.piecesAvailable.push(this.gameBoard.board[row-1][col-1].peca);
		
	}
	
	
	
}

