import{a as n}from"./chunk-L7NOU4T2.js";import{a as i}from"./chunk-2TNKRR5B.js";import{a as c}from"./chunk-2OFKI5R7.js";import{a as l}from"./chunk-K55TYFIP.js";import{a as m,b as e}from"./chunk-ZMBCTCSM.js";var o=class extends n{};function x(r){let{reductionPass:a}=r,t=new c;return t.include(i),t.fragment.uniforms.add(new l("cutFillDepthTexture",d=>d.depthTexture)),t.fragment.main.add(m`
    ivec2 iuv = ivec2(gl_FragCoord.xy) * 2;

    vec2 t0 = texelFetch(cutFillDepthTexture, iuv + ivec2(0, 0), 0).rg;
    vec2 t1 = texelFetch(cutFillDepthTexture, iuv + ivec2(1, 0), 0).rg;
    vec2 t2 = texelFetch(cutFillDepthTexture, iuv + ivec2(0, 1), 0).rg;
    vec2 t3 = texelFetch(cutFillDepthTexture, iuv + ivec2(1, 1), 0).rg;

    ${e(a===0,`
        vec2 totalDepth = t0 + t1 + t2 + t3;

        fragColor = vec4(totalDepth, 0.0, 0.0);
      `)}

    ${e(a===1,`       
        float min01 = min(t0.r, t1.r);
        float minCoordsPacked01 = mix(t0.g, t1.g, float(t1.r < t0.r));

        float min23 = min(t2.r, t3.r);
        float minCoordsPacked23 = mix(t2.g, t3.g, float(t3.r < t2.r));

        float minValue = min(min01, min23);
        float minCoordsPacked = mix(minCoordsPacked01, minCoordsPacked23, float(min23 < min01));

        fragColor = vec4(minValue, minCoordsPacked, 0.0, 0.0);
      `)}

    ${e(a===2,`
        float max01 = max(t0.r, t1.r);
        float maxCoordsPacked01 = mix(t0.g, t1.g, float(t1.r > t0.r));

        float max23 = max(t2.r, t3.r);
        float maxCoordsPacked23 = mix(t2.g, t3.g, float(t3.r > t2.r));

        float maxValue = max(max01, max23);
        float maxCoordsPacked = mix(maxCoordsPacked01, maxCoordsPacked23, float(max23 > max01));

        fragColor = vec4(maxValue, maxCoordsPacked, 0.0, 0.0);
      `)}
  `),t}var C=Object.freeze(Object.defineProperty({__proto__:null,CutFillReductionParameters:o,build:x},Symbol.toStringTag,{value:"Module"}));export{o as a,x as b,C as c};
