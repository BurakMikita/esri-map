import{a as p}from"./chunk-L7NOU4T2.js";import{a as f}from"./chunk-OPDVZWIH.js";import{a as c}from"./chunk-2TNKRR5B.js";import{a as i}from"./chunk-2OFKI5R7.js";import{a as o}from"./chunk-K55TYFIP.js";import{a as r,b as a}from"./chunk-ZMBCTCSM.js";var n=class extends p{};function s(d){let{preparePass:l}=d,e=new i;return e.include(c),e.fragment.include(f),e.fragment.uniforms.add(new o("cutFillReferenceDepthTexture",t=>t.referenceDepthTexture),new o("cutFillTargetDepthTexture",t=>t.targetDepthTexture)),e.fragment.code.add(r`bool outsideFar(float depth) {
return depth >= 1.0;
}`),e.fragment.main.add(r`
    float referenceDepth = depthFromTexture(cutFillReferenceDepthTexture, uv);
    float targetDepth = depthFromTexture(cutFillTargetDepthTexture, uv);

    if (outsideFar(targetDepth)) {
      discard;
    }

    ${a(l===0,`
        float depth = referenceDepth - targetDepth;
        fragColor = vec4(min(0.0, depth), max(0.0, depth), 0.0, 0.0);
    `)}

    ${a(l===1,`
        ivec2 texSize = textureSize(cutFillReferenceDepthTexture, 0);
        ivec2 coords = ivec2(gl_FragCoord.xy);
        float packedCoords = float(coords.x) + float(coords.y) * float(texSize.x);

        fragColor = vec4(referenceDepth, packedCoords, 0.0, 0.0);
    `)}
  `),e}var T=Object.freeze(Object.defineProperty({__proto__:null,CutFillDepthParameters:n,build:s},Symbol.toStringTag,{value:"Module"}));export{n as a,s as b,T as c};
