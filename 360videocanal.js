var engine = null;
var scene = null;
var sceneToRender = null;
var canvas = document.getElementById("renderCanvas");

var startRenderLoop = (engine) => {
    engine.runRenderLoop(() => {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
};

var createDefaultEngine = () => new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });

var createScene = () => {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    dome = new BABYLON.VideoDome(
        "london_on_tower",
        ["./scenes/360london_on_tower_bridge.mp4"],
        {
            resolution: 16,
            clickToPlay: true,
            autoPlay: false,
        },
        scene
    );

    return scene;
};

initFunction = async () => {
    var asyncEngineCreation = async () => {
        try {
            return createDefaultEngine();
        } catch (e) {
            console.log("the available createEngine function failed. Creating the default engine instead");
            return createDefaultEngine();
        }
    };

    window.engine = await asyncEngineCreation();
    if (!engine) throw "engine should not be null.";
    startRenderLoop(engine);
    window.scene = createScene();
};

initFunction().then(() => {sceneToRender = scene;});

// Resize
window.addEventListener("resize", () => engine.resize());
