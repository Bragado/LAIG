function Rectangle(scene, x1, y1, x2, y2) {
	CGFobject.call(this,scene);

	this.minS=0;
	this.maxS=1;
	this.minT=0;
	this.maxT=1;
	
	this.x1 = x1;
	this.x2 = x2;
	this.y1 = y1;
	this.y2 = y2;
	
	
	this.initBuffers();
 };

Rectangle.prototype = Object.create(CGFobject.prototype);
Rectangle.prototype.constructor=Rectangle;

 /**
 * Initializes the Rectangle buffers (vertices, indices, normals and texCoords)
 */
 
 
 Rectangle.prototype.initBuffers = function() {
 	this.vertices = [
 	this.x1, this.y2, 0,
 	this.x2, this.y2, 0,
 	this.x1, this.y1, 0,
 	this.x2, this.y1, 0
 	];
    
    	this.texCoords =[
	this.minS, this.maxT,
	this.maxS, this.maxT,
	this.minS, this.minT,
	this.maxS, this.minT
	];

 	this.indices = [
 	2, 1, 0, 
 	3, 1, 2
 	];

 	
 	
 	this.normals = [
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
 	0, 0, 1
 	]; 
	
	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
 
/**
 * Updates the RectangleS amplification factors
 * @param length_s s domain amplification factor
 * @param length_t t domain amplification factor
 */ 
 
Rectangle.prototype.updateTexturesAmpli = function(length_s, length_t) {
	var ds = Math.abs(this.x1 - this.x2);
	var dt = Math.abs(this.y1 - this.y2);
	
	this.texCoords = [
			this.minS, this.minT,
			this.maxS*ds/length_s, this.minT,
			this.minS, this.maxT*dt/length_t,
     		this.maxS*ds/length_s, this.maxT*dt/length_t
     		
    ];
	
	this.updateTexCoordsGLBuffers();
	
	
};