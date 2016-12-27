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
		var lastPoint = this.controlPoints[this.controlPoints.length - 1];
		var almostLast = this.controlPoints[this.controlPoints.length - 2];
		
		mat4.rotateY(matrix, matrix, Math.atan2(lastPoint[0] - almostLast[0], lastPoint[2] - almostLast[2]));
		return matrix;
	}
	
	var distanciaAtual = this.distancia * t/this.time;		// distancia que percorreu até o tempo atual; this.distancia/this.time = velocidade; distanciaAtual = velocidade*dt  
	var dist = 0;											// variavel auxiliar que guarda o somatario das distancias dos pontos de controlo, esse somatiorio é inferior à distanciaAtual
	var i;
	var fracDist;											// fracDist é guardado a distancia entre dois pontos
	
	for(i = 1; i < this.controlPoints.length; i++){
		fracDist = this.calculaDistancia(this.controlPoints[i-1], this.controlPoints[i]);
		if(dist + fracDist < distanciaAtual)
			dist += fracDist;
		
		else
			break;
		
	}
	
	// calcular a posição atual na animação
	var ds = distanciaAtual - dist; 						// ds é a distancia a percorrer até atingir a posição do tempo atual
	var posicao = [];		
	var dt = ds/fracDist;									// dt é a parcela de distancia a percorrer, é a parte de distancia entre dois pontos que ainda falta percorrer
	posicao[0] = this.controlPoints[i-1][0] * (1.0 - dt) + this.controlPoints[i][0] * dt;	// quando maior dt mais perto do segundo ponto está a posição do objeto e vice-versa 
	posicao[1] = this.controlPoints[i - 1][1] * (1.0 - dt) + this.controlPoints[i][1] * dt;  
	posicao[2] = this.controlPoints[i - 1][2] * (1.0 - dt) + this.controlPoints[i][2] * dt;
	
	mat4.translate(matrix, matrix, posicao);
	
	
	// calculo da rotação xz
	var val1 = this.controlPoints[i][0] - this.controlPoints[i - 1][0];
	var val2 = this.controlPoints[i][2] - this.controlPoints[i - 1][2];
	var aux = Math.atan2(val1, val2);
	mat4.rotateY(matrix, matrix, Math.atan2(val1, val2));

	return matrix;
	
	
	
};



LinearAnimation.prototype.calculaDistancia = function(ponto1, ponto2) {
	return Math.sqrt(
		Math.pow(ponto1[0] - ponto2[0], 2 ) +
		Math.pow(ponto1[1] - ponto2[1], 2 ) +
		Math.pow(ponto1[2] - ponto2[2], 2 ));
	
};


