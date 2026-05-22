import{a as z}from"./chunk-ORDUUESM.js";import{a as Z}from"./chunk-DNGZPLUY.js";import{a as P,b as D,c as R,d as $,e as W}from"./chunk-JT4DTOSB.js";import{a as b,d as _}from"./chunk-FEY624O3.js";import{a as U}from"./chunk-F3P3YVDZ.js";import{a as J,b as io}from"./chunk-ZYEUJEMV.js";import{b as H,c as q,d as Q,e as X}from"./chunk-DUTO7CRC.js";import{b as oo,c as ro}from"./chunk-7HCNNXBA.js";import{a as Y}from"./chunk-HCD7ZHOM.js";import{b as K}from"./chunk-V3NGW635.js";import{f as M}from"./chunk-L6UEA2VL.js";import{a as ao}from"./chunk-BPRPPUCD.js";import{b as B}from"./chunk-MFARE4G4.js";import{a as I}from"./chunk-WZREUFT5.js";import{a as O,d as S,e as k}from"./chunk-DJSBN5WX.js";import{a as N}from"./chunk-FMM7ICCH.js";import{a as to}from"./chunk-L3VRDRYJ.js";import{a as eo}from"./chunk-ZPRRJLBJ.js";import{a as d}from"./chunk-TUP2BI5C.js";import{f as y}from"./chunk-A2FJ55XA.js";import{a as F}from"./chunk-VGAXEXH3.js";import{a as p,b as L}from"./chunk-3QBD2465.js";import{a as E}from"./chunk-JYIOFSCM.js";import{a as A}from"./chunk-HQLKOHVL.js";import{f as V}from"./chunk-Z4ZVOZG5.js";import{a as v}from"./chunk-DK3KECNU.js";import{a as G}from"./chunk-2OFKI5R7.js";import{a as j}from"./chunk-K55TYFIP.js";import{a as x}from"./chunk-B2KD3GMI.js";import{a as e,b as s}from"./chunk-ZMBCTCSM.js";import{d as l}from"./chunk-VEYWSQAY.js";function so(o,r){r.hasColorTextureTransform?(o.varyings.add("colorUV","vec2"),o.vertex.uniforms.add(new d("colorTextureTransformMatrix",i=>i.colorTextureTransformMatrix??l)).code.add(e`void forwardColorUV(){
colorUV = (colorTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):o.vertex.code.add(e`void forwardColorUV(){}`)}function no(o,r){r.hasNormalTextureTransform&&r.textureCoordinateType!==0?(o.varyings.add("normalUV","vec2"),o.vertex.uniforms.add(new d("normalTextureTransformMatrix",i=>i.normalTextureTransformMatrix??l)).code.add(e`void forwardNormalUV(){
normalUV = (normalTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):o.vertex.code.add(e`void forwardNormalUV(){}`)}function lo(o,r){r.hasEmissionTextureTransform&&r.textureCoordinateType!==0?(o.varyings.add("emissiveUV","vec2"),o.vertex.uniforms.add(new d("emissiveTextureTransformMatrix",i=>i.emissiveTextureTransformMatrix??l)).code.add(e`void forwardEmissiveUV(){
emissiveUV = (emissiveTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):o.vertex.code.add(e`void forwardEmissiveUV(){}`)}function mo(o,r){r.hasOcclusionTextureTransform&&r.textureCoordinateType!==0?(o.varyings.add("occlusionUV","vec2"),o.vertex.uniforms.add(new d("occlusionTextureTransformMatrix",i=>i.occlusionTextureTransformMatrix??l)).code.add(e`void forwardOcclusionUV(){
occlusionUV = (occlusionTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):o.vertex.code.add(e`void forwardOcclusionUV(){}`)}function co(o,r){r.hasMetallicRoughnessTextureTransform&&r.textureCoordinateType!==0?(o.varyings.add("metallicRoughnessUV","vec2"),o.vertex.uniforms.add(new d("metallicRoughnessTextureTransformMatrix",i=>i.metallicRoughnessTextureTransformMatrix??l)).code.add(e`void forwardMetallicRoughnessUV(){
metallicRoughnessUV = (metallicRoughnessTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):o.vertex.code.add(e`void forwardMetallicRoughnessUV(){}`)}function ho(o){let r=new G,{attributes:i,vertex:n,fragment:a,varyings:m}=r,{output:uo,normalType:c,offsetBackfaces:g,spherical:fo,snowCover:u,pbrMode:T,textureAlphaPremultiplied:vo,instancedDoublePrecision:po,hasVertexColors:h,hasVertexTangents:w,hasColorTexture:C,hasNormalTexture:xo,hasNormalTextureTransform:go,hasColorTextureTransform:To}=o;if(L(n,o),i.add("position","vec3"),m.add("vpos","vec3",{invariant:!0}),r.include(k,o),r.include(R,o),r.include(B,o),r.include(so,o),!V(uo))return r.include(W,o),r;r.include(no,o),r.include(lo,o),r.include(mo,o),r.include(co,o),p(n,o),r.include(U,o),r.include(N);let f=c===0||c===1;return f&&g&&r.include(P),r.include(z,o),r.include(b,o),r.include(D,o),m.add("vPositionLocal","vec3"),r.include(A,o),r.include($,o),r.include(I,o),n.uniforms.add(new E("externalColor",t=>t.externalColor,{supportsNaN:!0})),m.add("vcolorExt","vec4"),r.include(eo,o),n.include(O),n.include(S),r.include(po?oo:ro,o),n.main.add(e`
    forwardVertexColor();

    MaskedColor maskedColor =
      applySymbolColor(applyVVColor(applyInstanceColor(createMaskedFromNaNColor(externalColor))));

    vcolorExt = maskedColor.color;
    forwardColorMixMode(maskedColor.mask);

    vpos = getVertexInLocalOriginSpace();
    vPositionLocal = vpos - view[3].xyz;
    vpos = subtractOrigin(vpos);
    ${s(f,"vNormalWorld = dpNormal(vvLocalNormal(normalModel()));")}
    vpos = addVerticalOffset(vpos, localOrigin);
    ${s(w,"vTangent = dpTransformVertexTangent(tangent);")}
    gl_Position = transformPosition(proj, view, vpos);
    ${s(f&&g,"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);")}

    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardTextureCoordinates();
    forwardColorUV();
    forwardNormalUV();
    forwardEmissiveUV();
    forwardOcclusionUV();
    forwardMetallicRoughnessUV();

    if (opacityMixMode != ${e.int(M.ignore)} && vcolorExt.a < ${e.float(F)}) {
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
    }
    forwardLinearDepthToReadShadowMap();
  `),a.include(X,o),a.include(H,o),r.include(_,o),a.include(y,o),r.include(to,o),p(a,o),a.uniforms.add(n.uniforms.get("localOrigin"),new v("ambient",t=>t.ambient),new v("diffuse",t=>t.diffuse),new x("opacity",t=>t.opacity),new x("layerOpacity",t=>t.layerOpacity)),C&&a.uniforms.add(new j("tex",t=>t.texture)),r.include(J,o),a.include(Y,o),a.include(ao),r.include(Z,o),a.include(io,o),q(a),Q(a),K(a),a.main.add(e`
    discardBySlice(vpos);
    discardByTerrainDepth();
    ${C?e`
            vec4 texColor = texture(tex, ${To?"colorUV":"vuv0"});
            ${s(vo,"texColor.rgb /= texColor.a;")}
            discardOrAdjustAlpha(texColor);`:e`vec4 texColor = vec4(1.0);`}
    shadingParams.viewDirection = normalize(vpos - cameraPosition);
    ${c===2?e`vec3 normal = screenDerivativeNormal(vPositionLocal);`:e`shadingParams.normalView = vNormalWorld;
                vec3 normal = shadingNormal(shadingParams);`}
    applyPBRFactors();
    float ssao = evaluateAmbientOcclusionInverse() * getBakedOcclusion();

    vec3 posWorld = vpos + localOrigin;

    float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
    float shadow = readShadow(additionalAmbientScale, vpos);

    vec3 matColor = max(ambient, diffuse);
    vec3 albedo = mixExternalColor(${s(h,"vColor.rgb *")} matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
    float opacity_ = layerOpacity * mixExternalOpacity(${s(h,"vColor.a * ")} opacity, texColor.a, vcolorExt.a, opacityMixMode);

    ${xo?`mat3 tangentSpace = computeTangentSpace(${w?"normal":"normal, vpos, vuv0"});
            vec3 shadingNormal = computeTextureNormal(tangentSpace, ${go?"normalUV":"vuv0"});`:"vec3 shadingNormal = normal;"}
    vec3 normalGround = ${fo?"normalize(posWorld);":"vec3(0.0, 0.0, 1.0);"}

    ${s(u,e`
          float snow = getSnow(normal, normalGround);
          albedo = mix(albedo, vec3(1), snow);
          shadingNormal = mix(shadingNormal, normal, snow);
          ssao = mix(ssao, 1.0, snow);`)}

    vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

    ${T===1||T===2?e`
            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
            ${s(u,"mrr = applySnowToMRR(mrr, snow);")}
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, additionalAmbientIrradiance);`:e`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
    vec4 finalColor = vec4(shadedColor, opacity_);
    outputColorHighlightOLID(applySlice(finalColor, vpos), albedo ${s(u,", snow")});
  `),r}var lr=Object.freeze(Object.defineProperty({__proto__:null,build:ho},Symbol.toStringTag,{value:"Module"}));export{ho as a,lr as b};
