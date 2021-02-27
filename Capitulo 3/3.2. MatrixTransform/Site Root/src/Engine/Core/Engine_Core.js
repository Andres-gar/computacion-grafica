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
    var initializeWebGL = function (htmlCanvasID) {
        var canvas = document.getElementById(htmlCanvasID);

        // obtiene el estandar o el WebGL experimental y enlaza al area del canvas
        // Almacena los resultados de la instancia de la variable mGL
        mGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
        }
        // Ahora inicializa el vertex buffer
        gEngine.VertexBuffer.initialize();
    };

    // Limpia el area de trabajo y dibuja un cuadrado
    var clearCanvas = function (color) {
        mGL.clearColor(color[0], color[1], color[2], color[3]); // setea el color 
        mGL.clear(mGL.COLOR_BUFFER_BIT); // limpia el color previo y setea
    };

    var mPublic = {
        getGL: getGL,
        initializeWebGL: initializeWebGL,
        clearCanvas: clearCanvas
    };
    return mPublic;
}());

