import{b as D}from"./chunk-ZWU3SUNJ.js";import{a as I}from"./chunk-63XBOVX6.js";import{a as w,b as V}from"./chunk-V3NGW635.js";import{a as C}from"./chunk-AU22D56B.js";import{f as O}from"./chunk-Z4ZVOZG5.js";import{a as g}from"./chunk-K55TYFIP.js";import{a as T}from"./chunk-B2KD3GMI.js";import{a as x}from"./chunk-HL3GROME.js";import{a as c}from"./chunk-ZMBCTCSM.js";import{a as h}from"./chunk-OFITSWDI.js";import{n as f,o as m,q as p}from"./chunk-YQZGBNAR.js";var v=class extends x{constructor(e,l,a){super(e,"vec4",2,(r,t,s)=>r.setUniform4fv(e,l(t,s),a))}};function K(o,e){let{vertex:l,fragment:a}=o;l.uniforms.add(new v("overlayTexOffset",(r,t)=>U(e.spherical,r,t)),new v("overlayTexScale",(r,t)=>b(e.spherical,r,t))),a.uniforms.add(new v("overlayTexOffset",(r,t)=>U(e.spherical,r,t)),new v("overlayTexScale",(r,t)=>b(e.spherical,r,t))),a.constants.add("overlayOpacity","float",1),a.uniforms.add(new g("ovColorTex",(r,t)=>z(r,t))),S(o,e)}function z(o,e){return o.identifier===0&&O(o.output)?o.occludedGround?e.overlay?.allSourcesOccluders?e.overlay?.getTexture(1):e.overlay?.getTexture(4):e.overlay?.getTexture(1):o.identifier===0&&o.output===9?e.overlay?.getTexture(5):o.identifier===2?e.overlay?.getTexture(2):null}function Q(o,e){let{vertex:l,fragment:a}=o;l.uniforms.add(new y("overlayTexOffset"),new y("overlayTexScale")),a.uniforms.add(new T("overlayOpacity",r=>r.overlayOpacity)),e.output!==8&&a.uniforms.add(new g("ovColorTex",(r,t)=>t.overlay?.getTexture(r.overlayContent))),S(o,e)}function R(o,e){switch(o){case 0:return e.slot!==10||e.overlay?.allSourcesOccluders?0:4;case 1:case 2:return 0;case 8:return 2;case 3:case 5:case 6:case 7:return null;case 9:return 5}return null}function S(o,e){let{hasWater:l,output:a}=e;l&&o.include(D,e);let{vertex:r,fragment:t,varyings:s}=o;s.add("vtcOverlay","vec4");let n=a===8;r.code.add(c`void setOverlayVTC(in vec2 uv) {
vtcOverlay = vec4(uv, uv) * overlayTexScale + overlayTexOffset;
}`),t.code.add(c`bool isValid(vec2 uv, vec2 dxdy) {
return (uv.x >= 0.0 + dxdy.x) && (uv.x <= 1.0 - dxdy.x) && (uv.y >= 0.0 + dxdy.y) && (uv.y <= 1.0 - dxdy.y);
}
vec4 getOverlayColor(sampler2D ov0Tex, vec4 texCoords) {
vec4 color0 = texture(ov0Tex, vec2(texCoords.x * 0.5, texCoords.y));
vec4 color1 = texture(ov0Tex, vec2(texCoords.z * 0.5 + 0.5, texCoords.w));
bool isValid0 = isValid(texCoords.xy, fwidth(texCoords.xy));
bool isValid1 = isValid(texCoords.zw, vec2(0.0, 0.0));
return mix(color1 * float(isValid1), color0, float(isValid0));
}`),n?t.uniforms.add(new I("overlayHighlightTexture",(u,d)=>d.overlay?.getTexture(2))).code.add(c`uvec2 getAllOverlayHighlightValuesEncoded() {
vec4 texCoords = vtcOverlay;
vec2 uvInner = texCoords.xy;
vec2 uvOuter = texCoords.zw;
bool isValidInner = isValid(uvInner, fwidth(uvInner));
bool isValidOuter = isValid(uvOuter, vec2(0.0, 0.0));
vec2 texelCoordInner = uvInner * vec2(0.5, 1.0);
vec2 texelCoordOuter = uvOuter * vec2(0.5, 1.0) + vec2(0.5,0.0);
vec2 texDim =  vec2(textureSize(overlayHighlightTexture, 0));
uvec2 texelValueInner = texelFetch(overlayHighlightTexture, ivec2(texelCoordInner * texDim), 0).rg;
uvec2 texelValueOuter = texelFetch(overlayHighlightTexture, ivec2(texelCoordOuter * texDim), 0).rg;
return
isValidInner ? texelValueInner :
isValidOuter ? texelValueOuter :
uvec2(0);
}`):(t.code.add(c`vec4 getCombinedOverlayColor() {
return overlayOpacity * getOverlayColor(ovColorTex, vtcOverlay);
}`),t.code.add(c`vec4 getOverlayColorTexel() {
vec4 texCoords = vtcOverlay;
vec2 texDim =  vec2(textureSize(ovColorTex, 0));
vec4 color0 = texelFetch(ovColorTex, ivec2(vec2(texCoords.x * 0.5, texCoords.y) * texDim), 0);
vec4 color1 = texelFetch(ovColorTex, ivec2(vec2(texCoords.z * 0.5 + 0.5, texCoords.w) * texDim), 0);
bool isValid0 = isValid(texCoords.xy, fwidth(texCoords.xy));
bool isValid1 = isValid(texCoords.zw, vec2(0.0, 0.0));
return mix(color1 * float(isValid1), color0, float(isValid0));
}`)),l&&(w(t),V(t),t.code.add(c`vec4 getOverlayWaterColor(vec4 maskInput, vec4 colorInput, vec3 vposEyeDir,
float shadow, vec3 localUp, mat3 tbn, vec3 position, vec3 positionWorld) {
vec3 n = normalize(tbn *  (2.0 * maskInput.rgb - vec3(1.0)));
vec3 v = vposEyeDir;
vec3 final = getWaterColor(n, v, mainLightDirection, colorInput.rgb, mainLightIntensity, localUp, 1.0 - shadow, maskInput.w, position, positionWorld);
return vec4(final, colorInput.w);
}`))}function F(o,e){return o.overlay?.overlays[e]?.extent}function U(o,e,l){let a=H,r=o&&!e.useENUForGlobalOverlayUV,t=r?0:e.toMapSpace[0],s=r?0:e.toMapSpace[1],n=(u,d)=>{let i=F(l,d);p(i)&&(a[u+0]=(t-i[0])/f(i),a[u+1]=(s-i[1])/m(i))};return n(0,0),n(2,1),a}function b(o,e,l){let a=H,r=o&&!e.useENUForGlobalOverlayUV,t=r?1:e.toMapSpace[2],s=r?1:e.toMapSpace[3],n=(u,d)=>{let i=F(l,d);p(i)&&(a[u+0]=t/f(i),a[u+1]=s/m(i))};return n(0,0),n(2,1),a}var H=h(),y=class extends x{constructor(e){super(e,"vec4")}};function _(o,e){e.output===8&&(o.include(C,e),o.fragment.code.add(c`
    void calculateOcclusionAndOutputHighlight(uvec2 highlightToAdd) {
      uint levelBits = readLevelBits(highlightToAdd, highlightLevel);
      if ((levelBits & 1u) == 0u) discard;
      outputHighlight(isHighlightOccluded());
    }
  `))}export{v as a,K as b,Q as c,R as d,_ as e};
