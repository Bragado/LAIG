class Transition {
	
	constructor(scene, state, oldCamera, newCamera, currTime) {
		
		this.scene = scene;
		this.state = state;
		this.oldCamera = oldCamera;
		this.newCamera = newCamera;
		
		this.spanTime = 1.5;
		this.currTime = currTime;
		
	}
	
	
	display(currTime) {
		if(currTime > this.currTime + this.spanTime) {
			this.scene.camera = this.newCamera;
			this.scene.graph.interface.setActiveCamera(this.newCamera);
			this.scene.state = this.state;
		}else {
			
			var dt = (currTime - this.currTime)/this.spanTime;
			
			var angle = (1.0-dt)*this.oldCamera.fov + dt*this.newCamera.fov;
			
			var fx = (1.0-dt)*this.oldCamera.position[0] + dt*this.newCamera.position[0];
			var fy = (1.0-dt)*this.oldCamera.position[1] + dt*this.newCamera.position[1];
			var fz = (1.0-dt)*this.oldCamera.position[2] + dt*this.newCamera.position[2];
			
			var tx = (1.0-dt)*this.oldCamera.target[0] + dt*this.newCamera.target[0];
			var ty = (1.0-dt)*this.oldCamera.target[1] + dt*this.newCamera.target[1];
			var tz = (1.0-dt)*this.oldCamera.target[2] + dt*this.newCamera.target[2];
			
			var near = this.newCamera.near;
			var far = this.newCamera.far;

			
			var camera = new CGFcamera(angle, near, far,
            vec3.fromValues(fx, fy, fz), vec3.fromValues(tx, ty, tz) ); 
			this.scene.camera = camera;
			this.scene.graph.interface.setActiveCamera(camera);
			

			
			
			
			
			
		}
		
		
		
		
		
	}
	
	
}

function transition(scene, initTime, currTime, spanTime, camera1, camera2) {
	if(spanTime <= currTime - initTime) {
		scene.camera = camera2;
		scene.graph.interface.setActiveCamera(camera2);
		return;
	}	
	
	var dt = (currTime - initTime)/spanTime;
	
	var angle = (1.0-dt)*camera1.fov + dt*camera2.fov;
			
	var fx = (1.0-dt)*camera1.position[0] + dt*camera2.position[0];
	var fy = (1.0-dt)*camera1.position[1] + dt*camera2.position[1];
	var fz = (1.0-dt)*camera1.position[2] + dt*camera2.position[2];
	
		
	var tx = (1.0-dt)*camera1.target[0] + dt*camera2.target[0];
	var ty = (1.0-dt)*camera1.target[1] + dt*camera2.target[1];
	var tz = (1.0-dt)*camera1.target[2] + dt*camera2.target[2];
			
	var near = camera2.near;
	var far = camera2.far;

			
	var camera = new CGFcamera(angle, near, far, vec3.fromValues(fx, fy, fz), vec3.fromValues(tx, ty, tz) ); 
	scene.camera = camera;
	scene.graph.interface.setActiveCamera(camera);
	
}
