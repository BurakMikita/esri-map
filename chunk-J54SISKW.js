import{a as l}from"./chunk-6BAWOY3B.js";import{a as o}from"./chunk-L7NOU4T2.js";import{a as p}from"./chunk-2TNKRR5B.js";import{a as i}from"./chunk-2OFKI5R7.js";import{a as s}from"./chunk-K55TYFIP.js";import{a as r}from"./chunk-ZMBCTCSM.js";var a=class extends o{};function m(){let t=new i;t.include(p);let e=t.fragment;return e.uniforms.add(new s("splatOutputDepth",n=>n.splatDepth)),e.include(l),e.main.add(r`vec4 splatDepth = texture(splatOutputDepth, uv);
float depth = decodeRGBToNormalizedDepth(splatDepth.xyz);
if(splatDepth.a < 1.0) {
discard;
}
gl_FragDepth = depth;`),t}var g=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatDepthCompositionPassParameters:a,build:m},Symbol.toStringTag,{value:"Module"}));export{a,m as b,g as c};
