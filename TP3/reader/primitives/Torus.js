function Torus(scene, inner, outer, slices, loops) {
 	CGFobject.call(this,scene);
	
	this.r = (outer-inner)/2;
	this.R = inner + this.r;
	this.slices = slices;
	this.loops = loops;
	
 	this.initBuffers();
	
	
	
 };

 Torus.prototype = Object.create(CGFobject.prototype);
 Torus.prototype.constructor = Torus;

Torus.prototype.initBuffers = function() {
 	

 	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords= [];

	// var latitudeBands = this.loops;
	
    var latitudeBands = this.loops;
	
	// var logitudeBands = this.slices;
    var longitudeBands = this.slices;
    var R = this.R;
	var r = this.r;
	
           
            for (var latNumber = 0; latNumber <= latitudeBands; latNumber++)                     
              { 

				var theta = latNumber * 2 * Math.PI / latitudeBands
                var sinTheta = Math.sin(theta);
                var cosTheta = Math.cos(theta);

                for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
                   

					var phi = longNumber * 2 * Math.PI / longitudeBands;
                    var sinPhi = Math.sin(phi);
                    var cosPhi = Math.cos(phi);
		
                    
                    //Equation used for torus
                    var x = (R + (r * cosTheta)) * cosPhi;
                    var y = (R + (r * cosTheta)) * sinPhi;
                    var z =  r* sinTheta;



                    var u = 1 - (longNumber / longitudeBands);
                    var v = 1 - (latNumber / latitudeBands);

                    this.normals.push(x);
                    this.normals.push(y);
                    this.normals.push(z);
					
                    this.texCoords.push(v); // verificar !!!
					this.texCoords.push(u);
                    
                    this.vertices.push( x);
                    this.vertices.push( y);
                    this.vertices.push( z);
                }
            }

            for (var latNumber = 0; latNumber < latitudeBands; latNumber++) {
                for (var longNumber = 0; longNumber < longitudeBands; longNumber++) {
                    var first = (latNumber * (longitudeBands + 1)) + longNumber;
                    var second = first + longitudeBands + 1;
                    	this.indices.push(first);
                    	this.indices.push(second + 1);
                    	this.indices.push(second);
                    	this.indices.push(first);
                    	this.indices.push(first + 1);
                    	this.indices.push(second + 1);
                }
            }

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
 
 
Torus.prototype.updateTexturesAmpli = function(length_s, length_t) {
	
};