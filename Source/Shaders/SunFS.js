//This file is automatically rebuilt by the Cesium build process.
export default "uniform sampler2D u_texture;\n\
varying vec2 v_textureCoordinates;\n\
void main()\n\
{\n\
vec4 color = texture2D(u_texture, v_textureCoordinates);\n\
gl_FragColor = czm_gammaCorrect(color);\n\
}\n\
";
