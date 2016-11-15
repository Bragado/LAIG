function LinearAnimation(id, controlPoints, time) {
	this.init(id);
	this.time = time;
	this.controlPoints = controlPoints;		// array de arrays
	this.distancia = 0;
	
	
	
	for(var i = 0; i < this.controlPoints.length - 1; i++)
		this.distancia += this.calculaDistancia(this.controlPoints[i], this.controlPoints[i+1]);
	
	
}

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.getMatrix = function(t) {
	
	var matrix = mat4.create();
	
	if(t >= this.time){
			
		mat4.translate(matrix, matrix, this.controlPoints[this.controlPoints.length - 1]);
		var lastPoint = this.controlPoints[this.controlPoints.lenght - 1];
		var almostLast = this.controlPoints[this.controlPoints.lenght - 1];
		
		mat4.rotateY(matrix, matrix, Math.atan2(almostLast[0] - lastPoint[0], almostLast[2] - lasPoint[2]));
		return matrix;
	}
	
	var distanciaAtual = this.distancia * t/this.time;
	var dist = 0;
	var i;
	var fracDist;
	
	for(i = 0; i < this.controlPoints.length - 1; i++){
		fracDist = this.calculaDistancia(this.controlPoints[i], this.controlPoints[i+1]);
		if(dist + fracDist < distanciaAtual)
			dist += fracDist;
		
		else
			break;
		
	}
	var ds = distanciaAtual - dist;
	var posicao[0] = this.controlPoints[i][0] * (1.0 - ds/fracDist) + this.controlPoints[i+1][0] * ds/fracDist;	
	var posicao[1] = this.controlPoints[i][1] * (1.0 - ds/fracDist) + this.controlPoints[i+1][1] * ds/fracDist;  
	var posicao[2] = this.controlPoints[i][2] * (1.0 - ds/fracDist) + this.controlPoints[i+1][2] * ds/fracDist;
	
	mat4.translate(matrix, matrix, posicao);
	
	
	var val1 = this.controlPoints[i][0] - this.controlPoints[i+1][0];
	var val2 = this.controlPoints[i][2] - this.controlPoints[i+1][2];
	
	mat4.rotateY(matrix, matrix, Math.atan2(val1, val2));

	return matrix;
	
	
	
};



LinearAnimation.prototype.calculaDistancia = function(ponto1, ponto2) {
	return Math.sqrt(
		Math.pow(this.ponto1[0] - this.ponto2[0], 2 ) +
		Math.pow(this.ponto1[1] - this.ponto2[1], 2 ) +
		Math.pow(this.ponto1[2] - this.ponto2[2], 2 );
	
};


