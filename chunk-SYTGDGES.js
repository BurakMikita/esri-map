import{c as v,e as te}from"./chunk-PG3IB7WZ.js";import{a as re}from"./chunk-XBYTFNW2.js";import{a as ae}from"./chunk-X4HGYM5U.js";import{a as B}from"./chunk-F3P3YVDZ.js";import{a as E}from"./chunk-L6YEOV3T.js";import{b as J,c as X,d as Y,e as b}from"./chunk-DUTO7CRC.js";import{a as Z,c as ee}from"./chunk-7HCNNXBA.js";import{a as K,b as Q}from"./chunk-V3NGW635.js";import{a as j}from"./chunk-FMM7ICCH.js";import{a as V,c as N}from"./chunk-YSZDXGX7.js";import{a as oe}from"./chunk-L3VRDRYJ.js";import{a as R}from"./chunk-AU22D56B.js";import{f as F}from"./chunk-A2FJ55XA.js";import{a as x}from"./chunk-VGAXEXH3.js";import{a as W,b as H,c as I}from"./chunk-3QBD2465.js";import{a as k}from"./chunk-NTTAKPTW.js";import{a as _}from"./chunk-PIAEM5HF.js";import{a as G}from"./chunk-6V727XQP.js";import{a as U}from"./chunk-HQLKOHVL.js";import{a as q}from"./chunk-2OFKI5R7.js";import{a as g}from"./chunk-HL3GROME.js";import{a as e,b as i}from"./chunk-ZMBCTCSM.js";import{h as $}from"./chunk-WMGH7MKS.js";import{c as M,u as D}from"./chunk-G3M47L72.js";import{a as z}from"./chunk-JARU7KSM.js";import{a as A}from"./chunk-JJQR3F6K.js";function ie(o,a){o.varyings.add("tbnTangent","vec3"),o.varyings.add("tbnBiTangent","vec3"),a.spherical?o.vertex.code.add(e`void forwardVertexTangent(vec3 n) {
tbnTangent = normalize(cross(vec3(0.0, 0.0, 1.0), n));
tbnBiTangent = normalize(cross(n, tbnTangent));
}`):o.vertex.code.add(e`void forwardVertexTangent(vec3 n) {
tbnTangent = vec3(1.0, 0.0, 0.0);
tbnBiTangent = normalize(cross(n, tbnTangent));
}`),o.fragment.code.add(e`mat3 getTBNMatrix(vec3 n) {
return mat3(tbnTangent, tbnBiTangent, n);
}`)}var h=class extends Z{constructor(){super(...arguments),this.overlayOpacity=1}};function ne(o,a){let{vertex:u,fragment:r,varyings:t}=o;t.add("vtc","vec2"),u.uniforms.add(new O("texOffsetAndScale")),r.uniforms.add(new T("tex")),r.uniforms.add(new C("textureOpacities"));let{textureFadingEnabled:d,renderOccluded:y,tileBlendInput:w}=a,p=d&&!y;p&&(u.uniforms.add(new O("nextTexOffsetAndScale")),t.add("nvtc","vec2"),r.uniforms.add(new T("texNext")),r.uniforms.add(new C("nextTexOpacities")),r.uniforms.add(new P("fadeFactor")));let f=w===2;f&&r.include(re);let l=w===1;l&&r.uniforms.add(new C("backgroundColor")),u.code.add(e`
  void forwardTextureCoordinatesWithTransform(in vec2 uv) {
    vtc = texOffsetAndScale.xy + uv * texOffsetAndScale.zw;
    ${i(p,"nvtc = nextTexOffsetAndScale.xy + uv * nextTexOffsetAndScale.zw;")}
  }`),r.code.add(e`
    vec4 getColor(vec4 color, vec2 uv, vec3 opacities) {
      ${i(f||l,e`
          if (opacities.y <= 0.0) {
            return color * opacities.z * opacities.x;
          }
          vec4 bg = vec4(${l?e`backgroundColor`:e`gridColor(uv)`} * opacities.y, opacities.y);
          vec4 layer = color * opacities.z;
          return (bg * (1.0 - layer.a) + layer) * opacities.x;
        `,"return color;")}
    }`),p?r.code.add(e`vec4 getTileColor() {
vec4 color = getColor(texture(tex, vtc), vtc, textureOpacities);
if (fadeFactor >= 1.0) {
return color;
}
vec4 nextColor = getColor(texture(texNext, nvtc), nvtc, nextTexOpacities);
return mix(nextColor, color, fadeFactor);
}`):r.code.add(e`vec4 getTileColor() {
return getColor(texture(tex, vtc), vtc, textureOpacities);
}`)}var P=class extends g{constructor(a){super(a,"float")}},C=class extends g{constructor(a){super(a,"vec3")}},O=class extends g{constructor(a){super(a,"vec4")}},T=class extends g{constructor(a){super(a,"sampler2D")}};var L=class extends h{};function ce(o){let a=new q,{attributes:u,vertex:r,fragment:t,varyings:d}=a;u.add("position","vec3"),a.include(B,o),a.include(U,o);let y=()=>{a.include(ae,o),r.code.add(e`vec3 getNormal() {
float z = 1.0 - abs(normalCompressed.x) - abs(normalCompressed.y);
vec3 n = vec3(normalCompressed + vec2(normalCompressed.x >= 0.0 ? 1.0 : -1.0,
normalCompressed.y >= 0.0 ? 1.0 : -1.0) * min(z, 0.0), z);
return normalize(n);
}`)};H(r,o),a.include(j);let{output:w,overlayMode:p,tileBorders:f,transparencyMode:l,overlayEnabled:n}=o,S=l===2||l===3,se=o.pbrMode!==0,c=n&&S;switch(w){case 0:{a.include(ne,o),t.include(b,o),n&&a.include(v,o);let m=p===2;m&&a.include(ie,o),d.add("vnormal","vec3"),d.add("vpos","vec3",{invariant:!0}),d.add("vup","vec3"),y(),r.main.add(e`
          vpos = position;
          vec3 positionWorld = position + localOrigin;
          gl_Position = transformPosition(proj, view, vpos);
          vnormal = getNormal();
          vup = getLocalUp(position, localOrigin);
          ${i(m,e`forwardVertexTangent(vnormal);`)}

          forwardTextureCoordinatesWithTransform(uv0);
          ${i(n,"setOverlayVTC(uv0);")}
          ${i(f,"forwardTextureCoordinates();")}
          forwardLinearDepthToReadShadowMap();`),a.include(ee,o),t.include(F,o),t.include(b,o),t.include(J,o),a.include(oe,o),W(t,o),X(t),Y(t),t.uniforms.add(r.uniforms.get("localOrigin"),new _("viewDirection",({camera:s})=>D(le,M(le,s.viewMatrix[12],s.viewMatrix[13],s.viewMatrix[14])))),m&&t.uniforms.add(new G("ovWaterTex",s=>s.overlay?.getTexture(3)),new k("view",({origin:s},{camera:de})=>$(me,de.viewMatrix,s))),K(t),Q(t),t.main.add(e`
          vec3 normal = normalize(vnormal);
          float lightAlignment = dot(normal, mainLightDirection);

          float additionalAmbientScale = additionalDirectedAmbientLight(lightAlignment);
          float shadow = readShadow(additionalAmbientScale, vpos);
          float ssao = evaluateAmbientOcclusionInverse();
          vec4 tileColor = getTileColor();

          ${i(n,e`vec4 overlayColorOpaque = getOverlayColor(ovColorTex, vtcOverlay);
                   vec4 overlayColor = overlayOpacity * overlayColorOpaque;
                   ${i(S,`if (overlayColor.a < ${e.float(x)}) { discard; }`)}
                   vec4 groundColor = tileColor;
                   tileColor = tileColor * (1.0 - overlayColor.a) + overlayColor;`)}

          if(tileColor.a < ${e.float(x)}) {
            discard;
          }

          bool sliced = rejectBySlice(vpos);
          if (sliced) {
            tileColor *= groundSliceOpacity;
          }

          vec3 albedo = tileColor.rgb;

          // heuristic shading function used in the old terrain, now used to add ambient lighting
          vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

          ${se?e`vec4 finalColor = vec4(evaluatePBRSimplifiedLighting(normal, albedo, shadow, 1.0 - ssao, additionalLight, normalize(vpos - cameraPosition), vup), tileColor.a);`:e`vec4 finalColor = vec4(evaluateSceneLighting(normal, albedo, shadow, 1.0 - ssao, additionalLight), tileColor.a);`}
          ${i(m,e`vec4 overlayWaterMask = getOverlayColor(ovWaterTex, vtcOverlay);
                 float waterNormalLength = length(overlayWaterMask);
                 if (waterNormalLength > 0.95) {
                   mat3 tbnMatrix = mat3(tbnTangent, tbnBiTangent, vnormal);
                   vec4 waterOverlayColor = vec4(overlayColor.w > 0.0 ? overlayColorOpaque.xyz/overlayColor.w : vec3(1.0), overlayColor.w);
                   vec4 viewPosition = view * vec4(vpos, 1.0);
                   vec4 waterColorLinear = getOverlayWaterColor(overlayWaterMask, waterOverlayColor, -normalize(vpos - cameraPosition), shadow, vnormal, tbnMatrix, viewPosition.xyz,  vpos + localOrigin);
                   vec4 waterColorNonLinear = delinearizeGamma(vec4(waterColorLinear.xyz, 1.0));
                   float opacity = sliced ? groundSliceOpacity : 1.0;
                   // un-gamma the ground color to mix in linear space
                   finalColor = mix(groundColor, waterColorNonLinear, waterColorLinear.w) * opacity;
                 }`)}
          ${i(f,e`vec2 dVuv = fwidth(vuv0);
                 vec2 edgeFactors = smoothstep(vec2(0.0), 1.5 * dVuv, min(vuv0, 1.0 - vuv0));
                 float edgeFactor = 1.0 - min(edgeFactors.x, edgeFactors.y);
                 finalColor = mix(finalColor, vec4(1.0, 0.0, 0.0, 1.0), edgeFactor);`)}
          outputColorHighlightOLID(applySlice(finalColor, vpos), finalColor.rgb);`)}break;case 1:c&&a.include(v,o),r.main.add(e`
        ${i(c,"setOverlayVTC(uv0);")}
        gl_Position = transformPosition(proj, view, position);`),t.main.add(`${i(c,`if (getCombinedOverlayColor().a < ${e.float(x)}) discard;`)}`);break;case 3:case 4:case 5:case 6:case 7:a.include(E,o),V(a),N(a),r.main.add(e`gl_Position = transformPositionWithDepth(proj, view, position, nearFar, linearDepth);`),t.main.add(e`outputDepth(linearDepth);`);break;case 2:c&&a.include(v,o),d.add("vnormal","vec3"),I(r),y(),r.main.add(e`
        ${i(c,"setOverlayVTC(uv0);")}
        gl_Position = transformPosition(proj, view, position);
        vnormal = normalize((viewNormal * vec4(getNormal(), 1.0)).xyz);`),t.main.add(e`
        ${i(c,`if (getCombinedOverlayColor().a < ${e.float(x)}) discard;`)}
        vec3 normal = normalize(vnormal);
        if (gl_FrontFacing == false) {
          normal = -normal;
        }
        fragColor = vec4(vec3(0.5) + 0.5 * normal, 1.0);`);break;case 8:n&&(a.include(v,o),a.include(te,o)),r.main.add(e`
        ${i(n,"setOverlayVTC(uv0);")}
        gl_Position = transformPosition(proj, view, position);`),a.include(R,o),t.main.add(e`
        ${i(n,e`
           calculateOcclusionAndOutputHighlight(getAllOverlayHighlightValuesEncoded());`,"calculateOcclusionAndOutputHighlight();")}
      `);break;case 9:if(n)a.include(v,o),r.main.add(e`gl_Position = transformPosition(proj, view, position);
setOverlayVTC(uv0);`),t.main.add(e`fragColor = getOverlayColorTexel();`);else{let m=l===0;r.main.add(e`${i(m,"gl_Position = transformPosition(proj, view, position);")}`),t.main.add(e`fragColor = vec4(0.0);`)}}return a}var me=A(),le=z(),Je=Object.freeze(Object.defineProperty({__proto__:null,TerrainPassParameters:L,build:ce},Symbol.toStringTag,{value:"Module"}));export{L as a,ce as b,Je as c};
