
function ChessBoard(scene, du, dv, textureref, su, sv, c1, c2, cs) {
	CGFobject.call(this,scene);
	
	this.du = du;
	this.dv = dv;
	this.texture = this.scene.graph.texture[textureref][0];
	this.su = su;
	this.sv = sv;
	
	this.board = new Plane(scene, 1, 1, du*7, 7*dv);
	this.shader = new CGFshader(this.scene.gl, "shaders/flat.vert", "shaders/flat.frag");
	
	this.shader.setUniformsValues({
								  uSampler : 0,
                                  du:this.du*1.0,
								  dv:this.dv*1.0,
                                  su:this.su*1.0,
								  sv:this.sv*1.0,
								  c1:c1,
								  c2:c2,
								  cs:cs
								});
	
};

ChessBoard.prototype = Object.create(CGFobject.prototype);
ChessBoard.prototype.constructor = ChessBoard;


ChessBoard.prototype.display = function() {
  this.texture.bind(0);

  this.scene.setActiveShader(this.shader);
  this.board.display();
  this.scene.setActiveShader(this.scene.defaultShader);
  this.texture.unbind(0);
};

/**
	Does nothing, is functionality is to create "polimorphism"
*/

ChessBoard.prototype.updateTexturesAmpli = function(length_s, length_t) {
	
};
