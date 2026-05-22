import{a as P}from"./chunk-RWQN2ILK.js";import{d as g,e as y,f as u}from"./chunk-ETX7BVWZ.js";import{a as d}from"./chunk-LXQQXD2R.js";import{a as n}from"./chunk-PIAEM5HF.js";import{a as h}from"./chunk-L7NOU4T2.js";import{a as f}from"./chunk-PMVHKVIR.js";import{a as i,b as s}from"./chunk-ZMBCTCSM.js";import{a as m}from"./chunk-6QJXCAOV.js";import{r as p}from"./chunk-G3M47L72.js";import{b as l}from"./chunk-EBNBNVAU.js";import{a as o}from"./chunk-ARRCN5K3.js";var D=class extends h{constructor(){super(...arguments),this.radii=m()}};function x(t){t.code.add(i`float chapmanApproximation(float thickness, float height, float cosZenith) {
float c = sqrt(thickness + height);
float cExpH = c * exp(-height);
if (cosZenith >= 0.0) {
return cExpH / (c * cosZenith + 1.0);
} else {
float x0 = sqrt(1.0 - cosZenith * cosZenith) * (thickness + height);
float c0 = sqrt(x0);
return 2.0 * c0 * exp(thickness - x0) - cExpH / (1.0 - c * cosZenith);
}
}`),t.constants.add("scaleHeight","float",o.scaleHeight*o.atmosphereHeight).uniforms.add(new f("radii",e=>e.radii)).code.add(i`float getOpticalDepth(vec3 position, vec3 dir, float h) {
return scaleHeight * chapmanApproximation(radii[0] / scaleHeight, h, dot(normalize(position), dir));
}`),t.include(P),t.constants.add("planetRadiusReduction","float",b).uniforms.add(new d("heightParameters",5,(e,a)=>v(a,e)),new n("cameraPosition",e=>e.camera.eye)).code.add(i`vec4 planetIntersect(vec3 rayDir) {
float rayPlanetDistanceReduced = heightParameters[4];
vec2 rayPlanetIntersect = sphereIntersect(cameraPosition, rayDir, rayPlanetDistanceReduced);
vec2 rayAtmosphereIntersect = sphereIntersect(cameraPosition, rayDir, heightParameters[1]);
bool hitsAtmosphere = (rayAtmosphereIntersect.x <= rayAtmosphereIntersect.y) && rayAtmosphereIntersect.x > 0.0;
bool insideAtmosphere = heightParameters[0] < radii[1];
if (!hitsAtmosphere && !insideAtmosphere) {
return vec4(1.0, 0.0, 0.0, 0.0);
}
bool hitsPlanet = (rayPlanetIntersect.x <= rayPlanetIntersect.y) && rayPlanetIntersect.x > 0.0;
float start = insideAtmosphere ? 0.0 : rayAtmosphereIntersect.x;
if (heightParameters[0] < radii[0] - planetRadiusReduction) {
if (dot(rayDir, normalize(cameraPosition)) < -0.01) {
return vec4(1.0, 0.0, 0.0, 0.0);
}
start = rayPlanetIntersect.y;
}
float end = hitsPlanet ? rayPlanetIntersect.x : rayAtmosphereIntersect.y;
return vec4(0.0, hitsPlanet ? 1.0 : 0.0, start, end);
}`)}function v({camera:t},{radii:e}){let a=p(t.eye),c=Math.sqrt(a);return r[0]=c,r[1]=a-e[1]**2,r[2]=l((c-e[0])/o.atmosphereHeight,0,1),r[3]=a-e[0]**2,r[4]=a-(e[0]-b)**2,r}var b=2e4,r=new Array;function $(t,e){t.include(x),t.constants.add("betaRayleigh","vec3",g),t.constants.add("betaCombined","vec3",u),t.constants.add("betaMie","float",y),t.constants.add("steps","int",6),t.uniforms.add(new n("cameraPosition",a=>a.camera.eye)).code.add(i`
    vec3 raymarchAtmosphere(vec3 rayDir, vec3 lightDir, float terrainDepth) {
      vec4 ray = planetIntersect(rayDir);
      if(ray.x == 1.0) {
        return vec3(0);
      }
      ${s(e,"if (terrainDepth != -1.0) { ray.w = terrainDepth; }")}

      vec3 samplePoint = cameraPosition + rayDir * ray.w;
      float multiplier = ray.y == 1.0 ? -1.0 : 1.0;

      vec3 scattering = vec3(0);
      float scaleFract = (length(samplePoint) - radii[0]) / scaleHeight;
      float lastOpticalDepth = getOpticalDepth(samplePoint, rayDir, scaleFract);
      float stepSize = (ray.w - ray.z) / float(steps);

      for (int i = 0; i < steps; i++) {
        samplePoint -= stepSize * rayDir;
        scaleFract = (length(samplePoint) - radii[0]) / scaleHeight;
        float opticalDepth = multiplier * getOpticalDepth(samplePoint, rayDir * multiplier, scaleFract);

        if (i > 0) {
          scattering *= exp(-(mix(betaCombined, betaRayleigh, 0.5) + betaMie) * max(0.0, (opticalDepth - lastOpticalDepth)));
          ${s(!e,"scattering *= mix(2.5, 1.0, clamp((length(cameraPosition) - radii[0]) / 50e3, 0.0, 1.0))")};
        }

        if (dot(normalize(samplePoint), lightDir) > -0.3) {
          float scale = exp(-scaleFract);
          float lightDepth = getOpticalDepth(samplePoint, lightDir, scaleFract);
          scattering += scale * exp(-(betaCombined + betaMie) * lightDepth);
          ${s(!e,"scattering += scale * exp(-(0.25 * betaCombined ) * lightDepth);")}
        }
        lastOpticalDepth = opticalDepth;
      }

      float mu = dot(rayDir, lightDir);
      float mumu = 1.0 + mu * mu;
      float phaseRayleigh = 0.0596831 * mumu;
      ${s(e,"return 3.0 * scattering * stepSize * phaseRayleigh * betaRayleigh;",i`
          const float g = 0.8;
          const float gg = g * g;
          float phaseMie = 0.1193662 * ((1.0 - gg) * mumu) / (pow(1.0 + gg - 2.0 * mu * g, 1.5) * (2.0 + gg));
          phaseMie = clamp(phaseMie, 0.0, 128.0);
          return 3.0 * scattering * stepSize * (phaseRayleigh * betaRayleigh + 0.025 * phaseMie * betaMie);`)}
    }`)}export{D as a,v as b,$ as c};
