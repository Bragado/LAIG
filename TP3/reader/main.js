//From https://github.com/EvanHahn/ScriptInclude
include=function(){function f(){var a=this.readyState;(!a||/ded|te/.test(a))&&(c--,!c&&e&&d())}var a=arguments,b=document,c=a.length,d=a[c-1],e=d.call;e&&c--;for(var g,h=0;c>h;h++)g=b.createElement("script"),g.src=arguments[h],g.async=!0,g.onload=g.onerror=g.onreadystatechange=f,(b.head||b.getElementsByTagName("head")[0]).appendChild(g)};
serialInclude=function(a){var b=console,c=serialInclude.l;if(a.length>0)c.splice(0,0,a);else b.log("Done!");if(c.length>0){if(c[0].length>1){var d=c[0].splice(0,1);b.log("Loading "+d+"...");include(d,function(){serialInclude([]);});}else{var e=c[0][0];c.splice(0,1);e.call();};}else b.log("Finished.");};serialInclude.l=new Array();

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return vars;
}	 

serialInclude(['../lib/CGF.js', 'XMLscene.js', 'MySceneGraph.js', 'Node.js', 'game/Filme_State.js','game/Connection.js','game/Transition.js', 'game/Menus_State.js',  'game/Constroi_Tab_State.js', 'game/Board.js', 'game/Peca.js', 'game/Tile.js', 'game/EmJogo_State.js' , 'primitives/Rectangle.js', 'primitives/Cylinder.js', 'primitives/Torus.js', 'primitives/Triangle.js', 'primitives/Sphere.js', 'primitives/CylinderSurface.js', 'primitives/CylinderBase.js', 'primitives/reversedSphere.js', 'primitives/Cruz.js', 'primitives/Cube.js', 'Interface.js', 'howler.js', 'animations/Animation.js', 'animations/LinearAnimation.js', 'animations/CircularAnimation.js', 'primitives/Plane.js', 'primitives/Patch.js', 'primitives/Crono.js', 'primitives/ChessBoard.js', 'primitives/Vehicle.js', 'shaders/flat.frag', 'shaders/flat.vert', 'shaders/piece.frag' , 'shaders/piece.vert' , 'shaders/jogador.frag' , 'shaders/jogador.vert' ,

main=function()
{
	// Standard application, scene and interface setup
    var app = new CGFapplication(document.body);
    var myScene = new XMLscene();
    var myInterface = new Interface();
	//var sound = new Howl({src: ['sound.mp3'], autoplay: true, loop: true});

    app.init();

    app.setScene(myScene);
    app.setInterface(myInterface);

    myInterface.setActiveCamera(myScene.camera);
	
	
	
	
	// get file name provided in URL, e.g. http://localhost/myproj/?file=myfile.xml 
	// or use "demo.xml" as default (assumes files in subfolder "scenes", check MySceneGraph constructor) 
	
	var filename=getUrlVars()['chess1.dsx'] || "chess1.dsx";

	// create and load graph, and associate it to scene. 
	// Check console for loading errors
	var myGraph = new MySceneGraph(filename, myScene, myInterface);
	
	// start
    app.run();
}

]);