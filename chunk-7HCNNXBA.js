import{a as p,b as c,c as h,d as w}from"./chunk-PZ7325GO.js";import{b as l}from"./chunk-YSZDXGX7.js";import{a as s}from"./chunk-L7NOU4T2.js";import{f as i}from"./chunk-Z4ZVOZG5.js";import{a as n}from"./chunk-IUFXCA3M.js";import{a as r,b as t}from"./chunk-ZMBCTCSM.js";import{a as d}from"./chunk-JARU7KSM.js";function m(a,o){let e=i(o.output)&&o.receiveShadows;e&&l(a,!0),a.vertex.code.add(r`
    void forwardLinearDepthToReadShadowMap() { ${t(e,"forwardLinearDepth(gl_Position.w);")} }
  `)}var f=class extends s{constructor(){super(...arguments),this.origin=d()}};function Z(a,o){o.receiveShadows&&a.include(p),u(a,o)}function A(a,o){o.receiveShadows&&a.include(c),u(a,o)}function u(a,o){a.fragment.uniforms.add(new n("lightingGlobalFactor",g=>g.lighting.globalFactor));let{receiveShadows:e,spherical:S}=o;a.include(m,o),e&&M(a),a.fragment.code.add(r`
    float readShadow(float additionalAmbientScale, vec3 vpos) {
      return ${e?"max(lightingGlobalFactor * (1.0 - additionalAmbientScale), readShadowMap(vpos, linearDepth))":t(S,"lightingGlobalFactor * (1.0 - additionalAmbientScale)","0.0")};
    }
  `)}function M(a){a.include(h),a.fragment.uniforms.add(new w("shadowMap",({shadowMap:o})=>o.depthTexture)).code.add(r`float readShadowMap(const in vec3 _worldPos, float _linearDepth) {
vec3 uvzShadow = calculateUVZShadow(_worldPos, _linearDepth, textureSize(shadowMap,0));
if (uvzShadow.z < 0.0) {
return 0.0;
}
return readShadowMapUVZ(uvzShadow, shadowMap);
}`)}export{f as a,Z as b,A as c};
