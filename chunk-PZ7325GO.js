import{a as p}from"./chunk-L37JVPEF.js";import{a as d}from"./chunk-C7RS4E7E.js";import{a as c}from"./chunk-J6SMZZK2.js";import{a as s}from"./chunk-HL3GROME.js";import{a as r}from"./chunk-ZMBCTCSM.js";var t=class extends s{constructor(a,e,i,n){super(a,"mat4",2,(w,h,v,f)=>w.setUniformMatrices4fv(a,e(h,v,f),n),i)}};function Z(o){o.fragment.uniforms.add(new p("shadowMapMatrix",(a,e)=>e.shadowMap.getShadowMapMatrices(a.origin),4)),m(o)}function y(o){o.fragment.uniforms.add(new t("shadowMapMatrix",(a,e)=>e.shadowMap.getShadowMapMatrices(a.origin),4)),m(o)}function m(o){let{fragment:a}=o;a.uniforms.add(new c("cascadeDistances",e=>e.shadowMap.cascadeDistances),new d("numCascades",e=>e.shadowMap.numCascades)),a.code.add(r`const vec3 invalidShadowmapUVZ = vec3(0.0, 0.0, -1.0);
vec3 lightSpacePosition(vec3 _vpos, mat4 mat) {
vec4 lv = mat * vec4(_vpos, 1.0);
lv.xy /= lv.w;
return 0.5 * lv.xyz + vec3(0.5);
}
vec2 cascadeCoordinates(int i, ivec2 textureSize, vec3 lvpos) {
float xScale = float(textureSize.y) / float(textureSize.x);
return vec2((float(i) + lvpos.x) * xScale, lvpos.y);
}
vec3 calculateUVZShadow(in vec3 _worldPos, in float _linearDepth, in ivec2 shadowMapSize) {
int i = _linearDepth < cascadeDistances[1] ? 0 : _linearDepth < cascadeDistances[2] ? 1 : _linearDepth < cascadeDistances[3] ? 2 : 3;
if (i >= numCascades) {
return invalidShadowmapUVZ;
}
mat4 shadowMatrix = i == 0 ? shadowMapMatrix[0] : i == 1 ? shadowMapMatrix[1] : i == 2 ? shadowMapMatrix[2] : shadowMapMatrix[3];
vec3 lvpos = lightSpacePosition(_worldPos, shadowMatrix);
if (lvpos.z >= 1.0 || lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) {
return invalidShadowmapUVZ;
}
vec2 uvShadow = cascadeCoordinates(i, shadowMapSize, lvpos);
return vec3(uvShadow, lvpos.z);
}`)}function O(o){o.fragment.code.add(r`float readShadowMapUVZ(vec3 uvzShadow, sampler2DShadow _shadowMap) {
return texture(_shadowMap, uvzShadow);
}`)}var l=class extends s{constructor(a,e){super(a,"sampler2DShadow",0,(i,n)=>i.bindTexture(a,e(n)))}};export{Z as a,y as b,O as c,l as d};
