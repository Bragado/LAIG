class Filme_State {
	constructor(scene, cameraPrincipal, gameBoard, movesTrack) {
		this.scene = scene;
		this.cameraPrincipal = cameraPrincipal;
		this.gameBoard = gameBoard;
		this.count = 0;
		this.movesTrack = movesTrack;
		
		this.players = [];	
		this.states = {AUTOMATICMOVE: 0, NOMOVE: 1};
		this.internalState = this.states.NOMOVE;
		this.players.push( new jogadorPeca(this.scene, 'A', this.gameBoard.board[0][0].peca.x , this.gameBoard.board[0][0].peca.y + 3, this.gameBoard.board[0][0].peca.z, 1, 1));
		this.players.push( new jogadorPeca(this.scene, 'B', this.gameBoard.board[7][0].peca.x , this.gameBoard.board[7][0].peca.y + 3, this.gameBoard.board[7][0].peca.z, 1, 1));
		this.test = 0;
		this.currTime;
	}
	
	display(currTime) {
		this.test++;
		this.currTime = currTime;
		
		if(this.internalState == this.states.NOMOVE && this.test > 80) {
			if(this.count >= this.movesTrack.length) {
				this.theEnd();
			} else {
			
			var move = this.movesTrack[this.count];
			this.players[this.count%2].setAnimeOn(true, move.xNew, move.zNew, this.currTime, this);
			this.internalState = this.states.AUTOMATICMOVE;
			}
		}
		
		
		this.gameBoard.display(currTime);
		this.players[0].display(currTime);
		this.players[1].display(currTime);
		
		
	}
	
	stopAutomatic() {
		this.internalState = this.states.NOMOVE;
		
		this.count++;
	}
	
	theEnd() {
		this.scene.state = new Transition(this.scene, new MenuPrincipal(this.scene, "chess1", 1), this.scene.camera, this.cameraPrincipal, this.currTime);
	}

}