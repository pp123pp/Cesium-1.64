//This file is automatically rebuilt by the Cesium build process.
export default "#ifdef GL_EXT_frag_depth\n\
#extension GL_EXT_frag_depth : enable\n\
#endif\n\
varying vec4 v_startPlaneNormalEcAndHalfWidth;\n\
varying vec4 v_endPlaneNormalEcAndBatchId;\n\
varying vec4 v_rightPlaneEC;\n\
varying vec4 v_endEcAndStartEcX;\n\
varying vec4 v_texcoordNormalizationAndStartEcYZ;\n\
#ifdef PER_INSTANCE_COLOR\n\
varying vec4 v_color;\n\
#endif\n\
void main(void)\n\
{\n\
float logDepthOrDepth = czm_branchFreeTernary(czm_sceneMode == czm_sceneMode2D, gl_FragCoord.z, czm_unpackDepth(texture2D(czm_globeDepthTexture, gl_FragCoord.xy / czm_viewport.zw)));\n\
vec3 ecStart = vec3(v_endEcAndStartEcX.w, v_texcoordNormalizationAndStartEcYZ.zw);\n\
if (logDepthOrDepth == 0.0) {\n\
#ifdef DEBUG_SHOW_VOLUME\n\
gl_FragColor = vec4(1.0, 0.0, 0.0, 0.5);\n\
return;\n\
#else // DEBUG_SHOW_VOLUME\n\
discard;\n\
#endif // DEBUG_SHOW_VOLUME\n\
}\n\
vec4 eyeCoordinate = czm_windowToEyeCoordinates(gl_FragCoord.xy, logDepthOrDepth);\n\
eyeCoordinate /= eyeCoordinate.w;\n\
float halfMaxWidth = v_startPlaneNormalEcAndHalfWidth.w * czm_metersPerPixel(eyeCoordinate);\n\
float widthwiseDistance = czm_planeDistance(v_rightPlaneEC, eyeCoordinate.xyz);\n\
float distanceFromStart = czm_planeDistance(v_startPlaneNormalEcAndHalfWidth.xyz, -dot(ecStart, v_startPlaneNormalEcAndHalfWidth.xyz), eyeCoordinate.xyz);\n\
float distanceFromEnd = czm_planeDistance(v_endPlaneNormalEcAndBatchId.xyz, -dot(v_endEcAndStartEcX.xyz, v_endPlaneNormalEcAndBatchId.xyz), eyeCoordinate.xyz);\n\
if (abs(widthwiseDistance) > halfMaxWidth || distanceFromStart < 0.0 || distanceFromEnd < 0.0) {\n\
#ifdef DEBUG_SHOW_VOLUME\n\
gl_FragColor = vec4(1.0, 0.0, 0.0, 0.5);\n\
return;\n\
#else // DEBUG_SHOW_VOLUME\n\
discard;\n\
#endif // DEBUG_SHOW_VOLUME\n\
}\n\
vec3 alignedPlaneNormal;\n\
alignedPlaneNormal = cross(v_rightPlaneEC.xyz, v_startPlaneNormalEcAndHalfWidth.xyz);\n\
alignedPlaneNormal = normalize(cross(alignedPlaneNormal, v_rightPlaneEC.xyz));\n\
distanceFromStart = czm_planeDistance(alignedPlaneNormal, -dot(alignedPlaneNormal, ecStart), eyeCoordinate.xyz);\n\
alignedPlaneNormal = cross(v_rightPlaneEC.xyz, v_endPlaneNormalEcAndBatchId.xyz);\n\
alignedPlaneNormal = normalize(cross(alignedPlaneNormal, v_rightPlaneEC.xyz));\n\
distanceFromEnd = czm_planeDistance(alignedPlaneNormal, -dot(alignedPlaneNormal, v_endEcAndStartEcX.xyz), eyeCoordinate.xyz);\n\
#ifdef PER_INSTANCE_COLOR\n\
gl_FragColor = czm_gammaCorrect(v_color);\n\
#else // PER_INSTANCE_COLOR\n\
float s = clamp(distanceFromStart / (distanceFromStart + distanceFromEnd), 0.0, 1.0);\n\
s = (s * v_texcoordNormalizationAndStartEcYZ.x) + v_texcoordNormalizationAndStartEcYZ.y;\n\
float t = (widthwiseDistance + halfMaxWidth) / (2.0 * halfMaxWidth);\n\
czm_materialInput materialInput;\n\
materialInput.s = s;\n\
materialInput.st = vec2(s, t);\n\
materialInput.str = vec3(s, t, 0.0);\n\
czm_material material = czm_getMaterial(materialInput);\n\
gl_FragColor = vec4(material.diffuse + material.emission, material.alpha);\n\
#endif // PER_INSTANCE_COLOR\n\
czm_writeDepthClampedToFarPlane();\n\
}\n\
";
