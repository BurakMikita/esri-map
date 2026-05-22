import{a as c}from"./chunk-KUMSY7WW.js";import{a as n}from"./chunk-L7NOU4T2.js";import{a as u}from"./chunk-2TNKRR5B.js";import{a as p}from"./chunk-2OFKI5R7.js";import{a as r}from"./chunk-K55TYFIP.js";import{a as t,b as l}from"./chunk-ZMBCTCSM.js";var a=class extends n{};function f(m){let o=new p;o.include(u);let{hasEmission:e}=m,i=o.fragment;return e&&i.include(c),i.uniforms.add(new r("colorTexture",s=>s.color),new r("splatOutputColor",s=>s.splatColor)),e&&i.uniforms.add(new r("emissionTexture",s=>s.emission)),o.outputs.add("fragColor","vec4",0),e&&o.outputs.add("fragEmission","vec4",1),o.fragment.main.add(t`
      vec4 color = texture(colorTexture, uv);
      vec4 splatColor = texture(splatOutputColor, uv);

      fragColor = splatColor + color * (1.0 - splatColor.a);
      ${l(e,t`
          vec4 emission = texture(emissionTexture, uv);
          float srcAlpha = splatColor.a;

          if (srcAlpha == 0.0) {
            fragEmission = emission;
            return;
          }

          vec3 oitDimming = emissionDimming(splatColor.rgb, srcAlpha);
          float opaqueSuppression = smoothstep(0.95, 1.0, srcAlpha);
          vec3 dimming = mix(oitDimming, vec3(0.0), opaqueSuppression);

          fragEmission = vec4(emission.rgb * dimming, emission.a);
        `)}
    `),o}var b=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatCompositionPassParameters:a,build:f},Symbol.toStringTag,{value:"Module"}));export{a,f as b,b as c};
