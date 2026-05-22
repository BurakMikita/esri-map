import{a as t}from"./chunk-PIAEM5HF.js";import{a}from"./chunk-ZMBCTCSM.js";function o(i){i.uniforms.add(new t("mainLightDirection",n=>n.lighting.mainLight.direction))}function d(i){i.uniforms.add(new t("mainLightIntensity",n=>n.lighting.mainLight.intensity))}function m(i){o(i),d(i),i.code.add(a`vec3 applyShading(vec3 shadingNormal, float shadow) {
float dotVal = clamp(dot(shadingNormal, mainLightDirection), 0.0, 1.0);
return mainLightIntensity * ((1.0 - shadow) * dotVal);
}`)}export{o as a,d as b,m as c};
