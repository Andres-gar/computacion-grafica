"use strict"; // Operate in Strict mode
var gEngine = gEngine || {};
// Objecto de VertexBuffer
gEngine.VertexBuffer = (function () {

    // Primero: se define el vertice para a un cuadrado
    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];
    // Rereferencia la posicion del vertice para el cuadrado en el contexto de GL
    var mSquareVertexBuffer = null;
    var getGLVertexRef = function () { return mSquareVertexBuffer; };
    var initialize = function () {
        var gl = gEngine.Core.getGL();
        // Paso A: Crear un buffer dentro del contexto gGL para nuestras posiciones de vertices
        mSquareVertexBuffer = gl.createBuffer();
        // Paso B: Activar el VertexBuffer
        gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);
        // Paso C: Cargar verticesOfSquare dentro del vertexBuffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare),
            gl.STATIC_DRAW);
    };
    var mPublic = {
        initialize: initialize,
        getGLVertexRef: getGLVertexRef
    };
    return mPublic;
}());