import{a as w,b as T}from"./chunk-SUADOFUN.js";import{a as h}from"./chunk-J2SPUCDB.js";import{a as v}from"./chunk-T5ZXNCMP.js";import{a as n}from"./chunk-LXQQXD2R.js";import{a as x}from"./chunk-6V727XQP.js";import{a as u}from"./chunk-UAVBXAJ7.js";import{a as g}from"./chunk-7HEBMXF6.js";import{a as f}from"./chunk-OPDVZWIH.js";import{a as D}from"./chunk-2OFKI5R7.js";import{a}from"./chunk-K55TYFIP.js";import{a as d}from"./chunk-B2KD3GMI.js";import{a as t,b as l}from"./chunk-ZMBCTCSM.js";var m=class extends w{constructor(){super(...arguments),this.glowLod=-1,this.dispersionWeight=1,this.distanceModifier=1e-4}};function F(o){let i=new D,r=i.fragment,{blurEnabled:s,tonemappingEnabled:p}=o;return i.include(h,{needUVs:!0,needEyeDirection:!0}),r.include(g),r.include(T),r.include(f),i.outputs.add("fragColor","vec4",0),i.outputs.add("fragEmission","vec3",1),r.include(v),r.uniforms.add(new a("colorTexture",e=>e.color),new a("emissionTexture",e=>e.emission)),s?(r.uniforms.add(new x("depthTexture",e=>e.mainDepth),new d("distanceModifier",e=>e.distanceModifier),new a("lodTexture0",e=>e.lodTexture0),new a("lodTexture1",e=>e.lodTexture1),new a("lodTexture2",e=>e.lodTexture2),new a("lodTexture3",e=>e.lodTexture3),new a("lodTexture4",e=>e.lodTexture4),new u("glowLod",e=>e.glowLod),new n("minDisperse",6,e=>e.minDisperse.presets),new n("maxDisperse",6,e=>e.maxDisperse.presets),new d("dispersionWeight",e=>e.dispersionWeight)).main.add(t`
    vec4 color = texture(colorTexture, uv);
    color = vec4(linearizeGamma(color.rgb), color.a);

    vec3 lod0 = texture(emissionTexture, uv).rgb;
    vec3 lod1 = texture(lodTexture0, uv).rgb;
    vec3 lod2 = texture(lodTexture1, uv).rgb;
    vec3 lod3 = texture(lodTexture2, uv).rgb;
    vec3 lod4 = texture(lodTexture3, uv).rgb;
    vec3 lod5 = texture(lodTexture4, uv).rgb;

    float terrainDepth = -1.0;
    float depthSample = depthFromTexture(depthTexture, uv);
    if(depthSample < 1.0 && depthSample > 0.0){
      vec3 cameraSpaceRay = normalize(eyeDir);
      cameraSpaceRay /= cameraSpaceRay.z;
      cameraSpaceRay *= linearizeDepth(depthSample);
      terrainDepth = max(0.0, length(cameraSpaceRay));
    }
    vec3 rayDir = normalize(worldRay);
    float dispersionByDistance = getDistanceFalloff(terrainDepth, rayDir, distanceModifier);
    float dispersionPerPixel = dispersionWeight * dispersionByDistance;

    float lodFactor0 = mix(minDisperse[0], maxDisperse[0], dispersionPerPixel);
    float lodFactor1 = mix(minDisperse[1], maxDisperse[1], dispersionPerPixel);
    float lodFactor2 = mix(minDisperse[2], maxDisperse[2], dispersionPerPixel);
    float lodFactor3 = mix(minDisperse[3], maxDisperse[3], dispersionPerPixel);
    float lodFactor4 = mix(minDisperse[4], maxDisperse[4], dispersionPerPixel);
    float lodFactor5 = mix(minDisperse[5], maxDisperse[5], dispersionPerPixel);

    vec3 emission = lodFactor0 * lod0;
    emission += lodFactor1 * lod1;
    emission += lodFactor2 * lod2;
    emission += lodFactor3 * lod3;
    emission += lodFactor4 * lod4;
    emission += lodFactor5 * lod5;

    // only for glow editor lod debugging
    emission = glowLod == 0 ? lodFactor0 * lod0 : glowLod == 1 ? lodFactor1 * lod1 : glowLod == 2 ? lodFactor2 * lod2 : glowLod == 3 ? lodFactor3 * lod3 : glowLod == 4 ? lodFactor4 * lod4 : glowLod == 5 ? lodFactor5 * lod5 : emission;

    fragEmission = emission;
    // tonemapping is only applied to the emissive part since main color values are not in HDR.
    ${l(p,"emission = tonemapKhronosNeutral(emission, 1.0);")}

    fragColor = delinearizeGamma(vec4(color.rgb + emission.rgb, color.w));
  `),i):(r.main.add(t`
      vec4 color = texture(colorTexture, uv);
      color = vec4(linearizeGamma(color.rgb), color.a);

      // emission is already in linear color space here.
      vec3 emission = texture(emissionTexture, uv).rgb;

      ${l(p,"emission = tonemapKhronosNeutral(emission, 1.0);")}
      fragColor = delinearizeGamma(vec4(color.rgb + emission, color.w));
    `),i)}var c=class{constructor(i,r=!0){this.presets=i,this.presets=P(i,r)}};function P(o,i,r=1){let s=o[0]+o[1]+o[2]+o[3]+o[4]+o[5];return!i||s<=r?o:[o[0]/s,o[1]/s,o[2]/s,o[3]/s,o[4]/s,o[5]/s]}function b(o,i,r=1){return[o[0]*(1-r)+i[0]*r,o[1]*(1-r)+i[1]*r,o[2]*(1-r)+i[2]*r,o[3]*(1-r)+i[3]*r,o[4]*(1-r)+i[4]*r,o[5]*(1-r)+i[5]*r]}var _=Object.freeze(Object.defineProperty({__proto__:null,GlowCompositionPassParameters:m,GlowLodFactors:c,build:F,mixPreset:b},Symbol.toStringTag,{value:"Module"}));export{m as a,F as b,c,b as d,_ as e};
