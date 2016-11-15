function Sphere(scene, radius, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;
	this.radius = radius;
 	this.initBuffers();
 };

Sphere.prototype = Object.create(CGFobject.prototype);
Sphere.prototype.constructor = Sphere;

/**
 * Initializes the Sphere buffers (vertices, indices, normals and texCoords)
 */


Sphere.prototype.initBuffers = function() {
 	

 	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];

var j=0;
var angle=2*Math.PI/this.slices;
var angle2=Math.PI/this.stacks;

for(j;j<this.stacks;j++)
{
	 
 	for(var j = 0; j <= this.slices; j++)
 	{
 		for(var i = 0; i <= this.stacks; i++)
 		{
 			var aux = Math.PI-angle2*i;
			var x = Math.sin(aux)*Math.cos(j*angle);
			var y = Math.sin(aux)*Math.sin(j*angle);
			var z = Math.cos(aux);	

			this.vertices.push( Math.sin(aux)*Math.cos(j*angle)*this.radius,
					Math.sin(aux)*Math.sin(j*angle)*this.radius,	
					Math.cos(aux)*this.radius );
			this.normals.push( Math.sin(aux) * Math.cos(j*angle),
					Math.sin(aux) * Math.sin(j*angle),	
					Math.cos(aux) );
			this.texCoords.push( j/this.slices,
					1 - i/this.stacks );
			
			if(i > 0 && j > 0) {
					var vs = this.vertices.length/3;
					this.indices.push(vs-2, vs-1, vs-this.stacks-2);
					this.indices.push(vs-this.stacks-2, vs-this.stacks-3, vs-2);
			}
 		}
 	}
}
     
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
 
 
/**
	Does nothing, is functionality is to create "polimorphism"
*/

Sphere.prototype.updateTexturesAmpli = function(length_s, length_t) {
	
};