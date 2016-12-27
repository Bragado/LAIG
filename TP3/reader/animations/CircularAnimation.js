CircularAnimation.prototype = new Animation();

function CircularAnimation(id, center, radius, anguloInicial, anguloRotacao, time) {
	this.init(id);
	this.time = time;
	this.center = center;
	this.radius = radius;
	this.anguloInicial = anguloInicial;
	this.anguloRotacao = anguloRotacao;
}

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;


CircularAnimation.prototype.getMatrix = function(t) {
	var matrix = mat4.create();
	
	if (t > this.time) t = this.time;
	
	mat4.translate(matrix, matrix, this.center);
	
	mat4.rotateY(matrix, matrix, this.anguloInicial + (t / this.time) * this.anguloRotacao);
	mat4.translate(matrix, matrix, [this.radius, 0, 0]);
//	if(this.anguloRotacao > 0)
	//	mat4.rotateY(matrix, matrix, Math.PI);
	return matrix;
}