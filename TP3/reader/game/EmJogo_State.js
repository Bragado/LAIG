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
					this.noPiecesToPick()
					setAnimeOn(true, this.piecesAvailable[i].x, this.piecesAvailable[i].z, this.currTime);
					this.internalState = this.states.AUTOMATICMOVE;
				}
			}
			
			
			
				
		}
		
		
		
		
	}
	
	stopAutomatic() {
		
		this.trocaDeJogador();
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
			this.piecesToPick();
		}else {
			// falar com prolog
			var board = this.gameBoard.toString();
			var requestString = "moves(" + board + "," + this.players[this.player].row + "," + this.players[this.player].col + "," + this.player[Math.abs(this.player - 1)].row + "," + this.player[Math.abs(this.player - 1)].col;
			//makerequest(requestString, this);	
			
		}
		
			
		
	}
	
	trocaJogador() {
		// programar o cronometro 
		this.player = (this.player == this.states.PLAYERA) ? this.states.PLAYERB : this.states.PLAYERA;
			
		
	}
	
	piecesToPick() {
		for(var i = 0; i < this.piecesAvailable.length; i++) {
			this.piecesAvailable[i].pick = this.piecesAvailable[i].states.TOPPICK;
		}
	}
	
	noPiecesToPick() {
		for(var i = 0; i < this.piecesAvailable.length; i++) {
			this.piecesAvailable[i].pick = this.piecesAvailable[i].states.NOPICK;
		}
		
	}
	
	
	prologAnswer(data) {
		if (this.prolog_Answer == this.states.ALLMOVES) {
			var moves = data.target.response;
			this.decodeMoves(moves);
			
			
			if(tipo_de_jogo > 0 && this.players[this.player].id == 'B') {				// verificar se também é o player B
				this.prolog_Answer = this.states.BESTMOVE;
				// make request for best move
				return;	
			}
			
			this.piecesToPick();
			
		} else {
			// transcreve o melhor move
			this.prolog_Answer = this.states.ALLMOVES;
		}
		
	}
	
	decodeMoves(moves) {
		//replace(/t/g,"");
		
		
		for(var i = 0; i < moves.length; i++) {
			if( moves[i] >=  '1' && moves[i] <= '9')			
				addPieceAvailable(parseInt(moves[i]));
		}
		
		
		
	}
	
	addPieceAvailable(move) {
		var col = this.players[this.player].col;
		var row = this.players[this.player].col;
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

