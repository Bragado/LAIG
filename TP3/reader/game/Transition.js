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