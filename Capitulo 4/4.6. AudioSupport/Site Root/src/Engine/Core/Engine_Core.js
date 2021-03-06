"use strict"; // Operate in Strict mode
var gEngine = gEngine || {};
// inicializa la variable mientras se aseura que no esta definida

gEngine.Core = (function () {
    // Variable privada, define el contexto 
    var mGL = null;
    // Accesso al contexto WebGL
    var getGL = function () { return mGL; };
    // Contiene las funciones y variable que seran accesibles
    var mPublic = {
        getGL: getGL
    };
    // inicializa el WebGL, el vertex buffer y compila los shaders
    var _initializeWebGL = function (htmlCanvasID) {
        var canvas = document.getElementById(htmlCanvasID);

        mGL = canvas.getContext("webgl") ||
            canvas.getContext("experimental-webgl");

        if (mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
        }
    };

    // initialize all of the EngineCore components
    var initializeEngineCore = function (htmlCanvasID, myGame) {
        _initializeWebGL(htmlCanvasID);
        gEngine.VertexBuffer.initialize();
        gEngine.Input.initialize();
        gEngine.AudioClips.initAudioContext();

        // Inits DefaultResources, when done, invoke the anonymous function to call startScene(myGame).
        gEngine.DefaultResources.initialize(function () { startScene(myGame); });
    };

    var startScene = function (myGame) {
        myGame.loadScene.call(myGame); // Called in this way to keep correct context
        gEngine.GameLoop.start(myGame); // start the game loop after initialization
    };

    // Limpia el area de trabajo y dibuja un cuadrado
    var clearCanvas = function (color) {
        mGL.clearColor(color[0], color[1], color[2], color[3]); // setea el color 
        mGL.clear(mGL.COLOR_BUFFER_BIT); // limpia el color previo y setea
    };

    var inheritPrototype = function (subClass, superClass) {
        var prototype = Object.create(superClass.prototype);
        prototype.constructor = subClass;
        subClass.prototype = prototype;
    };

    var mPublic = {
        getGL: getGL,
        initializeEngineCore: initializeEngineCore,
        clearCanvas: clearCanvas,
        inheritPrototype: inheritPrototype,
        startScene: startScene
    };
    return mPublic;
}());

