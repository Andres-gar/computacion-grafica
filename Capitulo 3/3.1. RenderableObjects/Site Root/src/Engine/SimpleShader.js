function SimpleShader(vertexShaderID, fragmentShaderID) {
    // instancias de variables (convencion: todas las instancias de variables: mVariables)
    this.mCompiledShader = null;
    // Referencia del shader compilador en el contexto del webgl
    this.mShaderVertexPositionAttribute = null;
    // Referencia al uniforme pixelColor en el shader de fragment
    this.mPixelColor = null;
    // Referencia de SquareVertexPosition en el shader
    var gl = gEngine.Core.getGL();
    // Empieza el codigo del constructor
    //
    // Paso A: Carga y compila vertex y fragment shader
    var vertexShader = this._loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);
    var fragmentShader = this._loadAndCompileShader(fragmentShaderID,
        gl.FRAGMENT_SHADER);

    // Paso B: Crea y enlazar los shaders dentro del programa
    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, vertexShader);
    gl.attachShader(this.mCompiledShader, fragmentShader);
    gl.linkProgram(this.mCompiledShader);
    // Paso C: Comprobar el error
    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
        alert("Error linking shader");
        return null;
    }
    // Paso D: Obtener una referencia del atributo de aSquareVertexPosition
    this.mShaderVertexPositionAttribute = gl.getAttribLocation(this.mCompiledShader,
        "aSquareVertexPosition");
    // Paso E: Activar el vertex buffer cargandolo en Engine.core_VertexBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());
    // Paso F: Describir la caracteristica del atributo de posicion del vertice
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute,
        3,
        gl.FLOAT,
        false,
        0,
        0);

    this.mPixelColor = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
}

// Retorna un shader compilado desde un shader en el dom.
// El id es el id del script en el tag html.
SimpleShader.prototype._loadAndCompileShader = function (filePath, shaderType) {
    var gl = gEngine.Core.getGL();
    var xmlReq, shaderSource = null, compiledShader = null;

    // Step A: Request the text from the given file location.
    xmlReq = new XMLHttpRequest();
    xmlReq.open('GET', filePath, false);
    try {
        xmlReq.send();
    } catch (error) {
        alert("Failed to load shader: " + filePath );
        return null;
    }
    shaderSource = xmlReq.responseText;

    if (shaderSource === null) {
        alert("WARNING: Loading of:" + filePath + " Failed!");
        return null;
    }

    // Step B: Create the shader based on the shader type: vertex or fragment
    compiledShader = gl.createShader(shaderType);

    // Step C: Compile the created shader
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);

    // Step D: check for errors and return results (null if error)
    // The log info is how shader compilation errors are typically displayed.
    // This is useful for debugging the shaders.
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " + gl.getShaderInfoLog(compiledShader));
    }

    return compiledShader;
};

SimpleShader.prototype.activateShader = function (pixelColor) {
    var gl = gEngine.Core.getGL();
    gl.useProgram(this.mCompiledShader);
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
    gl.uniform4fv(this.mPixelColor, pixelColor);
};

SimpleShader.prototype.getShader = function () { return this.mCompiledShader; };