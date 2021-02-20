"use strict";
var gSquareVertexBuffer = null;

function initSquareBuffer() {

    // Primero: Definifimos los vertices para un cuadrado
    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];

    // Paso A: Crear un buffer en el contexto gGL para nuestas posiciones del vertex
    gSquareVertexBuffer = gGL.createBuffer();
    // Pasp B: Activar vertexBuffer
    gGL.bindBuffer(gGL.ARRAY_BUFFER, gSquareVertexBuffer);
    // Paso C: Cargar verticesOfSquare dentro del vertexBuffer
    gGL.bufferData(gGL.ARRAY_BUFFER, new Float32Array(verticesOfSquare),
        gGL.STATIC_DRAW);
}