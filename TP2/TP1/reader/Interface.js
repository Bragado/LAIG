/**
 * MyInterface
 * @constructor
 */


function  Interface() {
    //call CGFinterface constructor
    CGFinterface.call(this);
};


Interface.prototype = Object.create(CGFinterface.prototype);
Interface.prototype.constructor = Interface;

/**
 *	Creation of the toggle for the different types of ligths 
 * @param application
 */
Interface.prototype.init = function(application) {
	
	CGFinterface.prototype.init.call(this, application);

    this.gui = new dat.GUI();

    this.omni = this.gui.addFolder("Omnilights");
    this.omni.open();

    this.spot = this.gui.addFolder("Spotlights");
    this.spot.open();

    return true;
	
	
};

/**
 *	Addition of every light 
 * @param type of ligth "omni" or "spot" 
 * @param i index of the light in this.scene.lights[i]
 * @param id "name" of the light 
 */

Interface.prototype.addLight = function(type, i, id) {
	
	if(type == "spot")
		this.spot.add(this.scene.lightStatus, i, this.scene.lightStatus[i]).name(id);
	
	else if(type == "omni")
		this.omni.add(this.scene.lightStatus, i, this.scene.lightStatus[i]).name(id);
	
};



/**
 * receives events in order to change view or material 
 * @param event
 */
Interface.prototype.processKeyDown = function(event) {


    switch (event.keyCode) {
        case (86):
        case (118): //V
            this.scene.updateView();
            break;
        case (77):
        case (109): //M
            this.scene.updateMaterials(this.scene.graph.rootNode);
            break;
    };
};
