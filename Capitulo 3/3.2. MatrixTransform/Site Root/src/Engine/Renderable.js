function Renderable(shader) {
    this.mShader = shader; // El sombreador para sombrear este objeto
    this.mColor = [1, 1, 1, 1]; // Color para el sombreador de fragmentos
}

Renderable.prototype.draw = function (modelTransform) {
    var gl = gEngine.Core.getGL();
    this.mShader.activateShader(this.mColor);
    this.mShader.loadObjectTransform(modelTransform);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

Renderable.prototype.setColor = function(color) { this.mColor = color; };
Renderable.prototype.getColor = function() { return this.mColor; };