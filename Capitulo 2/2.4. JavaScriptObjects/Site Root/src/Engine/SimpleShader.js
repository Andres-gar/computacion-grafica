function SimpleShader(vertexShaderID, fragmentShaderID) {
    // instancias de variables (convencion: todas las instancias de variables: mVariables)
    this.mCompiledShader = null;
    // Referencia del shader compilador en el contexto del webgl
    this.mShaderVertexPositionAttribute = null;
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
}

// Retorna un shader compilado desde un shader en el dom.
// El id es el id del script en el tag html.
SimpleShader.prototype._loadAndCompileShader = function (id, shaderType) {
    var shaderText, shaderSource, compiledShader;
    var gl = gEngine.Core.getGL();
    // Paso A: obtener el shader del Index.html
    shaderText = document.getElementById(id);
    shaderSource = shaderText.firstChild.textContent;
    // Paso B: Crear un shader basado en un tipo de shader o fragment
    compiledShader = gl.createShader(shaderType);
    // Paso C: Compile el shader creado
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);
    // Paso D: Revisar los errores y retornar los resultados 
    
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " +
            gl.getShaderInfoLog(compiledShader));
    }
    return compiledShader;
};

SimpleShader.prototype.activateShader = function () {
    var gl = gEngine.Core.getGL();
    gl.useProgram(this.mCompiledShader);
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
};

SimpleShader.prototype.getShader = function() { return this.mCompiledShader; };