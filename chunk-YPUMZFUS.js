import{a as m}from"./chunk-L7NOU4T2.js";import{a as v}from"./chunk-7HEBMXF6.js";import{a as p}from"./chunk-2TNKRR5B.js";import{a as g}from"./chunk-2OFKI5R7.js";import{a as d}from"./chunk-K55TYFIP.js";import{a as f}from"./chunk-B2KD3GMI.js";import{a as t}from"./chunk-ZMBCTCSM.js";import{h as u}from"./chunk-EBNBNVAU.js";var i=class extends m{constructor(){super(...arguments),this.blurRadius=0}};function D(a){let r=new g,s=r.fragment;r.include(p),s.include(v),s.uniforms.add(new d("colorTexture",e=>e.emissionsToDownsample),new f("blurRadius",e=>e.blurRadius));let l="",o=7;for(let e=0;e<o;e++)l+=`locations1D[${e}] = ${(e/(o-1)*2-1).toFixed(3).toString()};`;let x=2,n="";for(let e=0;e<o;e++)n+=`locations1DWeights[${e}] = ${u(e-Math.floor(o/2),x).toFixed(7).toString()};`;let c=a.glowStage===0;return s.code.add(t`
    float locations1D[${t.int(o)}];
    float locations1DWeights[${t.int(o)}];

    vec3 blurUniformSamples(sampler2D toBlur) {
      vec3 res = vec3(0.0);
      vec2 size = vec2(textureSize(toBlur, 0));
      vec2 aspectCorrection = vec2(1.0, size.x / size.y);

      ${l}
      ${n}
      vec2 pixelCenterShift = 0.5 / size;

      for(int i=0;i < ${t.int(o)}; i++) {
        float uv1D = locations1D[i] + ${c?"pixelCenterShift.x":"pixelCenterShift.y"};
        vec2 uvOffset = ${c?"vec2(uv1D, 0.0)":"vec2(0.0, uv1D)"};

        vec2 uvDistorted = uv + uvOffset * blurRadius * aspectCorrection;
        vec3 sampleColor = texture(toBlur, uvDistorted).rgb;
        res += sampleColor * locations1DWeights[i];
      }
      return res;
    }
  `).main.add(t`fragColor = vec4(blurUniformSamples(colorTexture), 0.0);`),r}var B=Object.freeze(Object.defineProperty({__proto__:null,GlowBlurPassParameters:i,build:D},Symbol.toStringTag,{value:"Module"}));export{i as a,D as b,B as c};
