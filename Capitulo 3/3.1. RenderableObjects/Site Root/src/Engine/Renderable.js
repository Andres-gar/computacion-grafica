function Renderable(shader) {
    this.mShader = shader; // El sombreador para sombrear este objeto
    this.mColor = [1, 1, 1, 1]; // Color para el sombreador de fragmentos
}

Renderable.prototype.draw = function () {
    var gl = gEngine.Core.getGL();
    this.mShader.activateShader(this.mColor);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

Renderable.prototype.setColor = function(color) { this.mColor = color; };
Renderable.prototype.getColor = function() { return this.mColor; };