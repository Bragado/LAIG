function CylinderSurface(scene, base, top, height, slices, stacks) {
	CGFobject.call(this,scene);

	this.base = base;
	this.top = top;
	this.height = height;
	this.slices = slices;
	this.stacks = stacks;

	this.initBuffers();
};

CylinderSurface.prototype = Object.create(CGFobject.prototype);
CylinderSurface.prototype.constructor = CylinderSurface;

CylinderSurface.prototype.initBuffers = function() {


	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];


	var thetha = (2*Math.PI) / this.slices;
	var zRatio = this.height / this.stacks;
	var radiusRatio = (this.top - this.base) / this.stacks;


	for (var stack = 0; stack <= this.stacks; stack++) {
		var z = stack * zRatio;
		var radius = this.base + stack * radiusRatio;

		for (var slice = 0; slice <= this.slices; slice++) {
			var x = radius * Math.cos(slice * thetha);
			var y = radius * Math.sin(slice * thetha);
			var s = 1 - (stack / this.stacks);
			var t = 1 - (slice / this.slices);

			this.vertices.push(x, y, z);
			this.normals.push(x, y, 0);
			this.texCoords.push(s, t);
		}
	}


	for (var stack = 0; stack < this.stacks; stack++) {
		for (var slice = 0; slice < this.slices; slice++) {
			var first = (stack * (this.slices + 1)) + slice;
			var second = first + this.slices + 1;

			this.indices.push(first, second + 1, second);
			this.indices.push(first, first + 1, second + 1);
		}
	}


	this.primitiveType = this.scene.gl.LINES;
	this.initGLBuffers();
};