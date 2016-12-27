#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float du;
uniform float dv;
uniform float su;
uniform float sv;

varying vec2 vTextureCoord;


void main() {

	if( (aTextureCoord.s >= su/du)  && (aTextureCoord.s <  (su + 1.02)/du) &&  (aTextureCoord.t >= sv/dv)  && (aTextureCoord.t <  (sv + 1.02)/dv) )
		gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x, aVertexPosition.y, aVertexPosition.z + 1.0, 1.0);
	else
		gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x, aVertexPosition.y ,aVertexPosition.z, 1.0);
		
	vTextureCoord = aTextureCoord;	

}