"use strict";
var gGL = null;

function initializeGL() {
    // Se establece union con el elemento canvas
    var canvas = document.getElementById("GLCanvas");
    // Se vincula la variable gGL con el contexto WebGl
    gGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (gGL !== null) {
        gGL.clearColor(0.0, 0.8, 0.0, 1.0); // setea el color a ser borrado
    } else {
        document.write("<br><b>WebGL is not supported!</b>");
    }
}

function clearCanvas() {
    gGL.clear(gGL.COLOR_BUFFER_BIT); // limpiar el color previamente seteado
}

function doGLDraw() {
    initializeGL();
    clearCanvas();
}