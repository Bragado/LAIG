/**
 * Reads scene objects and properties from the specified 'filename' and creates the scene graph
 *  
 */


function MySceneGraph(filename, scene, interface) {
	
	this.interface = interface;
	this.loadedOk = false;
	this.rootNode = "";
	this.filename = filename;
	this.degToRad= Math.PI / 180.0;
	
	
	// warnings and errors	
	this.errors = [];
	this.warnings= [];
	
	// startParser function auxiliar variables	
	this.blocks = ["scene", "views", "illumination", "lights", "textures", "materials", "transformations", "animations", "primitives", "components"];
	
	//parseView variables
	this.perspectives = [];	
	this.perspectiveDefault = null;
	
	// parseScene variables
	this.scene_properties = [];
	this.default_axis_length = 1234;
	
	// parseIllumination variables
	this.illumination_properties =[];
	this.default_ambient_ligth = [0.6,0.6,0.6,1.0]; // !!!!!!!!! Alterar !!!!!!!!!!!!!
	this.default_background_ligth = [0.0,0.0,0.0,1.0]; // !!!!!!!!! Alterar !!!!!!!!!!!!!
	
	// parseLights variables
	this.omni_lights = [];
	this.spot_lights = [];
	this.default_ambient_ligth2 = [0.0,0.0,0.0,1.0]; // !!!!!!!!! Alterar !!!!!!!!!!!!!
	this.default_diffuse_ligth = [0.6,0.6,0.6,1.0]; // !!!!!!!!! Alterar !!!!!!!!!!!!!
	this.default_specular_ligth = [0.1,0.1,0.1,1.0]; // !!!!!!!!! Alterar !!!!!!!!!!!!!
	this.default_angle = 0;
	this.default_expoent = 1;
	
	//parseTextures variables
	this.texture = [];
	
	//parseAnimations variables
	this.animations = [];	
	
	//parsePrimitives variables
	this.primitives = [];
	
	//parseMaterials variables
	this.materials = [];
	this.materials_default_emission = [0.0,0.0,0.0,1.0];
	this.materials_default_ambient = [0.8,0.6,0.6,1.0];
	this.materials_default_diffuse = [0.8,0.8,0.8,1.0];
	this.materials_default_specular = [0.0,0.0,0.0,1.0];
	this.materials_default_shininess = 100;
	
	//parseTransformations variables
	this.transformations = [];
	
	//parseComponents
	this.components = [];
	
	
	
	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;
		
	// File reading 
	this.reader = new CGFXMLreader();

	/*
	 * Read the contents of the xml file, and refer to this class for loading and error handlers.
	 * After the file is read, the reader calls onXMLReady on this object.
	 * If any error occurs, the reader calls onXMLError on this object, with an error message
	 */
	 
	this.reader.open('scenes/'+filename, this);  

}


/**
 * Callback to be executed after successful reading
 */

MySceneGraph.prototype.onXMLReady=function() 
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;
		 
	this.startParser(rootElement);
	
	/* navigation to find if there's an error in errors or warnings  */
 	if(this.printErrors_Warings()){
		console.log("scene.dsx has errors, scene is not going to be apresented");
		return;
	}
		
	this.loadedOk = true;
	this.scene.onGraphLoaded();
	
};

/**
 * Prints all the warnings and errors found while reading the dsx file
 *  
 */

 
MySceneGraph.prototype.printErrors_Warings = function () {
	var ret = false;
	for(var i = 0; i < this.warnings.length; i++)
		console.log("[WARNING]: " + this.warnings[i]);
	for(var i = 0; i < this.errors.length; i++){
		console.log("[ERROR]: " + this.errors[i]);
		ret = true;
	}	
	return ret;
 };
 

/**
 * Prints all the warnings and errors found while reading the dsx file and starts calling the parser for each blocks
 * @param rootElement 'dsx' node
 */
 
MySceneGraph.prototype.startParser= function(rootElement) 
{
	 	 
	 if(rootElement.nodeName != 'dsx'){
		 this.newError("Root node is incorrect");
		 
	 }
	 
	 var blockPosition = Array.apply(null, Array(this.blocks.length)).map(Number.prototype.valueOf, -1);
	 var position = 0;
	 var nodes = rootElement.childNodes;
	 
	 
	 
	 if(nodes == null)
		 return;
	 
	 var i;
	 for(i = 0; i < nodes.length; i++){
		 var nodeName = nodes[i].nodeName;
		 var j = this.blocks.indexOf(nodeName);
		 if(j < 0)
			this.newWarning("Unknow block: " + nodeName);
		else if(blockPosition[j] != -1)
			this.newError("Block declared multiple times: " + nodeName);
		else
			blockPosition[j] = position++;	
		
	 }
	 	 
	 
	 for(i=0; i < this.blocks.length; i++){
		 if(blockPosition[i] == -1){
			this.newWarning("Block does not exist: " + this.blocks[i]);
			console.log("Block does not exist: " + this.blocks[i]);
		 }
		 if(blockPosition[i] != i)
			this.newWarning("Block out of order");
	 }
	
	/*
		Chamada do parsing de todos os blocos
	*/	
	 
	 
	var elems =  rootElement.getElementsByTagName('scene');
	if (elems == null) {
		this.newError("Scene element is missing");
		return;
	}
	else {
		
		this.parseScene(elems);
	}
	
	 
	elems = rootElement.getElementsByTagName('views');
	if(elems == null){
		this.newError("Views element is missing");
		return;
	}
	
	else{
		this.parseView(elems );
	}
	 
	elems = rootElement.getElementsByTagName('illumination');
	if(elems == null){
		this.newError("Illumination element is missing"); 
		return;
	}
	
	else{
		this.parseIllumination( elems );
	} 
	
	elems = rootElement.getElementsByTagName('lights');
	if(elems == null){
		this.newError("Lights element is missing");	
		return;
	}
	
	else{
		this.parseLights( elems );
	}

	elems = rootElement.getElementsByTagName('textures');
	if(elems == null){
		this.newError("Textures element is missing"); 
		return;
	}
	
	else{
		this.parseTextures( elems );
	}


	elems = rootElement.getElementsByTagName('materials');
	if(elems == null){
		this.newError("Materials element is missing");
		return;
	}
	
	else{
		this.parseMaterials(elems);
	}
	
	
	 
	elems = rootElement.getElementsByTagName('transformations');
	
	
	if(elems == null){
		this.newError("Transformations element is missing");
		return;
	}
	
	else{
		this.parseTransformations( elems );
	}
	
	elems = rootElement.getElementsByTagName('animations');
	
	if(elems == null){
		this.newError("Animations element is missing");
		return;
		
	}
	else if(elems[0] != undefined) {
		this.parseAnimations( elems );
		
	}
	
	
	elems = rootElement.getElementsByTagName('primitives');
	if(elems == null){
		this.newError("Primitives element is missing"); 
		return;
	}
	
	else{
		this.parsePrimitives( elems );
	}
	
	elems = rootElement.getElementsByTagName('components');
	if(elems == null){
		this.newError("Components element is missing");
		return;
	}
	
	else{
		this.parseComponents( elems );
	}
	 
	this.createGraph(this.rootNode); 
	
	
};

/**
 * Adds to this.errors a new string explaining an error 
 * @param msg error to be added
 */

MySceneGraph.prototype.newError = function(msg)
{
	this.errors.push(msg);
};

/**
 * Adds to this.warning a new string explaining the warning 
 * @param msg warning to be added
 */

MySceneGraph.prototype.newWarning = function(msg)
{
	this.warnings.push(msg);
};


/**
 * Checks if 'name' equals to <element>
 * @element
 * @name
 */

MySceneGraph.prototype.elementExists = function(element, name)
{
	if (!this.reader.hasAttribute(element, name))
	{
		this.newWarning("Could not read '" + name + "' from '" + element.nodeName + "'");
		
		return false;
	}
	return true;
};


/**
 * Reads the value of character 'name' from element
 * @element
 * @name
 */

MySceneGraph.prototype.readItem = function(element, name)
{
	if (this.elementExists(element, name))
		return this.reader.getItem(element, name, ["x", "y", "z"], false);
	return null;
};

/**
 * Reads the value of float 'name' from element
 * @element
 * @name
 */

MySceneGraph.prototype.readFloat = function(element, name)
{
	if (this.elementExists(element, name))
		return this.reader.getFloat(element, name, false);
	return null;
		
};

/**
 * Reads the value of the string 'name' from element
 * @element
 * @name
 */
MySceneGraph.prototype.readString = function(element, name)
{
	if (this.elementExists(element, name))
		return this.reader.getString(element, name, false);
	return null;
		
};

/**
 * Reads the value of boolean 'name' from element
 * @element
 * @name
 */
MySceneGraph.prototype.readBoolean = function(element, name)
{
	if (this.elementExists(element, name))
		return this.reader.getBoolean(element, name, false);
	return null;
		
};



/**
 * Parses the scene blocks
 * @element 'scene' node 
 */
MySceneGraph.prototype.parseScene = function(elems)  
{
	var root = elems[0];
	
	// id
	var id = this.readString(root, 'root');
	if(id == null){
		this.newWarning("id scene is not correct, assuming ")
		this.scene_properties["id"] = "ss";
	}
	else {
		
		this.scene_properties["id"] = id;
	}
		
	
	this.rootNode = id;
	
	 
	var axis_length = this.readFloat(root, 'axis_length');	
	 
	
	if(isNaN(axis_length) || axis_length == null){
		this.newWarning("axis_length not defined correctly, assuming default value");
		this.scene_properties["axis_length"] = this.default_axis_length;
	}
	else
		this.scene_properties["axis_length"] = axis_length;
	
	 

};



/**
 * Parses the View blocks
 * @element 'view' node 
 */
MySceneGraph.prototype.parseView = function(elems) 
{
	var perspectiveDefault = this.readString(elems[0], 'default');
	if(perspectiveDefault == null){		
		this.newError("invalid perspective default");
		return;
	}
		
	
	
	var perspectives = elems[0].getElementsByTagName('perspective');
	if(perspectives == null || perspectives.length == 0){
		this.newError("no perspectives declared");
		return;
	}
	
	for(var i = 0; i < perspectives.length; i++){
		
		// id + near + far + angle
		var id = this.readString(perspectives[i], 'id');
		var near = this.readFloat(perspectives[i], 'near');
		var far = this.readFloat(perspectives[i], 'far');
		var angle = this.readFloat(perspectives[i], 'angle');
		
		
		
		// from x + y + z	
		var fromm = perspectives[i].getElementsByTagName('from');
		if(fromm == null || fromm.length == 0)
			continue;
		var fx = this.readFloat(fromm[0],'x');
		var fy = this.readFloat(fromm[0], 'y');
		var fz = this.readFloat(fromm[0], 'z');
		
		// to x + y + z
		var to = perspectives[i].getElementsByTagName('to');
		if(to == null || to.length == 0)
			continue;
		 
		
		var tx = this.readFloat(to[0], 'x');
		var ty = this.readFloat(to[0], 'y');		
		var tz = this.readFloat(to[0], 'z');
		
		// verification
		if(id == null || isNaN(near) || near == null || far == null || isNaN(far) || isNaN(angle) || angle == null || isNaN(fx) || fx == null || isNaN(fy) || fy == null || isNaN(fz) || fz == null || isNaN(tx) || tx == null || isNaN(ty) || ty == null || isNaN(tz) || tz == null)
			continue;
			
		if (id == perspectiveDefault){
			this.perspectiveDefault = new CGFcamera(angle* this.degToRad, near, far,
            vec3.fromValues(fx, fy, fz), vec3.fromValues(tx, ty, tz) );
	
			
		}
		 
			this.perspectives.push( new CGFcamera(angle* this.degToRad, near, far, [fx, fy, fz], [tx, ty, tz]));
		
		
	}
	
	
	
};


/**
 * Parses the illumination blocks
 * @element 'illumination' node 
 */
MySceneGraph.prototype.parseIllumination = function(elems) //metodo correto
{
	
	if(elems == null)
		return;
	
	var illumination = elems[0];
	
	var rgba = ["r", "g", "b", "a"];
	
	
	// ambient
	
	var ambient_ligths = illumination.getElementsByTagName('ambient');
	
	if(ambient_ligths != null){
		var ambient = ambient_ligths[0];
		this.illumination_properties["ambient"] = [];
		
		for(var i=0; i <= 3; i++){
			var value = this.readFloat(ambient, rgba[i]);
			if (isNaN(value) || value == null){
				
				this.illumination_properties["ambient"][rgba[i]] = this.default_ambient_ligth[i];
				this.newWarning("Ambient ligth not recognized, assuming defualt value");
				
			}
			else
				this.illumination_properties["ambient"][rgba[i]] = value;
			
			
		}
		
	}else{
		this.newError("ambient ligth property not defined correctly");
		
		return;
	}
	
	
	//background
	
	ambient_ligths = illumination.getElementsByTagName('background');
	if(ambient_ligths != null){
		var background = ambient_ligths[0];
		this.illumination_properties["background"] = [];	
		
		
		for(var i=0; i <= 3; i++){
						
			var value = this.readFloat(background, rgba[i]);
			
			
			if (isNaN(value) || value == null){
				 
				this.illumination_properties["background"][rgba[i]] = this.default_background_ligth[i];
				this.newWarning("Background ligth not recognized, assuming defualt value");
			}
			else
				this.illumination_properties["background"][rgba[i]] = value;
			
			
		}
		
	}else{
		newError("background ligth property not defined correctly");
		return 
	}
	
	
	
};



/**
 * Parses the lights blocks
 * @element 'lights' node 
 */

MySceneGraph.prototype.parseLights = function(elementos) // metodo correto
{
	
	var lights = elementos[0];
	var rgba = ["r", "g", "b", "a"];
	var xyzw = ["x", "y", "z", "w"];
	var elems = [];
	
	var omni_lightss = lights.getElementsByTagName('omni');
	
	for(var i =0; i < omni_lightss.length; i++){
		// id && enabled
		this.omni_lights[i] = [];
		var id = this.readString(omni_lightss[i], 'id');
		var enable = this.readBoolean(omni_lightss[i], 'enabled');
		
		
		
		if(id != null)
			this.omni_lights[i]["id"] = id;
		
		else {
			this.omni_lights[i]["id"] = 'ss';
			this.newWarning("id not declared in omni light number " + i);
		}
		
		if(enable != null){
			this.omni_lights[i]["enabled"] = enable;
		}else {
			this.omni_lights[i]["enabled"] = '0';
			this.newWarning("enabled value not declared in omni light number " + i);
		}
		
		// location 
		elems = omni_lightss[i].getElementsByTagName('location');  
		if(elems == null){
			this.newWarning("light "+ i + " has no location declared");
			continue;
		}else  { 		
		
			var locattion = elems[0];
			this.omni_lights[i]["location"] = [];	
			for(var j = 0; j < xyzw.length; j++){
				var ff = this.readFloat(locattion, xyzw[j]);
				if(isNaN(ff)){
					this.newWarning("location of omni light " + i + " not declared correctly");
					return;
				}
				else{
					this.omni_lights[i]["location"][xyzw[j]] = ff;
				}
						
			}
		
		}
		
		// ambient light
		var elems = omni_lightss[i].getElementsByTagName('ambient');
		if(elems == null){
			this.newWarning("light "+ i + " has no ambient light declared");
			continue;
		}else{
		
			var ambient = elems[0];
			this.omni_lights[i]["ambient"] = [];
			for(var j = 0; j < rgba.length; j++){
				var ff = this.readFloat(ambient, rgba[j]);
				if(isNaN(ff)){
					this.newWarning("ambient property of omni light " + i + " not declared correctly, assuming default value");
				this.omni_lights[i]["ambient"][rgba[j]] = this.default_ambient_ligth2[rgba[j]];	
				}
				else
					this.omni_lights[i]["ambient"][rgba[j]] = ff;
			
			}
		}
		// diffuse light
		var elems = omni_lightss[i].getElementsByTagName('diffuse');
		if(elems == null){
			this.newWarning("light "+ i + " has no diffuse light declared");
			continue;
		} else{
			
			var diffuse = elems[0];
			this.omni_lights[i]["diffuse"] = [];
			for(var j = 0; j < rgba.length; j++){
				var ff = this.readFloat(diffuse, rgba[j]);
				if(isNaN(ff)){
					this.newWarning("diffuse property of omni light " + i + " not declared correctly, assuming default value");
				this.omni_lights[i]["diffuse"][rgba[j]] = this.default_diffuse_ligth2[rgba[j]];	
				}
				else
					this.omni_lights[i]["diffuse"][rgba[j]] = ff;
			}	
		
		}
		
	 
		var elems = omni_lightss[i].getElementsByTagName('specular');
		if(elems == null){
			this.newWarning("light "+ i + " has no specular light declared");
			continue;
		}else{	
		
			var specular = elems[0];
			this.omni_lights[i]["specular"] = [];
			
			for(var j = 0; j < rgba.length; j++){
				var ff = this.readFloat(specular, rgba[j]);
				 
				if(isNaN(ff) || ff == null){
					this.newWarning("specular property of omni light " + i + " not declared correctly, assuming default value");
					this.omni_lights[i]["specular"][rgba[j]] = this.default_specular_ligth2[rgba[j]];	
				}
				else
					this.omni_lights[i]["specular"][rgba[j]] = ff;
			}
		}	
	
	}
	
	
	
	
	
	
	
		var spot_lightss = lights.getElementsByTagName('spot');
		for(var i =0; i < spot_lightss.length; i++){
		
		// id && enabled && angle && exponent
		this.spot_lights[i] = [];
		var id = this.readString(spot_lightss[i], 'id');
		var enable = this.readBoolean(spot_lightss[i], 'enabled');
		var angle = this.readFloat(spot_lightss[i], 'angle');
		var exponent = this.readFloat(spot_lightss[i], 'exponent');	
		
		
		
		if(id != null)
			this.spot_lights[i]["id"] = id;
		
		else {
			this.spot_lights[i]["id"] = 'ss';
			this.newWarning("id not declared in spot light number " + i);
		}
		
		if(enable != null){
			this.spot_lights[i]["enabled"] = enable;
		}else {
			this.spot_lights[i]["enabled"] = '0';
			this.newWarning("enabled value not declared in spot light number " + i);
		}
		
		if(isNaN(angle) || angle == null){
			this.spot_lights[i]["angle"] = this.default_angle;
			this.newWarning("angle value not declared in spot light number " + i);
		
		}else{
			this.spot_lights[i]["angle"] = angle*this.degToRad;
		}
		
		if(isNaN(exponent) || exponent == null){
			this.spot_lights[i]["exponent"] = this.default_expoent;
			this.newWarning("exponent value not declared in spot light number " + i);
		
		}else{
			this.spot_lights[i]["exponent"] = exponent;
		}
		
		
		//target
		elems = spot_lightss[i].getElementsByTagName('target');  
		if(elems == null){
			this.newWarning("light "+ i + " has no target declared");
			continue;
		} else{		
			var target = elems[0];
			this.spot_lights[i]["target"] = [];	
			for(var j = 0; j < 3; j++){
				var ff = this.readFloat(target, xyzw[j]);
				if(isNaN(ff)){
					this.newError("target of omni light " + i + " not declared correctly");
					return;
				}
				else{
					this.spot_lights[i]["target"][xyzw[j]] = ff;
				}
						
			}
		}
		
		
		
		//location
		elems = spot_lightss[i].getElementsByTagName('location');  
		if(elems == null){
			this.newWarning("light "+ i + " has no location declared");
			continue;
		} else{		
			var locattion = elems[0];
			this.spot_lights[i]["location"] = [];	
			for(var j = 0; j < 3; j++){
				var ff = this.readFloat(locattion, xyzw[j]);
				if(isNaN(ff)){
					this.newError("location of omni light " + i + " not declared correctly");
					return;
				}
				else{
					this.spot_lights[i]["location"][xyzw[j]] = ff;
				}
						
			}	
		}
		
		
		// ambient light
		var elems = spot_lightss[i].getElementsByTagName('ambient');
		if(elems == null){
			this.newWarning("light "+ i + " has no ambient light declared");
			continue;
		} else{
			var ambient = elems[0];
			this.spot_lights[i]["ambient"] = [];
			for(var j = 0; j < rgba.length; j++){
				var ff = this.readFloat(ambient, rgba[j]);
				if(isNaN(ff)){
					this.newWarning("ambient property of omni light " + i + " not declared correctly, assuming default value");
				this.spot_lights[i]["ambient"][rgba[j]] = this.default_ambient_ligth2[rgba[j]];	
				}
				else
					this.spot_lights[i]["ambient"][rgba[j]] = ff;
			}
		}
		
		// diffuse light
		var elems = spot_lightss[i].getElementsByTagName('diffuse');
		if(elems == null){
			this.newWarning("light "+ i + " has no diffuse light declared");
			continue;
		}
		var diffuse = elems[0];
		this.spot_lights[i]["diffuse"] = [];
		for(var j = 0; j < rgba.length; j++){
			var ff = this.readFloat(diffuse, rgba[j]);
			if(isNaN(ff)){
				this.newWarning("diffuse property of omni light " + i + " not declared correctly, assuming default value");
			this.spot_lights[i]["diffuse"][rgba[j]] = this.default_diffuse_ligth2[rgba[j]];	
			}
			else
				this.spot_lights[i]["diffuse"][rgba[j]] = ff;
		}	
		
		
		// specular light
		var elems = spot_lightss[i].getElementsByTagName('specular');
		if(elems == null){
			this.newWarning("light "+ i + " has no specular light declared");
			continue;
		}
		var specular = elems[0];
		this.spot_lights[i]["specular"] = [];
		for(var j = 0; j < rgba.length; j++){
			var ff = this.readFloat(specular, rgba[j]);
			if(isNaN(ff)){
				this.newWarning("specular property of omni light " + i + " not declared correctly, assuming default value");
			this.spot_lights[i]["specular"][rgba[j]] = this.default_specular_ligth2[rgba[j]];	
			}
			else
				this.spot_lights[i]["specular"][rgba[j]] = ff;
		}
		
		
		
			
	}
	
	
	
	
};


/**
 * Parses the texture blocks
 * @element 'textures' node 
 */

MySceneGraph.prototype.parseTextures = function( elementos) // testar com o uso de uma textura e corrigir depois
{
	
		
	var textures = elementos[0];
	
	var elems = textures.getElementsByTagName('texture');
	if(elems == null)
		return;
	
	var textures = [];
	
	
	for(var i = 0; i < elems.length; i++){
		
		textures[i] = [];
		// Id
		var id = this.readString(elems[i], 'id');
		if(id == null){
			this.newError("id of texture number " + i + " not declared");
			continue;
		}
		else{
			textures[i]["id"] = id;
		}
		 
		this.texture[id] = [];
		
		// file
		var file =	this.readString(elems[i], 'file');
		if(file == null){
			this.newError("path of texture number " + i + " not declared");
			continue;
		}
		else{
			textures[i]["file"] = file;
		}
		 
		
		
		// length_s
		var length_s = this.readFloat(elems[i], 'length_s');
		 
		
		if(isNaN(length) || length_s == null){
			this.newError("length_s of texture number " + i + " not declared");
			continue;
		}
		else{
			textures[i]["length_s"] = file;
		}
		
	 
		
		// length_t
		var length_t = this.readFloat(elems[i], 'length_t');
		 
		
		if(length_t == null || isNaN(length_t)){
			this.newError("length_t of texture number " + i + " not declared");
			continue;
		}
		else{
			textures[i]["length_t"] = file;
		}
		
		
		 /*
			Criar a textura e adicionar as variaveis a this.texture[id];
		 */

		 		
		 this.texture[id][0] =  new CGFtexture(this.scene, file);
		 this.texture[id][1] = length_s;
		 this.texture[id][2] = length_t;
		 
		 
		 
		
	}
	
	
	
};


/**
 * Parses the materials blocks
 * @element 'materials' node 
 */

MySceneGraph.prototype.parseMaterials = function(elementos)  
{
	var rgba = ["r", "g", "b", "a"];
	
	var elems = [];
	elems = elementos[0].getElementsByTagName('material');
	if(elems == null){
		this.newError("no material found");
		return;
	}
	
	var materials = [];
	
	
	for(var i = 0; i < elems.length; i++){
		
		materials[i] = [];
		
		// id
		var id = this.readString(elems[i], 'id');
		if(id == null){
			this.newWarning("id of material number " + i + " not found");
			continue;
		}
		else
			materials[i]["id"] = id;
	 
		
		//emission	
		var emission = elems[i].getElementsByTagName('emission');
		materials[i]["emission"] = [];
		
		for(var j = 0; j < rgba.length; j++){
			
			var value = this.readFloat(emission[0], rgba[j]);
			if(isNaN(value) || null==value){
				this.newWarning("emission valeu of material " + i + " is not correct");
				materials[i]["emission"][rgba[j]] = materials_default_emission[j];
			}
			else{
				materials[i]["emission"][rgba[j]] = value;
			}
			
		
		}
		 
		//ambient
		var ambient = elems[i].getElementsByTagName('ambient');
		materials[i]["ambient"] = [];
		for(var j = 0; j < rgba.length; j++){
			
			var value = this.readFloat(ambient[0], rgba[j]);
			if(isNaN(value) || null == value){
				this.newWarning("ambient valeu of material " + i + " is not correct");
				materials[i]["ambient"][rgba[j]] = materials_default_ambient[j];
			}
			else{
				materials[i]["ambient"][rgba[j]] = value;
			}
			
		}
		 
		//diffuse 
		var diffuse = elems[i].getElementsByTagName('diffuse');
		materials[i]["diffuse"] = [];
		for(var j = 0; j < rgba.length; j++){
			
			var value = this.readFloat(diffuse[0], rgba[j]);
			if(isNaN(value) || null == value){
				this.newWarning("diffuse value of material " + i + " is not correct");
				materials[i]["diffuse"][rgba[j]] = materials_default_ambient[j];
			}
			else{
				materials[i]["diffuse"][rgba[j]] = value;
			}
			
		}
		
		//specular
		var specular = elems[i].getElementsByTagName('specular');
		materials[i]["specular"] = [];
		for(var j = 0; j < rgba.length; j++){
			
			var value = this.readFloat(specular[0], rgba[j]);
			if(isNaN(value) || null == value){
				this.newWarning("specular value of material " + i + " is not correct");
				materials[i]["specular"][rgba[j]] = materials_default_ambient[j];
			}
			else{
				materials[i]["specular"][rgba[j]] = value;
			}
			
		}
		
		 	
		var shininess = elems[i].getElementsByTagName('shininess');
		var value = this.readFloat(shininess[0], 'value');
		if(isNaN(value) || value == null){
				materials[i]["shininess"] = materials_default_shininess;
				this.newWarning("shininess value of material " + i + " is not correct");
		}
		materials[i]["shininess"] = value;
		
		 
		// criação de cada material
		var newMaterial = new CGFappearance(this.scene);
		newMaterial.setAmbient(materials[i]["ambient"]["r"], materials[i]["ambient"]["g"], materials[i]["ambient"]["b"], materials[i]["ambient"]["a"]);
		newMaterial.setDiffuse(materials[i]["diffuse"]["r"], materials[i]["diffuse"]["g"], materials[i]["diffuse"]["b"], materials[i]["diffuse"]["a"]);
		newMaterial.setSpecular(materials[i]["specular"]["r"], materials[i]["specular"]["g"], materials[i]["specular"]["b"], materials[i]["specular"]["a"]);
		newMaterial.setEmission(materials[i]["emission"]["r"], materials[i]["emission"]["g"], materials[i]["emission"]["b"], materials[i]["emission"]["a"]);
		newMaterial.setShininess(materials[i]["shininess"]);
		newMaterial.setTextureWrap('REPEAT', 'REPEAT');
		
		this.materials[id] = newMaterial;

		 
		
	}
	
};



/**
 * Parses the transformations blocks
 * @element 'transformations' node 
 */

MySceneGraph.prototype.parseTransformations = function(elementos) 
{
	var elems = [];
	var xyzw=["x", "y", "z"];
	
	elems = elementos[0].getElementsByTagName('transformation');
	if(elems == null){
		this.newError("no transformation  found");
		return;
	}
	
	
	
	for(var i = 0; i < elems.length; i++){
		
		
		// id
		var id = this.readString(elems[i], 'id');
		if(id == null){
			this.newWarning("transformation number " + i + " has no id");
			continue;
		}
		
		
		
		
		this.transformations[id] = this.getTranformationMatrix(elems[i]); 
		
		
		
	}
	
	
	
	
};




MySceneGraph.prototype.parseAnimations = function( elems )
{
	var animation = elems[0].getElementsByTagName('animation');
		
	if(animation.length == 0)
		return;
	
	for(var i = 0; i < animation.length; i++){
		
		var id = this.readString(animation[i], 'id');
		var type = this.readString(animation[i], 'type');
		var span = this.readFloat(animation[i], 'span')
		
		if(type == "linear"){
			var controlPoint = animation[i].getElementsByTagName('controlpoint');
			var controlPoints = [];
			
			for(var j = 0; j < controlPoint.length; j++){
				
				var x = this.readFloat(controlPoint[j],"xx");
				var y = this.readFloat(controlPoint[j],"yy");
				var z = this.readFloat(controlPoint[j],"zz");
				
				controlPoints[j] = [];
				controlPoints[j] = [x, y, z];
			}
			this.animations[id] = new LinearAnimation(id, controlPoints, span);
					
			
		}
		else if(type == "circular"){
			var centerx = this.readFloat(animation[i], 'centerx');
			var centery = this.readFloat(animation[i], 'centery');
			var centerz = this.readFloat(animation[i], 'centerz');
			var radius = this.readFloat(animation[i], 'radius');
			var startang = this.readFloat(animation[i], 'startang');
			var rotang = this.readFloat(animation[i], 'rotang');
			
			this.animations[id] = new CircularAnimation(id, [centerx, centery, centerz], radius, startang*this.degToRad, rotang*this.degToRad, span);
		}
		else
			continue;
			
		
	}
	
};



/**
 * Parses the primitives blocks
 * @elementos 'primitives' node 
 */

MySceneGraph.prototype.parsePrimitives = function(elementos) 
{
	var elems = elementos[0].getElementsByTagName('primitive');
	if(elems == null || elems.length == 0){
		this.newError("no primitives declared");
		return;
	}
	
	this.primitives = [];
	
	for(var i = 0; i < elems.length; i++){
		
		
		var id = this.readString(elems[i], 'id');
		if(id != null )  
			this.primitives[id] = [];
		 
		// rectangle
		var rectangle = elems[i].getElementsByTagName('rectangle');
		if(!(rectangle == null || rectangle.length == 0)){
			
			this.primitives[id]["rectangle"] = [];
			this.primitives[id]["type"] = "rectangle";
			
			var x1 = this.readFloat(rectangle[0], 'x1');
			var y1 = this.readFloat(rectangle[0], 'y1');
			var x2 = this.readFloat(rectangle[0], 'x2');
			var y2 = this.readFloat(rectangle[0], 'y2');
			this.primitives[id] = new Rectangle(this.scene, x1, y1, x2, y2);
			
			continue;
		}
		
		
		// cylinder
		var cylinder = elems[i].getElementsByTagName('cylinder');
		if(!(cylinder == null || cylinder.length == 0)){
			 
			 
			
			var base = this.readFloat(cylinder[0], 'base');
			var top = this.readFloat(cylinder[0], 'top');
			var height = this.readFloat(cylinder[0], 'height');
			var slices = this.readFloat(cylinder[0], 'slices');
			var stacks = this.readFloat(cylinder[0], 'stacks');
			 
			this.primitives[id] = new Cylinder(this.scene, base, top, height, slices, stacks);
			
			continue;
		}
		
		// triangle
		var triangle = elems[i].getElementsByTagName('triangle');
		if(!(triangle == null || triangle.length == 0)){
			 
			this.primitives[id]["triangle"] = []; 
			this.primitives[id]["type"] = "triangle";	
			
			var x1 = this.readFloat(triangle[0], 'x1');
			var y1 = this.readFloat(triangle[0], 'y1');
			var z1 = this.readFloat(triangle[0], 'z1');
			var x2 = this.readFloat(triangle[0], 'x2');
			var y2 = this.readFloat(triangle[0], 'y2');
			var z2 = this.readFloat(triangle[0], 'z2');
			var x3 = this.readFloat(triangle[0], 'x3');
			var y3 = this.readFloat(triangle[0], 'y3');
			var z3 = this.readFloat(triangle[0], 'z3');
			
			this.primitives[id] = new Triangle(this.scene, x1, y1, z1, x2, y2, z2, x3, y3, z3);
			
			continue;
		}
		
		
		// sphere
		var sphere = elems[i].getElementsByTagName('sphere');
		if(!(sphere == null || sphere.length == 0)){
			this.primitives[id]["sphere"] = [];
			this.primitives[id]["type"] = "sphere";
			
			var radius = this.readFloat(sphere[0], 'radius');
			var slices = this.readFloat(sphere[0], 'slices');
			var stacks = this.readFloat(sphere[0], 'stacks');
			
			this.primitives[id] = new Sphere(this.scene, radius, slices, stacks);
			
			continue;
			
		}
		
		//torus
		var torus = elems[i].getElementsByTagName('torus');
		if(!(torus == null || torus.length == 0)){
			
			
			var inner = this.readFloat(torus[0], 'inner');			
			var outer = this.readFloat(torus[0], 'outer');			
			var slices = this.readFloat(torus[0], 'slices');			
			var loops = this.readFloat(torus[0], 'loops');

			this.primitives[id] = new Torus(this.scene, inner, outer, slices, loops); 
			
			continue;
		}
		  		
		 
		//plane
		var plane = elems[i].getElementsByTagName('plane');
		if(plane.length != 0){
			
			var dimX = this.readFloat(plane[0], 'dimX');
			var dimY = this.readFloat(plane[0], 'dimY');
			var partsX = this.readFloat(plane[0], 'partsX');
			var partsY = this.readFloat(plane[0], 'partsY');
			
			if(!(isNaN(dimX) || isNaN(dimY) || isNaN(partsX) || isNaN(partsY)))
			this.primitives[id] = new Plane(this.scene, dimX, dimY, partsX, partsY);
			continue;
		}
		
		// patches
		var patch = elems[i].getElementsByTagName('patch');
		for(var p = 0; p < patch.length; p++){
			
			var orderU = this.readFloat(patch[p], 'orderU');
			var orderV = this.readFloat(patch[p], 'orderV');
			var partsU = this.readFloat(patch[p], 'partsU');
			var partsV = this.readFloat(patch[p], 'partsV');
			
			var controlPoints = new Array;
			var controlpoint = patch[p].getElementsByTagName('controlpoint');
			
			for(var cp = 0; cp < controlpoint.length; cp++){
				
				var x = this.readFloat(controlpoint[cp], 'x');
				var y = this.readFloat(controlpoint[cp], 'y');
				var z = this.readFloat(controlpoint[cp], 'z');
				var w = 1;
				if(!(isNaN(x) ||isNaN(y) || isNaN(z) ))
					controlPoints.push([x,y,z,w]);
				else{
					this.newError("patch " + p + ": controlPoints are wrong, the program will crash");
					return;
				}
			}
			
			if(isNaN(orderU) || isNaN(orderV) || isNaN(partsU) || isNaN(partsV)){
				this.newError("patch " + p + ": attributes are wrong");
				return;
			}
			
			if((orderU + 1)*(orderV + 1) != controlPoints.length){
				this.newError("patch " + p + ": the number of control points is wrong");
				return;
			}
			
			this.primitives[id] = new Patch(this.scene, orderU, orderV, partsU, partsV, controlPoints);
				
			
		}
		
		// vehicle
		var vehicle  = elems[i].getElementsByTagName('vehicle');
		if(vehicle.length != 0){
			this.primitives[id] = new Vehicle(this.scene);
			continue;
		}
		
		// chessBoard
		var chessboard  = elems[i].getElementsByTagName('chessboard');
		if(chessboard.length != 0){
			
			var du = this.readFloat(chessboard[0], 'du');
			var dv = this.readFloat(chessboard[0], 'dv');
			var su = this.readFloat(chessboard[0], 'su');
			var sv = this.readFloat(chessboard[0], 'sv');
			var textureref = this.readString(chessboard[0], 'textureref');
			var c1 = new Array();
			var c2 = new Array();
			var cs = new Array();
			
			var color1 = chessboard[0].getElementsByTagName('c1');
			c1.push(this.readFloat(color1[0], 'r'));
			c1.push(this.readFloat(color1[0], 'g'));
			c1.push(this.readFloat(color1[0], 'b'));
			c1.push(this.readFloat(color1[0], 'a'));
			
			
			var color2 = chessboard[0].getElementsByTagName('c2');
			c2.push(this.readFloat(color2[0], 'r'));
			c2.push(this.readFloat(color2[0], 'g'));
			c2.push(this.readFloat(color2[0], 'b'));
			c2.push(this.readFloat(color2[0], 'a'));
			
			
			var colorMark = chessboard[0].getElementsByTagName('cs');
			cs.push(this.readFloat(colorMark[0], 'r'));
			cs.push(this.readFloat(colorMark[0], 'g'));
			cs.push(this.readFloat(colorMark[0], 'b'));
			cs.push(this.readFloat(colorMark[0], 'a'));
			
			this.primitives[id] = new ChessBoard(this.scene, du, dv, textureref, su, sv, c1, c2, cs);
			continue;
		}
		
		
		
	}
	
	
};

/**
 * Parses the components blocks and creates graph scne
 * @element 'components' node 
 */

MySceneGraph.prototype.parseComponents = function(elementos)  
{
	var xyz = ["x", "y", "z"];
	
	var component = elementos[0].getElementsByTagName('component');
	
	
	
	if(component == null || component.lenght == 0){
		this.newError("there's no components");
		return;
	}
	
	
	
	// para cada component 
	for(var i = 0; i < component.length; i++){
		
		//this.components[i] = [];
		
		// component id
		var id_component = this.readString(component[i], 'id');
		if(id_component == null){
			this.newError("component " + i + " has no id value");
			return;
		}
		 
		var node = new Node(id_component, this.scene);
		  
		
		// para cada transformation
		var transformation = component[i].getElementsByTagName('transformation');
		
		if(transformation == null || transformation.length == 0){
			this.newError("component " + id_component + " has no transformations");
			return;			
		}		
		
		
		
		var transformationref = transformation[0].getElementsByTagName('transformationref');
		if(transformationref[0] != null && transformationref != null && transformationref.lenght != 0 ){
			
			var transref = this.readString(transformationref[0], 'id');
			if(transref == null){
				this.newError("tranformationref of component " + id + " is not correct");
				return;
			}
				
						
			node.setMatrix(this.transformations[transref]); 
			
			
		}else{
								
		
			node.setMatrix(this.getTranformationMatrix(transformation[0]));
		}
		
		
		
		// animacoes
		
		var animation = component[i].getElementsByTagName('animation');
		if(animation.length > 1){
			this.newError("Component " + i + " has more than one block called animation");
			return ;
		}
		
		
		if(animation.length != 0){	
			var animationref = animation[0].getElementsByTagName('animationref');
			
			for(var l = 0; l < animationref.length; l++){
				
				var id = this.readString(animationref[l], 'id');
				if(id != undefined)
					node.pushAnimation(id);
				
			}
			
		}	
			
		
		
		
		
		
		// materials
		var materials = component[i].getElementsByTagName('materials');
		if(materials == null || materials.length == 0){
			this.newError("component " + i + " has no valid materials");
			return;
		}
		
		var material = materials[0].getElementsByTagName('material');
		if(material == null || material.length == 0){
			this.newError("component " + i + " has no valid materials");
			return;
		}
		
		for (var w = 0; w < material.length; w++){
			
			var id = this.readString(material[w], 'id');
			if(id == null && material.length == 1){
				this.newError("component " + i + " has no valid materials");
				return;
			}
			else if(id == null){
				this.newWarning("component " + i + " has invalid materials");
				continue;
			}

			node.setMaterials(id);
			
			}
		// textura
		var texture = component[i].getElementsByTagName('texture');
		if(texture[0] == null || texture.length == 0){
			this.newError("component " + i + " has no texture");
			return;
		}
			
		
		var id_texture = this.readString(texture[0], 'id');
		if(id_texture != null)
		 
			node.setTexture(id_texture);
		else{
			this.newError("component " + i + " has no texture");
			return;
		}
		
		// children
		var children = component[i].getElementsByTagName('children');
		if(children.length == 0 || children == null){
			this.newError("component " + i + " has no children");
			return;
		}
		
		var componentref = children[0].getElementsByTagName('componentref');
		if(componentref != undefined){
		
		for(var w = 0; w < componentref.length; w++){
			var component_id = this.readString(componentref[w], 'id');
			if(component_id == null && componentref.length == 0){
				this.newError("component " + i + " has no valid componentref");
				return;
			}
			else if(component_id == null){
				this.newWarning("component " + i + " has invalid componentref");
				return;
			}
			
			node.pushChildComponent(component_id);
			
			
		}
		}
		
		var primitiveref = children[0].getElementsByTagName('primitiveref');
		if(primitiveref != undefined){
		
		for(var w = 0; w < primitiveref.length; w++){
			var primitive_id = this.readString(primitiveref[w], 'id');
			if(primitive_id == null){
				this.newWarning("component " + i + " has no valid primitiveref");
				continue;
			}
				
		
			node.pushChildPrimitives(primitive_id);
			 
				
			}	
		}
		this.components[id_component] = node;
		
	}
	
	
};

/**
 * reads the different transformation in node transformation and returns a mat4 matrix 
 * @transformationElement 'transformation' node 
 */

MySceneGraph.prototype.getTranformationMatrix = function(transformationElement) {
    var matrix = mat4.create();

    if (transformationElement.children.length == 0) {
        this.newWarning("There sould be at least one transformation in the tranformation tag");
   		return matrix;
    }

    for (var i = 0; i < transformationElement.children.length; i++) {
        var transformation = transformationElement.children[i];
        var transformationName = transformation.tagName;

        switch (transformationName) {
            case 'translate':
                var translateCoords;
				
				var x = this.readFloat(transformation, 'x');
				var y = this.readFloat(transformation, 'y');
				var z = this.readFloat(transformation, 'z');
				
                if(!(isNaN(x) || isNaN(y) || isNaN(z)))
                mat4.translate(matrix, matrix, [x,y,z]);
                break;

            case 'rotate':
                var rotationAxis, angle, rotation;

                rotationAxis = this.readString(transformation, 'axis');
                angle = this.readFloat(transformation, 'angle');

                if (rotationAxis == 'x') rotation = [1, 0, 0];
                else if (rotationAxis == 'y') rotation = [0, 1, 0];
                else if (rotationAxis == 'z') rotation = [0, 0, 1];

                mat4.rotate(matrix, matrix, angle * this.degToRad, rotation);
                break;

            case 'scale':
				var x = this.readFloat(transformation, 'x');
				var y = this.readFloat(transformation, 'y');
				var z = this.readFloat(transformation, 'z');

               if(!(isNaN(x) || isNaN(y) || isNaN(z)))
                mat4.scale(matrix, matrix, [x,y,z]);
                break;
        }
    }

    return matrix;
}



/**
 * updates the values 'inherit' for materials and textures
 * @nodID rootNode 
 */
 
MySceneGraph.prototype.createGraph = function(nodeID) {
	
	// nas primitivas, aplicar a textura corretamente
	
	
	var aux = this.components[nodeID].childrensPrimitives;
	
	if(this.components[nodeID].texture != "none"){
		var texture = this.texture[this.components[nodeID].texture];  		// dará erro se não existir textura
		if(typeof(texture) == 'undefined')
			return; 
	}
		
	if(this.components[nodeID] == undefined)
		this.newError("components are missing or wrong");
	
	aux = this.components[nodeID].childrensComponent;
	
	
	
	
	for(var i = 0; i < aux.length; i++){
		
		var children = this.components[aux[i]];
		if(typeof(children) == 'undefined')
			continue;

		if(children.texture == "inherit")
			children.texture = this.components[nodeID].texture;
		if(children.material[0] == "inherit")
			children.material = this.components[nodeID].material;
		children.root = nodeID;
		
		this.createGraph(aux[i]);
		
	}
	
	
	
	
	 
	 
	 
 };
 
 /*
 * Callback to be executed on any read error
 */
 
 
 
 
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};



