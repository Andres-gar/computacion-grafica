"use strict";
var gGL = null;

function initializeGL() {
    // Se establece union con el elemento canvas
    var canvas = document.getElementById("GLCanvas");
    // Se vincula la variable gl con el contexto WebGl
    gGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (gGL !== null) {
        gGL.clearColor(0.0, 0.8, 0.0, 1.0); // setea el color a ser borrado
        // A. Inicializar el vertex buffer
        initSquareBuffer();
        // B. Ahora cargamos y compilamos el vertex y fragment shaders
        initSimpleShader("VertexShader", "FragmentShader");
        // Los dos shaders son definidos index.html file
        // initSimpleShader() la funcion es definida en ShaderSupport.js
    } else {
        document.write("<br><b>WebGL is not supported!</b>");
    }
}

function drawSquare() {
    gGL.clear(gGL.COLOR_BUFFER_BIT);
    // Paso A: Activar shaders a usar
    gGL.useProgram(gSimpleShader);

    // Paso B: Habilitar el atributo de posición de vertice
    gGL.enableVertexAttribArray(gShaderVertexPositionAttribute);

    // Paso C: Dibujar con la configuración anterior
    gGL.drawArrays(gGL.TRIANGLE_STRIP, 0, 4);
}

function doGLDraw() {
    initializeGL();
    drawSquare(); // Limpiar el area y dibujar un cuadrado
}