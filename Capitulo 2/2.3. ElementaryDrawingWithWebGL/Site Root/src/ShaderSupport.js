var gSimpleShader = null;
var gShaderVertexPositionAttribute = null;

function loadAndCompileShader(id, shaderType) {
    var shaderText, shaderSource, compiledShader;

    // Paso A: Obtener el shader desde index.html
    shaderText = document.getElementById(id);
    shaderSource = shaderText.firstChild.textContent;

    // Paso B: Crear el shader ya sea vertice o fragmento.
    compiledShader = gGL.createShader(shaderType);

    // Paso C: Compilar la creación del shader
    gGL.shaderSource(compiledShader, shaderSource);
    gGL.compileShader(compiledShader);

    // Paso D: Revisar errores y resultados
    if (!gGL.getShaderParameter(compiledShader, gGL.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " +
            gGL.getShaderInfoLog(compiledShader));
    }

    return compiledShader;
}

function initSimpleShader(vertexShaderID, fragmentShaderID) {
    // Paso A: Carga y compila los vertices y los fragmentos shaders
    var vertexShader = loadAndCompileShader(vertexShaderID, gGL.VERTEX_SHADER);
    var fragmentShader = loadAndCompileShader(fragmentShaderID, gGL.FRAGMENT_SHADER);

    // Paso B: Crea y vincula los shaders dentro de un programa
    gSimpleShader = gGL.createProgram();
    gGL.attachShader(gSimpleShader, vertexShader);
    gGL.attachShader(gSimpleShader, fragmentShader);
    gGL.linkProgram(gSimpleShader);

    // Paso C: Revisa los errores
    if (!gGL.getProgramParameter(gSimpleShader, gGL.LINK_STATUS))
        alert("Error linking shader");

    // Paso D: Obten una referencia del atributo aSquareVertexPosition
    gShaderVertexPositionAttribute = gGL.getAttribLocation(gSimpleShader, "aSquareVertexPosition");

    // Paso E: Activa el vertex buffer cargado en VertexBuffer.js
    gGL.bindBuffer(gGL.ARRAY_BUFFER, gSquareVertexBuffer);

    // Paso F: Describe las caracteristicas de la posición del atributo vertex
    gGL.vertexAttribPointer(gShaderVertexPositionAttribute,
        3, // Cada vertice elemento es un 3-float (x,y,z)
        gGL.FLOAT, // Tipo de dato es FLOAT
        false, // Si el contenido es normalizado a vectores
        0, // Numero de bytes saltados entre elementos
        0); // Desplazamientos hacia el primer elemento
}