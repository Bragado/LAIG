#ifdef GL_ES
precision highp float;
#endif


varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform vec4 c1;
uniform vec4 c2;
uniform vec4 cs;
uniform float du;
uniform float dv;
uniform float su;
uniform float sv;



void main() {
	
	vec4 colorT = texture2D(uSampler, vTextureCoord);
	
	float x = floor(du*vTextureCoord.s);
	float y = floor(dv*vTextureCoord.t);
	
	// caso seja a quadricula em questao
	if( (vTextureCoord.s >= su/du)  && (vTextureCoord.s <  (su + 1.0)/du ) &&  (vTextureCoord.t >= sv/dv)  && (vTextureCoord.t <  (sv + 1.0)/dv) ){
	
			gl_FragColor = colorT * cs;
	
	}
	else{	// alternar as cores das quadriculas
		if( mod((x + y), 2.0) == 0.0){
			gl_FragColor = colorT * c1;	
		}
		else{
			gl_FragColor = colorT * c2;
		}
	
	
	}
	
	
	

}