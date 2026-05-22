import{a as d}from"./chunk-F3P3YVDZ.js";import{b as u,c as p}from"./chunk-RNTPV3HL.js";import{b as n}from"./chunk-CYTILLQV.js";import{a as c}from"./chunk-TUP2BI5C.js";import{a as x}from"./chunk-VGAXEXH3.js";import{a as N}from"./chunk-2AVDPHAQ.js";import{a as w}from"./chunk-B2KD3GMI.js";import{a as e,b as m}from"./chunk-ZMBCTCSM.js";import{a as f}from"./chunk-OFITSWDI.js";import{a as i}from"./chunk-VEYWSQAY.js";function g(r,a){let{vertex:o,varyings:s}=r;switch(a.normalType){case 0:case 1:{r.include(d,a),s.add("vNormalWorld","vec3"),s.add("vNormalView","vec3"),o.uniforms.add(new c("transformNormalViewFromGlobal",l=>l.transformNormalViewFromGlobal));let{hasModelRotationScale:t}=a;t&&o.uniforms.add(new n("transformNormalGlobalFromModel",l=>l.transformNormalGlobalFromModel)),o.code.add(e`
        void forwardNormal() {
          vNormalWorld = ${m(t,e`transformNormalGlobalFromModel * `)} normalModel();
          vNormalView = transformNormalViewFromGlobal * vNormalWorld;
        }
      `);break}case 2:r.vertex.code.add(e`void forwardNormal() {}`);break;default:a.normalType;case 3:}}var h=class extends u{constructor(){super(...arguments),this.transformNormalViewFromGlobal=i()}},v=class extends p{constructor(){super(...arguments),this.transformNormalGlobalFromModel=i(),this.toMapSpace=f()}};function O(r,a){A(r,a,new w("textureAlphaCutoff",o=>o.textureAlphaCutoff))}function W(r,a){A(r,a,new N("textureAlphaCutoff",o=>o.textureAlphaCutoff))}function A(r,a,o){let s=r.fragment,t=a.alphaDiscardMode,l=t===0;t!==2&&t!==3||s.uniforms.add(o),s.code.add(e`
    void discardOrAdjustAlpha(inout vec4 color) {
      ${t===1?"color.a = 1.0;":`if (color.a < ${l?e.float(x):"textureAlphaCutoff"}) {
              discard;
             } ${m(t===2,"else { color.a = 1.0; }")}`}
    }
  `)}export{g as a,h as b,v as c,O as d,W as e};
