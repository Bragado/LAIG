function CylinderBase(scene, radius, slices) {
	CGFobject.call(this,scene);

	this.radius = radius;
	this.slices = slices;

	this.initBuffers();
};

CylinderBase.prototype = Object.create(CGFobject.prototype);
CylinderBase.prototype.constructor = CylinderBase;

CylinderBase.prototype.initBuffers = function() {


	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];


	var ang = (2*Math.PI) / this.slices;
	var start = 1;
	var texCenter;
	

	// Circle center
	this.vertices.push(0, 0, 0);
	this.normals.push(0, 0, 1);
	this.texCoords.push(0.5, 0.5);


	for (var slice = 0; slice <= this.slices; slice++) {
		var x = Math.cos(slice * ang);
		var y = Math.sin(slice * ang);

		this.vertices.push(this.radius * x, this.radius * y, 0);
		this.normals.push(0, 0, 1);
		this.texCoords.push(0.5 + 0.5 * x, 0.5 - 0.5 * y);

		if (slice > 1)
			this.indices.push(start++, start, 0);
	}

	this.indices.push(0, start, 1);


	this.primitiveType = this.scene.gl.LINES;
	this.initGLBuffers();
};