import{b as D,c as y}from"./chunk-2ROTFWS6.js";import{a as P}from"./chunk-J2SPUCDB.js";import{a as h}from"./chunk-RWQN2ILK.js";import{a as u}from"./chunk-V3NGW635.js";import{a as g}from"./chunk-T5ZXNCMP.js";import{a as c}from"./chunk-LXQQXD2R.js";import{a as s}from"./chunk-JYIOFSCM.js";import{a as l}from"./chunk-PIAEM5HF.js";import{a as m}from"./chunk-6V727XQP.js";import{a as i}from"./chunk-DK3KECNU.js";import{a as d}from"./chunk-PMVHKVIR.js";import{a as p}from"./chunk-7HEBMXF6.js";import{a as f}from"./chunk-2OFKI5R7.js";import{a as o}from"./chunk-B2KD3GMI.js";import{a,b as n}from"./chunk-ZMBCTCSM.js";function w(v){let t=new f;t.include(P);let{reduced:x}=v,{fragment:r}=t;return u(r),r.include(p),r.include(h),r.include(g),r.include(y,!1),r.uniforms.add(new c("heightParameters",5,(e,C)=>D(C,e)),new d("radii",e=>e.radii),new l("cameraPosition",e=>e.camera.eye),new o("innerFadeDistance",e=>e.innerFadeDistance),new s("undergroundColor",e=>e.undergroundColor),new o("altitudeFade",e=>e.altitudeFade)).code.add(a`vec4 applyUndergroundAtmosphere(vec3 rayDir, vec3 lightDirection, vec4 fragColor) {
float rayPlanetDistance = heightParameters[3];
vec2 rayPlanetIntersect = sphereIntersect(cameraPosition, rayDir, rayPlanetDistance);
if (!((rayPlanetIntersect.x <= rayPlanetIntersect.y) && rayPlanetIntersect.y > 0.0)) {
return fragColor;
}
float lightAngle = dot(lightDirection, normalize(cameraPosition + rayDir * max(0.0, rayPlanetIntersect.x)));
float surfaceShade = max(0.0, (smoothstep(-1.0, 0.8, 2.0 * lightAngle)));
vec4 color = vec4(undergroundColor.rgb * surfaceShade, undergroundColor.a * (1.0 - altitudeFade));
float relDist = (rayPlanetIntersect.y - max(0.0, rayPlanetIntersect.x)) / innerFadeDistance;
if (relDist > 1.0) {
return color;
}
return mix(fragColor, color, smoothstep(0.0, 1.0, relDist * relDist));
}
float getGlow(float dist, float radius, float intensity) {
return pow(radius / max(dist, 1e-6), intensity);
}
vec3 getSun(vec3 rayDir, vec3 lightDir){
float scaleFract = (length(cameraPosition) - radii[0]) / scaleHeight;
float sunOpticalDepth = getOpticalDepth(cameraPosition, rayDir, max(scaleFract, 0.0));
vec3 sunTransmittance = exp(-(mix(betaCombined, betaRayleigh, 0.5)) * max(0.0, sunOpticalDepth));
float mu = clamp(dot(rayDir, lightDir), 0.0, 1.0);
float sunDisc = 256.0 * smoothstep(0.0, 128.0, clamp(getGlow(1.0 - mu, 3e-5, 3.0), 0.0, 128.0));
return normalize(sunTransmittance) * sunDisc;
}`),r.uniforms.add(new i("backgroundColor",e=>e.backgroundColor),new m("depthTexture",e=>e.mainDepth)).main.add(a`
    vec3 rayDir = normalize(worldRay);
    ${n(!x,a`
        float depthSample = texture(depthTexture, uv).r;
        if (depthSample != 1.0) {
          fragColor = vec4(0.0);
          return;
        }`)}

    vec3 color = linearizeGamma(backgroundColor) +
                 raymarchAtmosphere(rayDir, mainLightDirection, -1.0) +
                 getSun(rayDir, mainLightDirection);
    float alpha = smoothstep(0.0, mix(0.15, 0.01, heightParameters[2]), length(color));

    color = tonemapACES(color);
    fragColor = delinearizeGamma(vec4(color, alpha));
    fragColor = applyUndergroundAtmosphere(rayDir, mainLightDirection, fragColor);
  `),t}var j=Object.freeze(Object.defineProperty({__proto__:null,build:w},Symbol.toStringTag,{value:"Module"}));export{w as a,j as b};
