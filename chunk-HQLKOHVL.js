import{a as g}from"./chunk-2AVDPHAQ.js";import{f as l}from"./chunk-Z4ZVOZG5.js";import{a as x}from"./chunk-XVDRQD57.js";import{a as f}from"./chunk-DK3KECNU.js";import{a as w}from"./chunk-7HEBMXF6.js";import{a as T}from"./chunk-YX3UNFSQ.js";import{a as C}from"./chunk-K55TYFIP.js";import{a as p}from"./chunk-B2KD3GMI.js";import{a as t,b as a}from"./chunk-ZMBCTCSM.js";function U(e,r){switch(r.textureCoordinateType){case 1:return e.attributes.add("uv0","vec2"),e.varyings.add("vuv0","vec2"),void e.vertex.code.add(t`void forwardTextureCoordinates() { vuv0 = uv0; }`);case 2:return e.attributes.add("uv0","vec2"),e.attributes.add("uvRegion","vec4"),e.varyings.add("vuv0","vec2"),e.varyings.add("vuvRegion","vec4"),void e.vertex.code.add(t`void forwardTextureCoordinates() {
vuv0 = uv0;
vuvRegion = uvRegion;
}`);default:r.textureCoordinateType;case 0:return void e.vertex.code.add(t`void forwardTextureCoordinates() {}`);case 3:return}}function y(e){e.fragment.code.add(t`vec4 textureAtlasLookup(sampler2D tex, vec2 textureCoordinates, vec4 atlasRegion) {
vec2 atlasScale = atlasRegion.zw - atlasRegion.xy;
vec2 uvAtlas = fract(textureCoordinates) * atlasScale + atlasRegion.xy;
float maxdUV = 0.125;
vec2 dUVdx = clamp(dFdx(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
vec2 dUVdy = clamp(dFdy(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
return textureGrad(tex, uvAtlas, dUVdx, dUVdy);
}`)}function b(e,r){let{textureCoordinateType:s}=r;if(s===0||s===3)return;e.include(U,r);let i=s===2;i&&e.include(y),e.fragment.code.add(t`
    vec4 textureLookup(sampler2D tex, vec2 uv) {
      return ${i?"textureAtlasLookup(tex, uv, vuvRegion)":"texture(tex, uv)"};
    }
  `)}var K=1,V=1;function M(e,r){if(!l(r.output))return;e.fragment.include(w);let{emissionSource:s,hasEmissiveTextureTransform:i,bindType:m}=r,n=s===3||s===4||s===5;n&&(e.include(b,r),e.fragment.uniforms.add(m===1?new C("texEmission",o=>o.textureEmissive):new T("texEmission",o=>o.textureEmissive)));let v=s===2||n;v&&e.fragment.uniforms.add(m===1?new f("emissiveBaseColor",o=>o.emissiveBaseColor):new x("emissiveBaseColor",o=>o.emissiveBaseColor));let u=s!==0;u&&!(s===7||s===6||s===4||s===5)&&e.fragment.uniforms.add(m===1?new p("emissiveStrength",o=>o.emissiveStrength??0):new g("emissiveStrength",o=>o.emissiveStrength??0));let d=s===7,c=s===5,S=s===1||s===6||d;e.fragment.code.add(t`
    vec4 getEmissions(vec3 symbolColor) {
      vec4 emissions = ${v?c?"emissiveSource == 0 ? vec4(emissiveBaseColor, 1.0): vec4(linearizeGamma(symbolColor), 1.0)":"vec4(emissiveBaseColor, 1.0)":S?d?"emissiveSource == 0 ? vec4(0.0): vec4(linearizeGamma(symbolColor), 1.0)":"vec4(linearizeGamma(symbolColor), 1.0)":"vec4(0.0)"};
      ${a(n,`${a(c,`if(emissiveSource == 0) {
              vec4 emissiveFromTex = textureLookup(texEmission, ${i?"emissiveUV":"vuv0"});
              emissions *= vec4(linearizeGamma(emissiveFromTex.rgb), emissiveFromTex.a);
           }`,`vec4 emissiveFromTex = textureLookup(texEmission, ${i?"emissiveUV":"vuv0"});
           emissions *= vec4(linearizeGamma(emissiveFromTex.rgb), emissiveFromTex.a);`)}
        emissions.w = emissions.rgb == vec3(0.0) ? 0.0: emissions.w;`)}
      ${a(u,`emissions.rgb *= emissiveStrength * ${t.float(V)};`)}
      return emissions;
    }
  `)}export{U as a,b,K as c,M as d};
