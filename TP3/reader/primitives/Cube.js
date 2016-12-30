
function Cube(scene) {
	CGFobject.call(this,scene);
	this.aux = new Rectangle(scene, -0.5, -0.5, 0.5, 0.5);
};

Cube.prototype = Object.create(CGFobject.prototype);
Cube.prototype.constructor = Cube;


Cube.prototype.display = function() {

	//frente
	this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.5);
		this.aux.display();
	this.scene.popMatrix();
	
	//tras
	this.scene.pushMatrix();
		this.scene.translate(0, 0, -0.5);
		this.scene.rotate(Math.PI,0,1,0);
		this.aux.display();
	this.scene.popMatrix();

	//lado direito
	this.scene.pushMatrix();
		this.scene.translate(0.5,0,0);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.aux.display();
	this.scene.popMatrix();
	
	//lado esquerdo
	this.scene.pushMatrix();
		this.scene.translate(-0.5,0,0);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.aux.display();
	this.scene.popMatrix();
	
	//cima
	this.scene.pushMatrix();
		this.scene.translate(0,0.5,0);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.aux.display();
	this.scene.popMatrix();
	
	//baixo
	this.scene.pushMatrix();
		this.scene.translate(0,-0.5,0);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.aux.display();
	this.scene.popMatrix();
}

/**
	Does nothing, is functionality is to create "polimorphism"
*/

Cube.prototype.updateTexturesAmpli = function(length_s, length_t) {
	
};

