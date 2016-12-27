
function XMLscene() {
    CGFscene.call(this);
    
 
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);
	this.ready = false;
    this.initCameras();

    //this.initLights();

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

	this.axis=new CGFaxis(this);
	
	this.enableTextures(true);
	this.lightStatus = [false, false, false, false , false, false, true, true];
	this.viewIndex = 0;
	this.interface = Interface; 
    this.timerStarted = false;
	this.currTime = 0;
	this.startingTime = 0;
	
	
	
};

XMLscene.prototype.initLights = function () {

	var globalAmbientLight = this.graph.illumination_properties["ambient"];
	if(typeof globalAmbientLight != 'undefined'){
		this.setGlobalAmbientLight(globalAmbientLight["r"], globalAmbientLight["g"], globalAmbientLight["b"], globalAmbientLight["a"]);
	}
	
	// omni lights
	 
	for(var i = 0; i < this.graph.omni_lights.length; i++){
		
		if(typeof this.graph.omni_lights[i] == 'undefined')
			continue;
		this.lights[i].setPosition(this.graph.omni_lights[i]["location"]["x"], this.graph.omni_lights[i]["location"]["y"], this.graph.omni_lights[i]["location"]["z"], this.graph.omni_lights[i]["location"]["w"]);
		this.lights[i].setAmbient(this.graph.omni_lights[i]["ambient"]["r"],this.graph.omni_lights[i]["ambient"]["g"],this.graph.omni_lights[i]["ambient"]["b"],this.graph.omni_lights[i]["ambient"]["a"]);
		this.lights[i].setDiffuse(this.graph.omni_lights[i]["diffuse"]["r"],this.graph.omni_lights[i]["diffuse"]["g"],this.graph.omni_lights[i]["diffuse"]["b"],this.graph.omni_lights[i]["diffuse"]["a"]);
		this.lights[i].setSpecular(this.graph.omni_lights[i]["specular"]["r"],this.graph.omni_lights[i]["specular"]["g"],this.graph.omni_lights[i]["specular"]["b"],this.graph.omni_lights[i]["specular"]["a"]);
		
		if (this.graph.omni_lights[i]["enabled"])
		{
			this.lights[i].enable();
			this.lightStatus[i] = true;
		}
		else
		{
			this.lights[i].disable();
			this.lightStatus[i] = false;
		}
		this.lights[i].setVisible(true);
		this.lights[i].update();
		
		this.graph.interface.addLight("omni", i, this.graph.omni_lights[i]["id"]);
		
		 
	}
	
	
	// spot lights 
	
	var omniSize = this.graph.omni_lights.length;
	//this.lights[i + omniSize]
	for(var i = 0; i < this.graph.spot_lights.length && i + omniSize < 8; i++){
		if(typeof this.graph.spot_lights[i] == 'undefined')
			continue;
		
		this.lights[i + omniSize].setPosition(this.graph.spot_lights[i]["location"]["x"], this.graph.spot_lights[i]["location"]["y"], this.graph.spot_lights[i]["location"]["z"], this.graph.spot_lights[i]["location"]["w"]);
		this.lights[i + omniSize].setAmbient(this.graph.spot_lights[i]["ambient"]["r"],this.graph.spot_lights[i]["ambient"]["g"],this.graph.spot_lights[i]["ambient"]["b"],this.graph.spot_lights[i]["ambient"]["a"]);
		this.lights[i + omniSize].setDiffuse(this.graph.spot_lights[i]["diffuse"]["r"],this.graph.spot_lights[i]["diffuse"]["g"],this.graph.spot_lights[i]["diffuse"]["b"],this.graph.spot_lights[i]["diffuse"]["a"]);
		this.lights[i + omniSize].setSpecular(this.graph.spot_lights[i]["specular"]["r"],this.graph.spot_lights[i]["specular"]["g"],this.graph.spot_lights[i]["specular"]["b"],this.graph.spot_lights[i]["specular"]["a"]);
		
		if (this.graph.spot_lights[i]["enabled"])
		{
			this.lights[i + omniSize].enable();
			this.lightStatus[i + omniSize] = true;
		}
		else
		{
			this.lights[i + omniSize].disable();
			this.lightStatus[i + omniSize] = false;
		}
		this.lights[i + omniSize].setVisible(true);
		this.lights[i + omniSize].update();
		
		
		//setSpotCutOff anglo
		this.lights[i + omniSize].setSpotCutOff(this.graph.spot_lights[i]["angle"]);
		//setSpotExponent expoente
		this.lights[i + omniSize].setSpotExponent(this.graph.spot_lights[i]["exponent"]);
		
		//setSpotDirection direção
		this.lights[i + omniSize].setSpotDirection(this.graph.spot_lights[i]["target"]["x"],this.graph.spot_lights[i]["target"]["y"], this.graph.spot_lights[i]["target"]["z"] );
		
		 this.graph.interface.addLight("spot", i + omniSize, this.graph.spot_lights[i ]["id"]);
		 
		
		
	}
 
};

XMLscene.prototype.initCameras = function () {
     this.camera = new CGFcamera(1, 0.1, 500, vec3.fromValues(100, 100, 100), vec3.fromValues(0, 0, 0));
	
};


XMLscene.prototype.logPicking = function ()
{
	
	if (this.pickMode == false) {
		if (this.pickResults != null && this.pickResults.length > 0) {
			for (var i=0; i< this.pickResults.length; i++) {
				var obj = this.pickResults[i][0];
				if (obj)
				{
					var customId  = this.pickResults[i][1];	
					console.log("id: " + customId);			
	
				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}		
	}
	
	return customId;
}

XMLscene.prototype.setDefaultAppearance = function () {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);	
};

// Handler called when the graph is finally loaded. 
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function () 
{	

	  
	if(typeof this.graph.illumination_properties["background"] != 'undefined')
		this.gl.clearColor(this.graph.illumination_properties["background"]["r"], this.graph.illumination_properties["background"]["g"], this.graph.illumination_properties["background"]["b"], this.graph.illumination_properties["background"]["a"]);
	this.initLights();


	this.axis=new CGFaxis(this,this.graph.scene_properties["axis_length"], 0.1);
	this.camera = this.graph.perspectiveDefault;
	this.graph.interface.setActiveCamera( this.graph.perspectiveDefault);
 	this.ready = true;
	
	this.state = new MenuPrincipal(this);
	
	 
	

	
	
};


XMLscene.prototype.updateMaterials = function (node) {
	this.graph.components[node].updateMaterialIndex();
	for(var i = 0; i < this.graph.components[node].childrensComponent.length; i++)
		this.updateMaterials(this.graph.components[node].childrensComponent[i]);	
};


/**
 * Udaptes to next view in this.graph.perspectives 
 */

XMLscene.prototype.updateView = function () {
	this.viewIndex++;
	var index =this.viewIndex%this.graph.perspectives.length; 
	this.camera = this.graph.perspectives[index];
	this.graph.interface.setActiveCamera(this.graph.perspectives[index]);
 
};

/**
 * Udaptes to next material of each node, recursion needed  
 */
XMLscene.prototype.updateLights = function () {
	for (var i = 0; i < this.lightStatus.length; i++) {
    if(this.lightStatus[i])
      this.lights[i].enable();
    else
      this.lights[i].disable();
  }

  for (var i = 0; i < this.lights.length; i++)
    this.lights[i].update();
	
	
};


XMLscene.prototype.update = function(currTime) {
	if (!this.timerStarted && this.ready)
	{
		this.startingTime = currTime;
		this.timerStarted = true;
	}
	this.currTime = (currTime - this.startingTime) / 1000.0;
};

XMLscene.prototype.resetAnims = function() {
	this.timerStarted = false;
};

XMLscene.prototype.display = function () {
	
	

	// ---- BEGIN Background, camera and axis setup
	
	// Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation
	this.updateProjectionMatrix();
    this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Draw axis
	this.axis.display();

	this.setDefaultAppearance();
	
	// ---- END Background, camera and axis setup

	// it is important that things depending on the proper loading of the graph
	// only get executed after the graph has loaded correctly.
	// This is one possible way to do it
	if (this.ready)
	{
		this.setUpdatePeriod(10);
		this.updateLights();
		this.graph.components[this.graph.rootNode].display(this.currTime);
		this.state.display(this.currTime);
	}
	

	
	 
		
};

