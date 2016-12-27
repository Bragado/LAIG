class Board {
	
	constructor(scene){
		
		this.scene = scene;
		
		this.complete = false;
	
		this.board = new Array(8);
		for (var i = 0; i < this.board.length; i++)
			this.board[i] = new Array(8);
				
	}
	
	getTile(col, row) {
		return this.board[row][col];
	}
	
	changeState(bool) {
		this.complete = bool;
	}
	
	display(currTime) {
		/*
			Faz o display de cada peça 

		*/	
		for(var i = 0; i < this.board.length; i++)
			for(var j = 0; j < this.board.length; j++)
					this.board[i][j].display(currTime);

		/* Faz o display das peças do jogador */			
		
		this.testComplete();	
	}
	
	
	testComplete() {
		if(this.complete)
			return;
		this.complete = true;
		
		for(var i = 0; i < this.board.length; i++) {
			
			for(var j = 0; j < this.board.length; j++) {
				if(this.board[i][j].internalState == this.board[i][j].states.NOPIECE) {
					this.complete = false;
					break;
				}
					
			}
		}
		
	}
	
	toString() {
		var ret = "[";	
		
		for(var i = 0; i < this.board.length; i++) {
			ret +="[";
			
			for(var j = 0; j < this.board.length; j++) {
				if(j == this.board.length - 1) {
						ret += this.scene.pieces[this.board[i][j].peca.id];
				}
				
				else 
				ret += this.scene.pieces[this.board[i][j].peca.id] + ",";
				
				
			}
			
			
			ret +="]";
			
			if(i != this.board.length - 1)
				ret +=",";
			
		}
		
		return ret + "]";
	}
	
	
}

