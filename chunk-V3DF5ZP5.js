import{a as Do}from"./chunk-RWQN2ILK.js";import{a as w,b as Oo,e as Lo}from"./chunk-PG3IB7WZ.js";import{l as wo,m as Mo}from"./chunk-LIZCWXLU.js";import{a as N,b as So}from"./chunk-JPQMUGAX.js";import{b as mo}from"./chunk-ORDUUESM.js";import{a as x,e as io}from"./chunk-FEY624O3.js";import{a as go,b as yo}from"./chunk-ZYEUJEMV.js";import{a as ro}from"./chunk-L6YEOV3T.js";import{d as O,e as L}from"./chunk-DUTO7CRC.js";import{b as Co}from"./chunk-7HCNNXBA.js";import{a as vo,b as po}from"./chunk-V3NGW635.js";import{a as xo}from"./chunk-BPRPPUCD.js";import{a as fo}from"./chunk-JXKPIB3A.js";import{a as y}from"./chunk-WZREUFT5.js";import{a as Y}from"./chunk-ZOQEN237.js";import{e as oo}from"./chunk-YSZDXGX7.js";import{a as v}from"./chunk-RNTPV3HL.js";import{a as bo}from"./chunk-L3VRDRYJ.js";import{a as ho}from"./chunk-ZPRRJLBJ.js";import{a as lo}from"./chunk-AU22D56B.js";import{e as X}from"./chunk-A2FJ55XA.js";import{a as D}from"./chunk-VGAXEXH3.js";import{a as K,b as Q}from"./chunk-N7ZNAA2Y.js";import{a as eo}from"./chunk-PIAEM5HF.js";import{a as to}from"./chunk-6V727XQP.js";import{a as ao,b as no}from"./chunk-HQLKOHVL.js";import{a as b}from"./chunk-2AVDPHAQ.js";import{a as J,f}from"./chunk-Z4ZVOZG5.js";import{a as so}from"./chunk-YX3UNFSQ.js";import{a as co}from"./chunk-OPDVZWIH.js";import{a as Z}from"./chunk-3RSKBJV5.js";import{a as uo}from"./chunk-2OFKI5R7.js";import{a as h}from"./chunk-HL3GROME.js";import{a,b as r}from"./chunk-ZMBCTCSM.js";import{a as q}from"./chunk-6QJXCAOV.js";import{r as k}from"./chunk-G3M47L72.js";import{b as H}from"./chunk-RL4CZUGQ.js";import{v as G}from"./chunk-EBNBNVAU.js";import{f as U}from"./chunk-JUYKNRQF.js";import{a as B,b as z,c as j}from"./chunk-ARRCN5K3.js";import{a as _}from"./chunk-WNSZCIFR.js";function No(o){o.vertex.code.add(a`
    vec4 decodeSymbolColor(vec4 symbolColor, out int colorMixMode) {
      float symbolAlpha = 0.0;

      const float maxTint = 85.0;
      const float maxReplace = 170.0;
      const float scaleAlpha = 3.0;

      if (symbolColor.a > maxReplace) {
        colorMixMode = ${a.int(1)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxReplace);
      } else if (symbolColor.a > maxTint) {
        colorMixMode = ${a.int(3)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxTint);
      } else if (symbolColor.a > 0.0) {
        colorMixMode = ${a.int(4)};
        symbolAlpha = scaleAlpha * symbolColor.a;
      } else {
        colorMixMode = ${a.int(1)};
        symbolAlpha = 0.0;
      }

      return vec4(symbolColor.r, symbolColor.g, symbolColor.b, symbolAlpha);
    }
  `)}var M=class extends h{constructor(e,t){super(e,"int",2,(l,i,n)=>l.setUniform1i(e,t(i,n)))}};function To(o,e){switch(e.componentDataType){case 1:return qo(o,e);case 0:return Jo(o,e);case 2:return;default:e.componentDataType}}var Fo=(o,e)=>o==="emissiveSourceMode"||o==="emissiveStrength"?e.hasEmission:o!=="olidColor"||e.output===9,Po=new So("componentTextureBuffer",o=>o.textureBackedBuffer?.texture),Go=new N({layout:wo,itemIndexAttribute:"componentIndex",bufferUniform:Po,fieldFilter:Fo}),Ho=new N({layout:Mo,itemIndexAttribute:"componentIndex",bufferUniform:Po,fieldFilter:Fo});function ko(){return Y()?Ho:Go}function qo(o,e){let{vertex:t,fragment:l}=o,{output:i,hasEmission:n}=e,s=i===9,{getTextureAttribute:m,TextureBackedBufferModule:c}=ko();o.include(c,e),o.attributes.add("componentIndex","uint"),o.varyings.add("vExternalColorMixMode","mediump float"),o.varyings.add("vExternalColor","vec4"),s&&o.varyings.add("vObjectAndLayerIdColor","vec4"),n&&(o.varyings.add("emissiveStrength","float"),o.varyings.add("emissiveSource","int")),o.include(No),t.code.add(a`
  float readElevationOffset() {
    return ${m("elevationOffset")};
  }

  void forwardEmissiveStrength() {
    ${r(n,a`emissiveStrength = ${m("emissiveStrength")};
           emissiveSource = ${m("emissiveSourceMode")} == 0u ? 0 : 1;`)}
  }

  void forwardObjectAndLayerIdColor() {
    ${r(s,a`vObjectAndLayerIdColor = vec4(${m("olidColor")})/255.0;`)}
  }

  void decodeColorAndCastShadow(uvec4 colorAndCastShadowEncoded, out vec4 color, out bool castShadow) {
    uvec4 componentColor = colorAndCastShadowEncoded;
    castShadow = bool(componentColor.b & 1u);
    componentColor.b = componentColor.b & 254u;
    color = vec4(componentColor);
  }

  vec4 forwardExternalColor(out bool castShadows) {
    vec4 componentColor;
    decodeColorAndCastShadow(${m("colorAndCastShadows")}, componentColor, castShadows);

    int decodedColorMixMode;
    vExternalColor = decodeSymbolColor(componentColor, decodedColorMixMode) * 0.003921568627451; // = 1/255;
    vExternalColorMixMode = float(decodedColorMixMode) + 0.5; // add 0.5 to avoid interpolation artifacts

    return vExternalColor;
  }
`),l.code.add(a`
  void readExternalColor(out vec4 externalColor, out int externalColorMixMode) {
    externalColor = vExternalColor;
    externalColorMixMode = int(vExternalColorMixMode);
  }

  void outputObjectAndLayerIdColor() {
     ${s?a`fragColor = vObjectAndLayerIdColor;`:""}
  }
`)}function Jo(o,e){let{vertex:t,fragment:l}=o;o.varyings.add("vExternalColor","vec4"),l.uniforms.add(new b("emissiveStrength",n=>n.componentParameters.emissiveStrength)),t.uniforms.add(new w("externalColor",n=>n.componentParameters.externalColor)).code.add(a`float readElevationOffset() {
return 0.0;
}
void forwardObjectAndLayerIdColor() {}
void forwardEmissiveStrength() {}
vec4 forwardExternalColor(out bool castShadows) {
vExternalColor = externalColor;
castShadows = true;
return externalColor;
}`);let i=e.output===9;l.uniforms.add(new M("externalColorMixMode",n=>n.componentParameters.externalColorMixMode)).code.add(a`
    void readExternalColor(out vec4 color, out int colorMixMode) {
      color = vExternalColor;
      colorMixMode = externalColorMixMode;
    }

    void outputObjectAndLayerIdColor() {
      ${r(i,"fragColor = vec4(0, 0, 0, 0);")}
    }
  `)}function T(o,e){let t=o.fragment;switch(e.doubleSidedMode){case 0:t.code.add(a`vec3 _adjustDoublesided(vec3 normal) {
return normal;
}`);break;case 1:o.include(v,e),t.code.add(a`vec3 _adjustDoublesided(vec3 normal) {
return dot(normal, vPositionWorldCameraRelative) > 0.0 ? -normal : normal;
}`);break;case 2:t.code.add(a`vec3 _adjustDoublesided(vec3 normal) {
return gl_FrontFacing ? normal : -normal;
}`);break;default:e.doubleSidedMode;case 3:}switch(e.normalType){case 0:case 1:o.include(x,e),t.main.add(a`vec3 fragmentFaceNormal = _adjustDoublesided(normalize(vNormalWorld));
vec3 fragmentFaceNormalView = gl_FrontFacing ? normalize(vNormalView) : -normalize(vNormalView);`);break;case 2:o.include(v,e),t.main.add(a`vec3 fragmentFaceNormal = normalize(cross(dFdx(vPositionWorldCameraRelative), dFdy(vPositionWorldCameraRelative)));
vec3 fragmentFaceNormalView = normalize(cross(dFdx(vPosition_view), dFdy(vPosition_view)));`)}e.shadeNormals?t.main.add(a`vec3 fragmentShadingNormal = fragmentFaceNormal;`):e.spherical?(o.include(v,e),t.main.add(a`vec3 fragmentShadingNormal = normalize(positionWorld());`)):t.main.add(a`vec3 fragmentShadingNormal = vec3(0.0, 0.0, 1.0);`)}function $o(o,e){o.include(y,e),o.fragment.include(xo);let t=o.fragment;t.uniforms.add(new w("baseColor",l=>l.baseColor)),t.uniforms.add(new b("objectOpacity",l=>l.opacity)),e.hasVertexColors?t.code.add(a`vec3 _baseColor() {
return baseColor.rgb * vColor.rgb;
}
float _baseOpacity() {
return baseColor.a * vColor.a;
}`):t.code.add(a`vec3 _baseColor() {
return baseColor.rgb;
}
float _baseOpacity() {
return baseColor.a;
}`),t.code.add(a`vec4 computeMaterialColor(vec4 textureColor, vec4 externalColor, int externalColorMixMode) {
vec3 baseColor = _baseColor();
float baseOpacity = _baseOpacity();
vec3 color = mixExternalColor(
baseColor,
textureColor.rgb,
externalColor.rgb,
externalColorMixMode
);
float opacity = objectOpacity * mixExternalOpacity(
baseOpacity,
textureColor.a,
externalColor.a,
externalColorMixMode
);
return vec4(color, opacity);
}`)}function Ao(o,e){let t=e.hasColorTexture&&(f(e.output)||e.alphaDiscardMode!==1);t&&(o.include(no,e),o.fragment.uniforms.add(new so("baseColorTexture",l=>l.texture))),o.fragment.code.add(a`
    vec4 readBaseColorTexture() {
      return ${t?"textureLookup(baseColorTexture, vuv0)":"vec4(1.0)"};
    }
  `)}var g=class extends h{constructor(e,t){super(e,"bool",2,(l,i,n)=>l.setUniform1b(e,t(i,n)))}};var F=class extends K{constructor(){super(...arguments),this.ellipsoidMode=1}};function Ro(o,e){o.fragment.uniforms.add(new Z("cameraHeights",t=>{let l=t.camera,i=k(l.eye),n=Math.sqrt(i),s=P(e)*U,m=i-s*s,c=G(4e6,5e6,n-s);return c=Math.min(c,.98),H(Ko,c,m)}),new eo("cameraPosition",t=>t.camera.eye)),o.fragment.include(Do),o.fragment.code.add(a`float sphereFade() {return cameraHeights[0];}
float sphereDepthInterpolate(vec3 worldRay, vec3 viewRay, float currentLinearDepth) {
vec2 rayPlanetIntersect = sphereIntersect(cameraPosition, worldRay, cameraHeights[1]);
bool hitsPlanet = (rayPlanetIntersect.x <= rayPlanetIntersect.y) && rayPlanetIntersect.x > 0.0;
if (hitsPlanet) {
float sphereDepth = rayPlanetIntersect.x;
viewRay *= viewRay.z*sphereDepth;
float linearDepth = length(viewRay);
float sphereFade = cameraHeights[0];
return (-linearDepth) * sphereFade + currentLinearDepth * (1.0 - sphereFade);
}
return currentLinearDepth;
}`)}_([Q({count:4})],F.prototype,"ellipsoidMode",void 0);var Ko=q();function P({ellipsoidMode:o}){switch(o){case 4:case 1:return B.radius;case 2:return z.radius;case 3:return j.radius}}function Qo(o){let e=new uo,{vertex:t,fragment:l}=e;e.include(v,o),e.include(x,o),e.include(y,o),e.include(ao,o),e.include(To,o),e.include(io,o),l.include(X,o),e.include(Ao,o),e.include(ho,o);let{output:i,pbrMode:n,hasNormalTexture:s,snowCover:m,receiveShadows:c,shadeNormals:Eo,spherical:d,sphericalSR:Io,overlayEnabled:u,componentDataType:Wo,vertexDiscardMode:$,renderOccluded:A,isGroundSlice:S}=o,R=n===1||n===2;R&&(e.include(go,o),s&&e.include(mo,o));let E=J(i),Vo=E&&Wo===1,I=P(o);u&&(l.include(L,o),e.include(Oo,o),t.include(fo),t.uniforms.add(new g("useENUForGlobalOverlayUV",p=>p.useENUForGlobalOverlayUV)),l.uniforms.add(new g("useENUForGlobalOverlayUV",p=>p.useENUForGlobalOverlayUV)),t.constants.add("invRadius","float",1/I).code.add(`vec2 projectOverlay(vec3 pos) { return pos.xy ${r(d,"/ (1.0 + invRadius * pos.z)")}; }`));let C=u&&f(i)&&n===4;C&&(e.varyings.add("tbnTangent","vec3"),e.varyings.add("tbnBiTangent","vec3"),e.varyings.add("groundNormal","vec3"));let _o=$===0,Bo=$===2,zo=1-1/255;if(e.include(Co,o),e.include(oo,o),t.main.add(a`
    bool castShadows;
    vec4 externalColor = forwardExternalColor(castShadows);
    ${r(Vo,"if(!castShadows) { gl_Position = vec4(vec3(1e38), 1.0); return; }")}
    ${r(!_o,`{ if (externalColor.a ${Bo?">":"<="} ${a.float(zo)}) { gl_Position = vec4(vec3(1e38), 1.0); return; } }`)}
    ${r(i===9,"externalColor.a = 1.0;")}

    forwardPosition(readElevationOffset());
    forwardViewPosDepth(vPosition_view);
    forwardNormal();
    forwardTextureCoordinates();
    forwardVertexColor();
    forwardLinearDepthToReadShadowMap();
    forwardLinearDepthToWriteShadowMap();
    forwardEmissiveStrength();
    forwardObjectAndLayerIdColor();
    ${r(C,d?a`
            groundNormal = normalize(positionWorld());
            tbnTangent = normalize(cross(vec3(0.0, 0.0, 1.0), groundNormal));
            tbnBiTangent = normalize(cross(groundNormal, tbnTangent));`:a`
            groundNormal = vec3(0.0, 0.0, 1.0);
            tbnTangent = vec3(1.0, 0.0, 0.0);
            tbnBiTangent = vec3(0.0, 1.0, 0.0);`)}
    ${r(u,r(d,`
        if (useENUForGlobalOverlayUV) {
          setOverlayVTC(projectOverlay(position));
        } else {
          vtcOverlay = vec4(0.0); // Definite assignment
        }
      `,"setOverlayVTC(projectOverlay(position));"))}

    if (externalColor.a < ${a.float(D)}) {
      // Discard this vertex
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    }
  `),f(i))return e.include($o,o),e.include(T,o),l.include(L,o),e.include(bo,o),l.include(yo,o),l.constants.add("pRadius","float",I).code.add(a`
      float evaluateShadow() {
        return ${c?"readShadowMap(vPositionWorldCameraRelative, linearDepth)":"0.0"};
      }
    `).main.add(a`
      ${r(!S,"discardBySlice(vPositionWorldCameraRelative);")}
      discardByTerrainDepth();

      vec4 textureColor = readBaseColorTexture();
      discardOrAdjustAlpha(textureColor);

      // When rendering the occluded overlay, we still need to read the base color texture because we need to use the
      // same discard logic. However after that to render only the draped overlay, we simply set the base texture color
      // to zero.
      ${r(A,a`textureColor = vec4(0);`)}

      ${r(u,a`
        ${r(d,a`
            vec4 overlayUVs;
            if (useENUForGlobalOverlayUV) {
              overlayUVs = vtcOverlay;
            } else {
              const float rad2deg1 = 180.0 / PI;

              vec3 wPos = positionWorld();

              float oRadius = length(wPos.xyz);
              float oLonRad = atan(wPos.y, wPos.x);
              float sinLat = wPos.z / oRadius;

              ${r(Io===1,a`
                  const float halfSemiMajorAxis = 0.5 * pRadius;
                  vec2 posWM = vec2(
                    oLonRad * pRadius,
                    halfSemiMajorAxis * log((1.0 + sinLat) / (1.0 - sinLat))
                  );

                  vec2 overlayUV = posWM;
              `,a`
                float oLatRad = asin(clamp(sinLat,-1.0,1.0));
                vec2 posWgs84 = vec2(rad2deg1 * oLonRad, rad2deg1 * oLatRad);
                vec2 overlayUV = posWgs84;
              `)}
              overlayUVs = vec4(overlayUV, overlayUV) * overlayTexScale + overlayTexOffset;
            }
          `,a`vec4 overlayUVs = vtcOverlay;`)}

        vec4 overlayColor = getOverlayColor(ovColorTex, overlayUVs);

        /* Early discard to only emit when we have overlay */
        ${r(A,a`if (overlayColor.a < ${a.float(D)}) { discard; }`)}
        `)}

      vec4 externalColor;
      int externalColorMixMode;
      readExternalColor(externalColor, externalColorMixMode);

      vec4 materialColor = computeMaterialColor(textureColor, externalColor, externalColorMixMode);
    `),R?(po(l),d&&O(l),l.main.add(a`
        applyPBRFactors();
        ${r(n===1,a`if (externalColorMixMode == 3) {
              mrr = vec3(0.0, 0.6, 0.2);
            }`)}
        float additionalIrradiance = 0.02 * mainLightIntensity[2];
        ${r(s,"mat3 tangentSpace = computeTangentSpace(fragmentFaceNormal, vPositionWorldCameraRelative, vuv0);")}
        vec3 shadingNormal = ${s?"computeTextureNormal(tangentSpace, vuv0)":"fragmentShadingNormal"};
        vec3 groundNormal = ${d?a`normalize(positionWorld())`:a`vec3(0.0, 0.0, 1.0)`};

        vec3 viewDir = normalize(vPositionWorldCameraRelative);
        float ssao = 1.0 - occlusion * evaluateAmbientOcclusionInverse();
        ${r(m,a`float snow = getSnow(fragmentFaceNormal, normalize(positionWorld()));
                 materialColor.rgb = mix(materialColor.rgb, vec3(1.1), snow);
                 ssao = mix(ssao, 0.5 * ssao, snow);
                 shadingNormal = mix(shadingNormal, fragmentFaceNormal, snow);`)}
        ${r(u,"materialColor = materialColor * (1.0 - overlayColor.a) + overlayColor;")}

        vec3 additionalLight = evaluateAdditionalLighting(ssao, positionWorld());
        ${r(d,"float additionalAmbientScale = additionalDirectedAmbientLight(positionWorld());")}
        ${d?a`float shadow = max(lightingGlobalFactor * (1.0 - additionalAmbientScale), evaluateShadow());`:"float shadow = evaluateShadow();"}
        vec4 shadedColor = vec4(evaluateSceneLightingPBR(shadingNormal, materialColor.rgb, shadow, ssao, additionalLight, viewDir, groundNormal, mrr, additionalIrradiance), materialColor.a);
        `)):(vo(l),d&&O(l),C&&l.uniforms.add(new to("ovNormalTex",p=>p.overlay?.getTexture(3))),l.main.add(a`
        ${r(d,"float additionalAmbientScale = additionalDirectedAmbientLight(positionWorld());")}
        float shadow = ${c?d?"max(lightingGlobalFactor * (1.0 - additionalAmbientScale), evaluateShadow())":"evaluateShadow()":d?"lightingGlobalFactor * (1.0 - additionalAmbientScale)":"0.0"};

        ${r(c&&!Eo,a`
            float dotFL = dot(fragmentFaceNormal, mainLightDirection);
            if( dotFL <= 0.0) shadow = 1.0;
        `)}
        ${r(m,a`float snow = getSnow(fragmentFaceNormal, normalize(positionWorld()));
               materialColor.rgb = mix(materialColor.rgb, vec3(1), snow);`)}

        // At global scale we create some additional ambient light based on the main light to simulate global illumination
        float ssao = evaluateAmbientOcclusion();
        vec3 additionalLight = evaluateAdditionalLighting(ssao, positionWorld());

        ${r(u,"materialColor = materialColor * (1.0 - overlayColor.a) + overlayColor;")}

        vec4 shadedColor = vec4(evaluateSceneLighting(fragmentShadingNormal, materialColor.rgb, shadow, ssao, additionalLight), materialColor.a);
        ${r(C,a`vec4 overlayWaterMask = getOverlayColor(ovNormalTex, vtcOverlay);
                 float waterNormalLength = length(overlayWaterMask);
                 if (waterNormalLength > 0.95) {
                   mat3 tbnMatrix = mat3(tbnTangent, tbnBiTangent, groundNormal);
                   vec4 waterColorLinear = getOverlayWaterColor(overlayWaterMask, overlayColor, -normalize(vPositionWorldCameraRelative), shadow, groundNormal, tbnMatrix, vPosition_view, positionWorld());
                   vec4 waterColorNonLinear = delinearizeGamma(vec4(waterColorLinear.xyz, 1.0));
                   // un-gamma the ground color to mix in linear space
                   shadedColor = mix(shadedColor, waterColorNonLinear, waterColorLinear.w);
                 }`)}
      `)),l.main.add(`
      ${r(S,"if(rejectBySlice(vPositionWorldCameraRelative)) shadedColor.a *= groundSliceOpacity;")}

      outputColorHighlightOLID(applySlice(shadedColor, vPositionWorldCameraRelative), materialColor.rgb ${r(m,", snow")});
    `),o.sphereDepthInterpolate&&(e.include(Ro,o),e.fragment.include(co),l.main.add(a`if (sphereFade()>0.0) {
vec3 worldRay = normalize(vPositionWorldCameraRelative);
vec3 viewRay = normalize(vPosition_view);
gl_FragDepth = delinearizeDepth(sphereDepthInterpolate(worldRay, viewRay, linearizeDepth(gl_FragCoord.z)));
} else {
gl_FragDepth = gl_FragCoord.z;
}`)),e;let W=i===2,jo=i===9,Uo=i===8,V=E||i===6||i===7;return V&&e.include(ro,o),W&&e.include(T,o),u&&e.include(Lo,o),e.include(lo,o),l.main.add(a`
    ${r(!S,"discardBySlice(vPositionWorldCameraRelative);")}

    vec4 textureColor = readBaseColorTexture();
    discardOrAdjustAlpha(textureColor);

    ${r(V,"outputDepth(linearDepth);")}
    ${r(W,a`fragColor = vec4(vec3(0.5) + 0.5 * fragmentFaceNormalView, 1.0);`)}
    ${r(jo,u?"fragColor = getOverlayColorTexel();":"outputObjectAndLayerIdColor();")}
    ${r(Uo,r(u,a`calculateOcclusionAndOutputHighlight(getAllOverlayHighlightValuesEncoded());`,a`calculateOcclusionAndOutputHighlight();`))}`),e}var xa=Object.freeze(Object.defineProperty({__proto__:null,build:Qo},Symbol.toStringTag,{value:"Module"}));export{F as a,Qo as b,xa as c};
