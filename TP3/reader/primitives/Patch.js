

function Patch(scene, orderU, orderV, partsU, partsV, controlPoints) {
	
	this.orderU = orderU;
	this.orderV = orderV;
	this.partsU = partsU;
	this.partsV = partsV;
	this.controlPoints = controlPoints;
	
	var controlvertexes = new Array();
	
	for(var i = 0; i <= this.orderU; i++) {
		var controlverts= new Array();
		
		for(var j = 0; j <= this.orderV; j++){
			var index = j + i*(this.orderV + 1);
			var point = this.controlPoints[index];
			controlverts.push(point);
			
		}
		
		controlvertexes.push(controlverts);
	}
	
	
	var knots1 = this.getKnotsVector(this.orderU); // to be built inside webCGF in later versions ()
	var knots2 = this.getKnotsVector(this.orderV); // to be built inside webCGF in later versions
		
	var nurbsSurface = new CGFnurbsSurface(this.orderU, this.orderV, knots1, knots2, controlvertexes); // TODO  (CGF 0.19.3): remove knots1 and knots2 from CGFnurbsSurface method call. Calculate inside method.
	var getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	
		
	CGFnurbsObject.call(this, scene, getSurfacePoint, this.partsU, this.partsV);
	this.primitiveType = this.scene.gl.LINES;
	
}


Patch.prototype = Object.create(CGFnurbsObject.prototype);
Patch.prototype.constructor=Patch;




Patch.prototype.getKnotsVector = function(degree) { // TODO (CGF 0.19.3): add to CGFnurbsSurface
	
	var v = new Array();
	for (var i=0; i<=degree; i++) {
		v.push(0);
	}
	for (var i=0; i<=degree; i++) {
		v.push(1);
	}
	return v;
};


Patch.prototype.updateTexturesAmpli = function(length_s, length_t) {
	
};
