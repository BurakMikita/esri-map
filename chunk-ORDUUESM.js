import{a as c}from"./chunk-TUP2BI5C.js";import{b as T}from"./chunk-HQLKOHVL.js";import{a as u}from"./chunk-PMVHKVIR.js";import{a as i}from"./chunk-Y4IDVYXW.js";import{a as x}from"./chunk-YX3UNFSQ.js";import{a as l}from"./chunk-K55TYFIP.js";import{a as r}from"./chunk-ZMBCTCSM.js";import{g as o}from"./chunk-6QJXCAOV.js";import{d}from"./chunk-VEYWSQAY.js";function C(t,n){return g(t,n)}function H(t,n){return g(t,n)}function g(t,n){let e=t.fragment,{hasVertexTangents:v,doubleSidedMode:f,hasNormalTexture:p,textureCoordinateType:w,bindType:m,hasNormalTextureTransform:s}=n;v?(t.attributes.add("tangent","vec4"),t.varyings.add("vTangent","vec4"),f===2?e.code.add(r`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):e.code.add(r`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):e.code.add(r`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`),p&&w!==0&&(t.include(T,n),e.uniforms.add(m===1?new l("normalTexture",a=>a.textureNormal):new x("normalTexture",a=>a.textureNormal)),s&&(e.uniforms.add(m===1?new u("scale",a=>a.scale??o):new i("scale",a=>a.scale??o)),e.uniforms.add(new c("normalTextureTransformMatrix",a=>a.normalTextureTransformMatrix??d))),e.code.add(r`vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
vec3 rawNormal = textureLookup(normalTexture, uv).rgb * 2.0 - 1.0;`),s&&e.code.add(r`mat3 normalRotation = mat3(normalTextureTransformMatrix[0][0]/scale[0], normalTextureTransformMatrix[0][1]/scale[1], 0.0,
normalTextureTransformMatrix[1][0]/scale[0], normalTextureTransformMatrix[1][1]/scale[1], 0.0,
0.0, 0.0, 0.0 );
rawNormal.xy = (normalRotation * vec3(rawNormal.x, rawNormal.y, 1.0)).xy;`),e.code.add(r`return tangentSpace * rawNormal;
}`))}export{C as a,H as b};
