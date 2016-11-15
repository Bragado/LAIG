/**
 * Node
 * @constructor
 */
function Node(Id, Scene) {
	this.material = [];
	this.materialIndex = 0;
	this.matrix = mat4.create();
	this.texture = "";
	this.root = "";
	this.childrensComponent = [];
	this.childrensPrimitives = [];
	this.id=Id;
	this.scene = Scene; 
	this.continue = true;
}


/**
 *	If there's a primitive it does its display otherwise, calls every compont child to do display 
 *
 */
Node.prototype.display = function() {
	
	if(!this.continue)
		return;

	this.scene.pushMatrix();
	
	this.scene.multMatrix(this.matrix);
	var material = this.scene.graph.materials[this.material[this.materialIndex % this.material.length]];
	if(material == undefined){
			
			this.continue = false;
			return;
		}
	

	
	
	for(var i = 0; i < this.childrensPrimitives.length; i++){
		if(this.texture != "none"){
		 
			material.setTexture(this.scene.graph.texture[this.texture][0]);
			material.apply();
		}
		
		if(this.scene.graph.primitives[this.childrensPrimitives[i]] == undefined){
			console.log("primitive " + this.childrensComponent[i] + " is not defined");
			this.continue = false;
			return;
		}
	if(this.texture != "none")
		this.scene.graph.primitives[this.childrensPrimitives[i]].updateTexturesAmpli(this.scene.graph.texture[this.texture][1], this.scene.graph.texture[this.texture][2]);
		this.scene.graph.primitives[this.childrensPrimitives[i]].display();	
		
		if(this.scene.graph.texture[this.texture] != "none"){
		 
			material.setTexture(null);
			material.apply();
		}
	}
	

	
	for(var i = 0; i < this.childrensComponent.length; i++){
		
		var child = this.scene.graph.components[this.childrensComponent[i]];
		if(this.scene.graph.components[this.childrensComponent[i]] == undefined){
			console.log("component " + this.childrensComponent[i] + " is not defined");
			this.continue = false;
			return;
		}

		this.scene.graph.components[this.childrensComponent[i]].display();
		
	}
	
	
	
	 
	this.scene.popMatrix();
	
};


/**
 * Set matrix 
 * @nt matrix
 */
Node.prototype.setMatrix = function(nt) {
	this.matrix = mat4.clone(nt);
};


/**
 * Adds a component child to this node 
 * @node component id
 */
Node.prototype.pushChildComponent = function(node) {
	this.childrensComponent.push(node);
};

/**
 * Adds a primitive child to this node 
 * @node primitive id
 */
Node.prototype.pushChildPrimitives = function(node) {
	this.childrensPrimitives.push(node);
};


/**
 * Adds a material to this node 
 * @materials material id
 */
Node.prototype.setMaterials = function(materials) {
	this.material.push(materials);
};

/**
 * Sets the parent of this node 
 * @root parent node id 
 */
Node.prototype.setRoot = function(root) {
	this.root = root;
}; 


/**
 * Sets the texture of this node 
 * @texture node id
 */
Node.prototype.setTexture = function(texture) {
	this.texture = texture;
};

/**
 * Moves material's pointer of this node
 * @node component id
 */
Node.prototype.updateMaterialIndex = function() {
	
	this.materialIndex++;

	
};

/**
 * Returns the current material of this node
 */
Node.prototype.getMaterial = function() {
	return material[materialIndex % material.length];
};

