import{b as u,c as S}from"./chunk-2ROTFWS6.js";import{a as x}from"./chunk-J2SPUCDB.js";import{a as f}from"./chunk-RWQN2ILK.js";import{a as l}from"./chunk-V3NGW635.js";import{a as s}from"./chunk-T5ZXNCMP.js";import{a as p}from"./chunk-LXQQXD2R.js";import{a as m}from"./chunk-6V727XQP.js";import{a as c}from"./chunk-7HEBMXF6.js";import{a as d}from"./chunk-OPDVZWIH.js";import{a as h}from"./chunk-2OFKI5R7.js";import{a as n}from"./chunk-B2KD3GMI.js";import{a,b as i}from"./chunk-ZMBCTCSM.js";function z(g){let r=new h,{fragment:e}=r;r.include(x),l(e),e.include(c),e.include(d),e.include(f),e.include(s),e.include(S,!0),e.uniforms.add(new m("depthTexture",t=>t.mainDepth));let{reduced:o}=g;return o&&e.code.add(a`float getDepth(vec2 uv){
return linearDepthFromTexture(depthTexture, uv);
}
float textureBilinear(vec2 uv) {
vec2 depthTextureSize = vec2(textureSize(depthTexture, 0));
vec2 texelSize = 1.0 / depthTextureSize;
vec2 depthUV = (uv * depthTextureSize) - vec2(0.5);
vec2 f = fract(depthUV);
vec2 snapUV = (floor(depthUV) + vec2(0.5)) / depthTextureSize;
float d0 = getDepth(snapUV);
float d1 = getDepth(snapUV + vec2(texelSize.x, 0.0));
float d2 = getDepth(snapUV + vec2(0.0, texelSize.y));
float d3 = getDepth(snapUV + texelSize);
return mix(mix(d0, d1, f.x), mix(d2, d3, f.x), f.y);
}`),e.uniforms.add(new n("hazeStrength",t=>t.hazeStrength),new p("heightParameters",5,(t,v)=>u(v,t))).main.add(a`
    float depthSample = depthFromTexture(depthTexture, uv);
    if (depthSample == 1.0) {
      discard;
    }

    vec3 rayDir = normalize(worldRay);
    vec3 cameraSpaceRay = normalize(eyeDir);
    cameraSpaceRay /= cameraSpaceRay.z;

    cameraSpaceRay *= ${i(o,"-textureBilinear(uv)","-linearizeDepth(depthSample)")};
    float terrainDepth = max(0.0, length(cameraSpaceRay));

    // Alpha is ignored for haze blending
    float fadeOut = smoothstep(-10000.0, -15000.0, heightParameters[0] - radii[0]);
    vec3 color = (1.0 - fadeOut) * hazeStrength * raymarchAtmosphere(rayDir, mainLightDirection, terrainDepth);

    color = tonemapACES(color);
    fragColor = delinearizeGamma(vec4(color, 1.0));
  `),r}var _=Object.freeze(Object.defineProperty({__proto__:null,build:z},Symbol.toStringTag,{value:"Module"}));export{z as a,_ as b};
