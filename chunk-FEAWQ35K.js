import{a as C,b as M,c as L,d as O,e as $}from"./chunk-JT4DTOSB.js";import{d as I}from"./chunk-FEY624O3.js";import{a as h}from"./chunk-F3P3YVDZ.js";import{a as G,b as Q}from"./chunk-ZYEUJEMV.js";import{b as R,c as j,d as U,e as W}from"./chunk-DUTO7CRC.js";import{b as H,c as q}from"./chunk-7HCNNXBA.js";import{a as z}from"./chunk-HCD7ZHOM.js";import{a as T,b as B}from"./chunk-V3NGW635.js";import{f as x}from"./chunk-L6UEA2VL.js";import{a as K}from"./chunk-BPRPPUCD.js";import{b as A}from"./chunk-MFARE4G4.js";import{a as S}from"./chunk-WZREUFT5.js";import{a as w,d as y,e as F}from"./chunk-DJSBN5WX.js";import{a as b}from"./chunk-FMM7ICCH.js";import{a as X}from"./chunk-L3VRDRYJ.js";import{a as J}from"./chunk-ZPRRJLBJ.js";import{f as g}from"./chunk-A2FJ55XA.js";import{a as E}from"./chunk-VGAXEXH3.js";import{a as m,b as P}from"./chunk-3QBD2465.js";import{a as D}from"./chunk-JYIOFSCM.js";import{a as N}from"./chunk-HQLKOHVL.js";import{f as u}from"./chunk-Z4ZVOZG5.js";import{a as c}from"./chunk-DK3KECNU.js";import{a as k}from"./chunk-2OFKI5R7.js";import{a as V}from"./chunk-K55TYFIP.js";import{a as p}from"./chunk-B2KD3GMI.js";import{a as i,b as l}from"./chunk-ZMBCTCSM.js";function ro(o){let a=new k,{attributes:Y,vertex:t,fragment:r,varyings:n}=a,{output:Z,offsetBackfaces:f,pbrMode:v,snowCover:s,spherical:_}=o,oo=v===1||v===2;if(P(t,o),Y.add("position","vec3"),n.add("vpos","vec3",{invariant:!0}),a.include(F,o),a.include(L,o),a.include(A,o),a.include(J,o),!u(Z))return a.include($,o),a;m(a.vertex,o),a.include(h,o),a.include(b),f&&a.include(C),n.add("vNormalWorld","vec3"),n.add("localvpos","vec3",{invariant:!0}),a.include(N,o),a.include(O,o),a.include(M,o),a.include(S,o),t.include(w),t.include(y),t.uniforms.add(new D("externalColor",e=>e.externalColor,{supportsNaN:!0})),n.add("vcolorExt","vec4"),a.include(o.instancedDoublePrecision?H:q,o),t.main.add(i`
    forwardVertexColor();

    MaskedColor maskedColorExt =
      applySymbolColor(applyVVColor(applyInstanceColor(createMaskedFromNaNColor(externalColor))));

    vcolorExt = maskedColorExt.color;
    forwardColorMixMode(maskedColorExt.mask);

    bool alphaCut = opacityMixMode != ${i.int(x.ignore)} && vcolorExt.a < ${i.float(E)};
    vpos = getVertexInLocalOriginSpace();

    localvpos = vpos - view[3].xyz;
    vpos = subtractOrigin(vpos);
    vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
    vpos = addVerticalOffset(vpos, localOrigin);
    vec4 basePosition = transformPosition(proj, view, vpos);

    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardTextureCoordinates();
    forwardLinearDepthToReadShadowMap();
    gl_Position = alphaCut ? vec4(1e38, 1e38, 1e38, 1.0) :
    ${l(f,"offsetBackfacingClipPosition(basePosition, vpos, vNormalWorld, cameraPosition);","basePosition;")}
  `);let{hasColorTexture:d,hasColorTextureTransform:ao}=o;return r.include(W,o),r.include(R,o),a.include(I,o),r.include(g,o),a.include(X,o),m(r,o),T(r),j(r),U(r),r.uniforms.add(t.uniforms.get("localOrigin"),t.uniforms.get("view"),new c("ambient",e=>e.ambient),new c("diffuse",e=>e.diffuse),new p("opacity",e=>e.opacity),new p("layerOpacity",e=>e.layerOpacity)),d&&r.uniforms.add(new V("tex",e=>e.texture)),a.include(G,o),r.include(z,o),r.include(K),r.include(Q,o),B(r),r.main.add(i`
      discardBySlice(vpos);
      discardByTerrainDepth();
      vec4 texColor = ${d?`texture(tex, ${ao?"colorUV":"vuv0"})`:" vec4(1.0)"};
      ${l(d,`${l(o.textureAlphaPremultiplied,"texColor.rgb /= texColor.a;")}
        discardOrAdjustAlpha(texColor);`)}
      vec3 viewDirection = normalize(vpos - cameraPosition);
      applyPBRFactors();
      float ssao = evaluateAmbientOcclusionInverse();
      ssao *= getBakedOcclusion();

      float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
      vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
      float shadow = readShadow(additionalAmbientScale, vpos);
      vec3 matColor = max(ambient, diffuse);
      ${o.hasVertexColors?i`vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
             float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, opacityMixMode);`:i`vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
             float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, opacityMixMode);`}

      vec3 shadingNormal = normalize(vNormalWorld);
      vec3 groundNormal = ${_?"normalize(vpos + localOrigin)":"vec3(0.0, 0.0, 1.0)"};

      ${l(s,`vec3 faceNormal = screenDerivativeNormal(vpos);
         float snow = getRealisticTreeSnow(faceNormal, shadingNormal, groundNormal);
         albedo = mix(albedo, vec3(1), snow);`)}

      ${i`albedo *= 1.2;
             vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
             float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
             float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
             float treeRadialFalloff = vColor.r;
             float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
             additionalLight += backLightFactor * mainLightIntensity;`}

      ${oo?i`float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
            ${l(s,"mrr = applySnowToMRR(mrr, snow);")}
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, groundNormal, mrr, additionalAmbientIrradiance);`:i`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
      vec4 finalColor = vec4(shadedColor, opacity_);
      outputColorHighlightOLID(applySlice(finalColor, vpos), albedo ${l(s,", 1.0")});`),a}var To=Object.freeze(Object.defineProperty({__proto__:null,build:ro},Symbol.toStringTag,{value:"Module"}));export{ro as a,To as b};
