function Tile(scene, id, posx, posy, posz, textureRef, Peca) {
	
	if(Peca != undefined)	
		this.peca = Peca;
	else
		this.peca = null;
	
	this.scene = scene;
	this.id = id;
	this.x = posx;
	this.y = posy;
	this.z = posz;
	this.ret = new Rectangle(scene, -3, -3, 3, 3);
	
	this.states = {NOPIECE: 0, PIECE: 1, PICKING: 2, NOPICKING: 3};
	this.pick = this.states.NOPICKING;
		
	this.internalState = this.states.NOPIECE;
	
	this.texture = new CGFtexture(this.scene, textureRef);
	
}

Tile.prototype.constructor = Tile;

Tile.prototype.getPeca = function() {
	return this.peca;
};


Tile.prototype.getPeca = function() {
	return this.peca;
};

Tile.prototype.getJogador = function() {
	return this.jogador;
};


Tile.prototype.display = function(t)  {
	
	this.scene.clearPickRegistration();
	if(this.peca != null)
		this.peca.display(t);
	else {
		this.scene.pushMatrix();
		if(this.pick == this.states.PICKING)
			this.scene.registerForPick(parseInt(this.id), this.ret);  
		this.texture.bind(0);
		this.scene.translate(this.x, this.y, this.z);
		this.scene.rotate(-Math.PI/2, 1,0,0);
		this.ret.display();
		this.texture.unbind(0);
		this.scene.popMatrix();
		this.scene.clearPickRegistration();
	}	
};


Tile.prototype.setPeca = function(peca) {
	this.peca = peca;
};


Tile.prototype.setBoard = function(board) {
	this.board = board;
};


Tile.prototype.setBoard = function(jogador) {
	this.jogador = jogador;
};