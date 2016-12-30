
function Cruz(scene) {
	CGFobject.call(this,scene);
	this.aux = new Cube(scene);
};

Cruz.prototype = Object.create(CGFobject.prototype);
Cruz.prototype.constructor = Cruz;


Cruz.prototype.display = function() {

	//lado1
	this.scene.pushMatrix();
		this.scene.rotate(Math.PI/4, 0, 0, 1);
		this.scene.scale(4,1,0.5);
		this.aux.display();
	this.scene.popMatrix();
	
	//lado2
	this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/4, 0, 0, 1);
		this.scene.scale(4,1,0.5);
		this.aux.display();
	this.scene.popMatrix();
	
}

/**
	Does nothing, is functionality is to create "polimorphism"
*/

Cruz.prototype.updateTexturesAmpli = function(length_s, length_t) {
	
};

