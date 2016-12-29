#ifdef GL_ES
precision highp float;
#endif


varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform vec4 cs;




void main() {
	
	vec4 colorT = texture2D(uSampler, vTextureCoord);
	
	
	gl_FragColor = colorT * cs;
	
	
}