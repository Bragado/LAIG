function Vehicle(scene) {
	CGFobject.call(this,scene);

	this.corpo_controlPoints = this.getCorpo();
	this.frente_controlPoints = this.getFrente();
	this.tras_controlPoints = this.getTras();
	this.asaTras_controlPoints = this.getAsaTras();
	this.asa_controlPoints = this.getAsa();
	this.motor_controlPoints = this.getMotor();
	
	this.corpo = new Patch(this.scene,this.corpo_controlPoints["orderU"], this.corpo_controlPoints["orderV"], this.corpo_controlPoints["partsU"], this.corpo_controlPoints["partsV"], this.corpo_controlPoints["controlPoints"]);
	this.frente = new Patch(scene,this.frente_controlPoints["orderU"], this.frente_controlPoints["orderV"], this.frente_controlPoints["partsU"], this.frente_controlPoints["partsV"], this.frente_controlPoints["controlPoints"]);
	this.tras = new Patch(scene,this.tras_controlPoints["orderU"], this.tras_controlPoints["orderV"], this.tras_controlPoints["partsU"], this.tras_controlPoints["partsV"], this.tras_controlPoints["controlPoints"]);
	this.asaTras = new Patch(scene,this.asaTras_controlPoints["orderU"], this.asaTras_controlPoints["orderV"], this.asaTras_controlPoints["partsU"], this.asaTras_controlPoints["partsV"], this.asaTras_controlPoints["controlPoints"]);
	this.asa = new Patch(scene,this.asa_controlPoints["orderU"], this.asa_controlPoints["orderV"], this.asa_controlPoints["partsU"], this.asa_controlPoints["partsV"], this.asa_controlPoints["controlPoints"]);
	this.motor = new Patch(scene,this.motor_controlPoints["orderU"], this.motor_controlPoints["orderV"], this.motor_controlPoints["partsU"], this.motor_controlPoints["partsV"], this.motor_controlPoints["controlPoints"]);
	 
	
	 
	this.mat = new CGFappearance(scene);
	this.text1 = new CGFtexture(this.scene, "../resources/tap.png");
	this.text2 = new CGFtexture(this.scene, "../resources/branco.png");
	this.text3 = new CGFtexture(this.scene, "../resources/branco_asas.png");
	this.text4 = new CGFtexture(this.scene, "../resources/branco_motor.png");
	this.text5 = new CGFtexture(this.scene, "../resources/cockpit.png");
	this.text6 = new CGFtexture(this.scene, "../resources/plane.png");

	 
}

Vehicle.prototype = Object.create(CGFobject.prototype);
Vehicle.prototype.constructor = Vehicle;

Vehicle.prototype.getCorpo = function() 
{
	var corpo_controlPoints = [];
	corpo_controlPoints["orderU"] = 5;
	corpo_controlPoints["orderV"] = 5;
	corpo_controlPoints["partsU"] = 20;
	corpo_controlPoints["partsV"] = 20;
	corpo_controlPoints["controlPoints"] = [
		[0,-1,0,1],
		[-1,-1,0,1],
		[-1,1,0,1],
		[1,1,0,1],
		[1,-1,0,1],
		[0,-1,0,1],

		[0,-1,0.4,1],
		[-1,-1,0.4,1],
		[-1,1,0.4,1],
		[1,1,0.4,1],
		[1,-1,0.4,1],
		[0,-1,0.4,1],

		[0,-1,0.8,1],
		[-1,-1,0.8,1],
		[-1,1,0.8,1],
		[1,1,0.8,1],
		[1,-1,0.8,1],
		[0,-1,0.8,1],

		[0,-1,1.2,1],
		[-1,-1,1.2,1],
		[-1,1,1.2,1],
		[1,1,1.2,1],
		[1,-1,1.2,1],
		[0,-1,1.2,1],


		[0,-1,1.6,1],
		[-1,-1,1.6,1],
		[-1,1,1.6,1],
		[1,1,1.6,1],
		[1,-1,1.6,1],
		[0,-1,1.6,1],


		[0,-1,2.0,1],
		[-1,-1,2.0,1],
		[-1,1,2.0,1],
		[1,1,2.0,1],
		[1,-1,2.0,1],
		[0,-1,2.0,1]
	];
	return corpo_controlPoints;
};

Vehicle.prototype.getFrente = function() 
{
	var frente_controlPoints = [];
	frente_controlPoints["orderU"] = 5;
	frente_controlPoints["orderV"] = 5;
	frente_controlPoints["partsU"] = 20;
	frente_controlPoints["partsV"] = 20;
	frente_controlPoints["controlPoints"] = [
		[0.003,-0.641,0.317,1],
		[-0.002,-0.637,0.317,1],
		[0.007,-0.649,0.321,1],
		[0.007,-0.634,0.317,1],
		[0.003,-0.638,0.316,1],
		[0.004,-0.640,0.317,1],

		[0.000,-1.000,0.400,1],
		[-1.000,-1.000,0.400,1],
		[-1.001,-0.035,0.390,1],
		[0.999,-0.039,0.394,1],
		[1.000,-1.000,0.400,1],
		[0.000,-1.000,0.400,1],

		[0.000,-1.000,0.800,1],
		[-1.000,-1.000,0.800,1],
		[-1.001,0.164,0.792,1],
		[0.999,0.164,0.797,1],
		[1.000,-1.000,0.800,1],
		[0.000,-1.000,0.800,1],

		[0.000,-1.000,1.200,1],
		[-1.000,-1.000,1.200,1],
		[-1.000,0.661,1.201,1],
		[1.000,0.648,1.200,1],
		[1.000,-1.000,1.200,1],
		[0.000,-1.000,1.200,1],

		[0.000,-1.000,1.600,1],
		[-1.000,-1.000,1.600,1],
		[-0.999,0.982,1.579,1],
		[1.001,0.978,1.579,1],
		[1.000,-1.000,1.600,1],
		[0.000,-1.000,1.600,1],

		[0.000,-1.000,2.000,1],
		[-1.000,-1.000,2.000,1],
		[-1.000,1.000,2.000,1],
		[1.000,1.000,2.000,1],
		[1.000,-1.000,2.000,1],
		[0.000,-1.000,2.000,1]
	];
	return frente_controlPoints;
};

Vehicle.prototype.getTras = function() 
{
	var tras_controlPoints = [];
	tras_controlPoints["orderU"] = 5;
	tras_controlPoints["orderV"] = 5;
	tras_controlPoints["partsU"] = 20;
	tras_controlPoints["partsV"] = 20;
	tras_controlPoints["controlPoints"] = [
		[-0.048,-0.751,0.005,1],
		[-0.048,-0.749,0.003,1],
		[-0.048,-0.749,0.002,1],
		[-0.048,-0.745,0.005,1],
		[-0.048,-0.747,0.000,1],
		[-0.048,-0.749,0.002,1],

		[0.000,-1.000,0.400,1],
		[-1.000,-1.000,0.400,1],
		[-1.000,0.322,0.402,1],
		[1.000,0.325,0.403,1],
		[1.000,-1.000,0.400,1],
		[0.000,-1.000,0.400,1],

		[0.000,-1.000,0.800,1],
		[-1.000,-1.000,0.800,1],
		[-1.000,0.341,0.798,1],
		[1.000,0.346,0.794,1],
		[1.000,-1.000,0.800,1],
		[0.000,-1.000,0.800,1],

		[0.000,-1.000,1.200,1],
		[-1.000,-1.000,1.200,1],
		[-1.000,0.491,1.194,1],
		[1.000,0.491,1.194,1],
		[1.000,-1.000,1.200,1],
		[0.000,-1.000,1.200,1],

		[0.000,-1.000,1.600,1],
		[-1.000,-1.000,1.600,1],
		[-1.000,0.998,1.601,1],
		[1.000,0.998,1.602,1],
		[1.000,-1.000,1.600,1],
		[0.000,-1.000,1.600,1],

		[0.000,-1.000,2.000,1],
		[-1.000,-1.000,2.000,1],
		[-1.000,1.000,2.000,1],
		[1.000,1.000,2.000,1],
		[1.000,-1.000,2.000,1],
		[0.000,-1.000,2.000,1]
	];
	return tras_controlPoints;
}

Vehicle.prototype.getAsa = function() 
{
	var asa_controlPoints = [];
	asa_controlPoints["orderU"] = 5;
	asa_controlPoints["orderV"] = 5;
	asa_controlPoints["partsU"] = 20;
	asa_controlPoints["partsV"] = 20;
	asa_controlPoints["controlPoints"] = [
		[0.009,-2.737,0.222,1],
		[0.064,-0.996,0.260,1],
		[-0.009,-2.746,0.222,1],
		[0.064,-0.959,0.257,1],
		[0.057,-0.988,0.255,1],
		[0.012,-2.726,0.226,1],

		[0.014,-2.727,0.385,1],
		[-0.646,-2.844,0.368,1],
		[-0.997,-2.028,0.405,1],
		[1.012,-0.431,0.397,1],
		[1.000,-1.000,0.400,1],
		[-0.003,-2.727,0.385,1],

		[0.006,-2.732,0.785,1],
		[-0.660,-2.471,0.802,1],
		[-1.000,-1.404,0.800,1],
		[0.988,0.036,0.793,1],
		[1.000,-1.000,0.800,1],
		[0.001,-2.723,0.785,1],

		[-0.003,-2.737,1.184,1],
		[-0.674,-2.164,1.202,1],
		[-1.000,-0.746,1.200,1],
		[0.987,0.513,1.196,1],
		[1.000,-1.000,1.200,1],
		[0.001,-2.737,1.185,1],

		[-0.002,-2.770,2.762,1],
		[-0.664,-1.040,2.845,1],
		[-0.998,0.995,2.846,1],
		[0.987,2.158,2.831,1],
		[1.001,-1.013,2.838,1],
		[-0.002,-2.752,2.767,1],

		[-0.022,-2.809,3.474,1],
		[-0.710,-1.068,3.478,1],
		[-1.006,0.978,3.465,1],
		[0.989,2.115,3.481,1],
		[1.001,-1.018,3.475,1],
		[-0.004,-2.802,3.454,1]
	];
	return asa_controlPoints;
}

Vehicle.prototype.getAsaTras = function() 
{
	var asaTras_controlPoints = [];
	asaTras_controlPoints["orderU"] = 5;
	asaTras_controlPoints["orderV"] = 5;
	asaTras_controlPoints["partsU"] = 20;
	asaTras_controlPoints["partsV"] = 20;
	asaTras_controlPoints["controlPoints"] = [
		[-0.254,-0.659,-1.045,1],
		[-0.987,-0.643,-1.052,1],
		[-0.268,-0.645,-1.063,1],
		[0.305,-0.652,-1.050,1],
		[0.307,-0.654,-1.059,1],
		[-0.256,-0.659,-1.043,1],

		[-0.013,-1.000,-0.365,1],
		[-0.987,-1.000,-0.384,1],
		[-0.996,0.008,-0.374,1],
		[0.984,-0.005,-0.386,1],
		[0.987,-1.000,-0.384,1],
		[-0.019,-1.000,-0.358,1],

		[0.000,-0.949,0.794,1],
		[-1.000,-0.949,0.800,1],
		[-1.003,-0.281,0.822,1],
		[0.997,-0.272,0.819,1],
		[1.000,-0.955,0.800,1],
		[0.000,-0.955,0.800,1],

		[0.010,-0.874,1.194,1],
		[-1.000,-0.942,1.200,1],
		[-1.003,-0.277,1.205,1],
		[0.997,-0.273,1.205,1],
		[1.000,-0.955,1.206,1],
		[-0.034,-0.907,1.198,1],

		[-0.045,-1.000,2.416,1],
		[-0.987,-1.000,2.409,1],
		[-0.977,0.004,2.407,1],
		[1.016,-0.005,2.409,1],
		[1.025,-1.000,2.397,1],
		[-0.045,-1.000,2.409,1],

		[-0.368,-0.611,3.026,1],
		[-0.997,-0.633,3.046,1],
		[-0.359,-0.623,3.023,1],
		[0.287,-0.639,3.030,1],
		[0.296,-0.645,3.026,1],
		[-0.370,-0.612,3.031,1]
	];
	return asaTras_controlPoints;

}

Vehicle.prototype.getMotor = function() 
{
	var motor_controlPoints = [];
	motor_controlPoints["orderU"] = 5;
	motor_controlPoints["orderV"] = 5;
	motor_controlPoints["partsU"] = 20;
	motor_controlPoints["partsV"] = 20;
	motor_controlPoints["controlPoints"] = [
		[0.009,-0.317,0.879,1],
		[-0.027,-0.353,0.823,1],
		[-0.001,-0.366,0.881,1],
		[-0.027,-0.357,0.841,1],
		[-0.014,-0.348,0.823,1],
		[-0.005,-0.348,0.880,1],

		[0.000,-1.000,0.400,1],
		[-1.000,-1.000,0.400,1],
		[-1.000,1.000,0.400,1],
		[1.000,1.000,0.400,1],
		[1.000,-1.000,0.400,1],
		[0.000,-1.000,0.400,1],

		[0.000,-1.000,0.800,1],
		[-1.000,-1.000,0.800,1],
		[-1.000,1.000,0.800,1],
		[1.000,1.000,0.800,1],
		[1.000,-1.000,0.800,1],
		[0.000,-1.000,0.800,1],

		[0.000,-1.000,1.200,1],
		[-1.000,-1.000,1.200,1],
		[-1.000,1.000,1.200,1],
		[1.000,1.000,1.200,1],
		[1.000,-1.000,1.200,1],
		[0.000,-1.000,1.200,1],

		[0.000,-1.000,1.600,1],
		[-1.000,-1.000,1.600,1],
		[-1.000,1.000,1.600,1],
		[1.000,1.000,1.600,1],
		[1.000,-1.000,1.600,1],
		[0.000,-1.000,1.600,1],

		[-0.042,-0.270,2.546,1],
		[-0.046,-0.270,2.551,1],
		[-0.044,-0.261,2.559,1],
		[-0.040,-0.257,2.550,1],
		[-0.049,-0.245,2.554,1],
		[-0.046,-0.255,2.544,1]
	];
	return motor_controlPoints;
}

Vehicle.prototype.display = function() 
{
	//this.mat.setTexture(null);
	this.mat.apply();

	//cockpit
	this.scene.pushMatrix();
		this.scene.translate(10,15,4);
		this.scene.scale(5,6,8);
		this.mat.setTexture(this.text5);
		this.mat.apply();
		this.frente.display();
	this.scene.popMatrix();

	//corpo do aviao
	this.scene.pushMatrix();
		this.scene.translate(10,15,20);
		this.scene.scale(5,6,17);
		this.mat.setTexture(this.text6);
		this.mat.apply();
		this.corpo.display();
	this.scene.popMatrix();
	
	//traseira do aviao
	this.scene.pushMatrix();
		this.scene.translate(10,10.5,63.8);
		this.scene.scale(5,6,5);
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.rotate(Math.PI,0,0,1);
		this.mat.setTexture(this.text2);
		this.mat.apply();
		this.tras.display();
	this.scene.popMatrix();
	
	//asa horizontal traseira
	this.scene.pushMatrix();
		this.scene.translate(6,16,60);
		this.scene.scale(4,2,2.5);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.mat.setTexture(this.text3);
		this.mat.apply();
		this.asaTras.display();
	this.scene.popMatrix();
	
	//asa vertical traseira
	this.scene.pushMatrix();
		this.scene.translate(10,22.5,58);
		this.scene.scale(0.5,2,1.2);
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.mat.setTexture(this.text1);
		this.mat.apply();
		this.asa.display();
	this.scene.popMatrix();
	
	//asa da direita
	this.scene.pushMatrix();
		this.scene.translate(40,11,31);
		this.scene.scale(8,2,3);
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.mat.setTexture(this.text3);
		this.mat.apply();
		this.asa.display();
	this.scene.popMatrix();
	
	//lateral da asa da direita
	this.scene.pushMatrix();
		this.scene.translate(38.5,16.2,36);
		this.scene.scale(0.5,1.5,1.2);
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.mat.setTexture(this.text1);
		this.mat.apply();
		this.asa.display();
	this.scene.popMatrix();
	
	//asa da esquerda
	this.scene.pushMatrix();
		this.scene.translate(-20,11,31);
		this.scene.scale(8,2,3);
		this.scene.rotate(-Math.PI/2,0,0,1);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.mat.setTexture(this.text3);
		this.mat.apply();
		this.asa.display();
	this.scene.popMatrix();
	
	//lateral da asa da esquerda
	this.scene.pushMatrix();
		this.scene.translate(-18.5,16.2,36);
		this.scene.scale(0.5,1.5,1.2);
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.mat.setTexture(this.text1);
		this.mat.apply();
		this.asa.display();
		
	this.scene.popMatrix();
	
	//motor esquerda
	this.scene.pushMatrix();
		this.scene.translate(3,10,24);
		this.scene.scale(3.5,3.5,5);
		this.mat.setTexture(this.text4);
		this.mat.apply();
		this.motor.display();
	this.scene.popMatrix();
	
	//motor direita
	this.scene.pushMatrix();
		this.scene.translate(17,10,24);
		this.scene.scale(3.5,3.5,5);
		this.mat.setTexture(this.text4);
		this.mat.apply();
		this.motor.display();
	this.scene.popMatrix();
		
}

/**
	Does nothing, is functionality is to create "polimorphism"
*/

Vehicle.prototype.updateTexturesAmpli = function(length_s, length_t) {
	
};
