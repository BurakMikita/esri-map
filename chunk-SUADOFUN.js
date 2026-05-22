import{a as i}from"./chunk-RWQN2ILK.js";import{a as t}from"./chunk-PIAEM5HF.js";import{a as r}from"./chunk-L7NOU4T2.js";import{a as o}from"./chunk-B2KD3GMI.js";import{a as s}from"./chunk-ZMBCTCSM.js";var m=class extends r{constructor(){super(...arguments),this.atmosphereC=1}};function d(e){e.include(i),e.uniforms.add(new o("atmosphereC",a=>a.atmosphereC),new t("cameraPosition",a=>a.camera.eye)),e.code.add(s`float getDistanceFalloff(float dist, vec3 rayDir, float weight) {
if(dist == -1.0){
dist = 0.055 * sphereIntersect(cameraPosition, rayDir, atmosphereC).y;
}
return (1.0 - exp(-dist * weight));
}`)}export{m as a,d as b};
