const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas,true);
var createScene = function () {
// This creates a basic Babylon Scene object (non-mesh)
var scene = new BABYLON.Scene(engine);

// This creates and positions a free camera (non-mesh)
const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 180, new BABYLON.Vector3(0, 0, 0));

// This attaches the camera to the canvas
camera.attachControl(canvas, true);

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(-1, 1, 0), scene);

// Default intensity is 1. Let's dim the light a small amount
light.intensity = 0.8;
// Import rabbit
var rabit = BABYLON.SceneLoader.ImportMesh("", "./scenes/", "Rabbit.babylon");
	
// Ground
var ground = BABYLON.MeshBuilder.CreateGround("ground", {width:600, height:600}, scene);
var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
groundMaterial.diffuseTexture = new BABYLON.Texture("./textures/grass.png", scene);
ground.material = groundMaterial;

// Sky
var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
skyboxMaterial.backFaceCulling = false;
skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./textures/skybox", scene);
skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
skybox.material = skyboxMaterial;	


scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
scene.collisionsEnabled = true;
camera.checkCollisions = true;
camera.applyGravity = true;
//Set the ellipsoid around the camera (e.g. your player's size)

ground.checkCollisions = true;

return scene;	

};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
}
);