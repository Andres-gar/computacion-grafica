attribute vec3 aSquareVertexPosition;   // Vertex shader expects one vertex position
attribute vec2 aTextureCoordinate;      // This is the texture coordinate attribute
varying vec2 vTexCoord;
uniform mat4 uModelTransform;
uniform mat4 uViewProjTransform;

void main(void) { 
    gl_Position = uViewProjTransform * uModelTransform * vec4(aSquareVertexPosition, 1.0); 
    vTexCoord = aTextureCoordinate;
}
