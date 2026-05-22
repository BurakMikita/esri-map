import{a as d}from"./chunk-MLDZBIBA.js";import{a as f}from"./chunk-2TNKRR5B.js";import{a as l}from"./chunk-2OFKI5R7.js";import{a as t}from"./chunk-K55TYFIP.js";import{a as c,b as r}from"./chunk-ZMBCTCSM.js";var u=class extends d{};function p(m){let o=new l;o.include(f);let{hasEmitters:s,frontFaceMask:x,computeHudOcclusion:n}=m,a=o.fragment;a.uniforms.add(new t("colorTexture",e=>e.colorTexture),new t("alphaTexture",e=>e.alphaTexture));let i=0;return o.outputs.add("fragColor","vec4",i++),s&&o.outputs.add("fragEmission","vec4",i++),n&&o.outputs.add("fragOcclusion","vec4",i++),a.uniforms.add(new t("frontFaceTexture",e=>e.frontFaceTexture)),s&&(a.uniforms.add(new t("emissionTexture",e=>e.emissionTexture)),a.uniforms.add(new t("emissionFrontFaceTexture",e=>e.emissionFrontFaceTexture))),a.main.add(c`
    float srcAlpha = texture(alphaTexture, uv).r;
    ${r(n,"fragOcclusion = vec4(1.0, 0.0, 0.0, 1.0);")}

    if(srcAlpha == 0.0) {
      fragColor = vec4(0.0);
      ${r(s,"fragEmission = vec4(0.0);")}
      return;
    }
    vec4 frontFace = texture(frontFaceTexture, uv);

    ${r(x,c`
    if (frontFace.a == 0.0) {
      fragColor = vec4(0.0);
      ${r(s,"fragEmission = vec4(0.0);")}
      return;
    }`)}

    vec4 srcColor = texture(colorTexture, uv);
    fragColor = vec4(mix(srcColor.rgb / srcAlpha, frontFace.rgb, frontFace.a), 1.0 - srcColor.a);

    ${r(s,`vec4 emission = texture(emissionTexture, uv);
       vec4 emissionFrontFace = texture(emissionFrontFaceTexture, uv);

       // Modulate transparent emitter by front faces. This case is important for surfaces which contain emitter and
       // non-emitter at the same time. Non-emitter surface parts need to modulate emissions as well.
       emission.rgb = emission.rgb * (1.0 - frontFace.a);

       fragEmission = vec4(mix(emission.rgb / srcAlpha, emissionFrontFace.rgb, emissionFrontFace.a), 1.0 - srcColor.a);
      `)}

    ${r(n,"fragOcclusion.r = pow(srcColor.a, 0.5);")}
  `),o}var b=Object.freeze(Object.defineProperty({__proto__:null,OITBlendPassParameters:u,build:p},Symbol.toStringTag,{value:"Module"}));export{u as a,p as b,b as c};
