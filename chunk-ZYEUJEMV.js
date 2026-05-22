import{b as v}from"./chunk-HQLKOHVL.js";import{a as d}from"./chunk-XVDRQD57.js";import{a as f}from"./chunk-DK3KECNU.js";import{a as p}from"./chunk-IUFXCA3M.js";import{a as m}from"./chunk-YX3UNFSQ.js";import{a as u}from"./chunk-K55TYFIP.js";import{a as r,b as c}from"./chunk-ZMBCTCSM.js";function B(t,a){let s=a.pbrMode,e=t.fragment;if(s!==2&&s!==0&&s!==1)return void e.code.add(r`void applyPBRFactors() {}`);if(s===0)return void e.code.add(r`void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`);if(s===2)return void e.code.add(r`vec3 mrr = vec3(0.0, 0.6, 0.2);
float occlusion = 1.0;
void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`);let{hasMetallicRoughnessTexture:l,hasMetallicRoughnessTextureTransform:g,hasOcclusionTexture:n,hasOcclusionTextureTransform:h,bindType:i}=a;(l||n)&&t.include(v,a),e.code.add(r`vec3 mrr;
float occlusion;`),l&&e.uniforms.add(i===1?new u("texMetallicRoughness",o=>o.textureMetallicRoughness):new m("texMetallicRoughness",o=>o.textureMetallicRoughness)),n&&e.uniforms.add(i===1?new u("texOcclusion",o=>o.textureOcclusion):new m("texOcclusion",o=>o.textureOcclusion)),e.uniforms.add(i===1?new f("mrrFactors",o=>o.mrrFactors):new d("mrrFactors",o=>o.mrrFactors)),e.code.add(r`
    ${c(l,r`void applyMetallicRoughness(vec2 uv) {
            vec3 metallicRoughness = textureLookup(texMetallicRoughness, uv).rgb;
            mrr[0] *= metallicRoughness.b;
            mrr[1] *= metallicRoughness.g;
          }`)}

    ${c(n,"void applyOcclusion(vec2 uv) { occlusion *= textureLookup(texOcclusion, uv).r; }")}

    float getBakedOcclusion() {
      return ${n?"occlusion":"1.0"};
    }

    void applyPBRFactors() {
      mrr = mrrFactors;
      occlusion = 1.0;

      ${c(l,`applyMetallicRoughness(${g?"metallicRoughnessUV":"vuv0"});`)}
      ${c(n,`applyOcclusion(${h?"occlusionUV":"vuv0"});`)}
    }
  `)}function k(t,a){a.snowCover&&(t.uniforms.add(new p("snowCover",s=>s.snowCover)).code.add(r`float getSnow(vec3 normal, vec3 groundNormal) {
return smoothstep(0.5, 0.55, dot(normal, groundNormal)) * snowCover;
}
float getRealisticTreeSnow(vec3 faceNormal, vec3 shadingNormal, vec3 groundNormal) {
float snow = min(1.0, smoothstep(0.5, 0.55, dot(faceNormal, groundNormal)) +
smoothstep(0.5, 0.55, dot(-faceNormal, groundNormal)) +
smoothstep(0.0, 0.1, dot(shadingNormal, groundNormal)));
return snow * snowCover;
}`),t.code.add(r`vec3 applySnowToMRR(vec3 mrr, float snow) {
return mix(mrr, vec3(0.0, 1.0, 0.04), snow);
}`))}export{B as a,k as b};
