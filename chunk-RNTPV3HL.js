import{a as F,b as w}from"./chunk-CYTILLQV.js";import{a as c}from"./chunk-TUP2BI5C.js";import{a as P}from"./chunk-O6MDTSVU.js";import{a as n}from"./chunk-L7NOU4T2.js";import{a as d}from"./chunk-XVDRQD57.js";import{a as t}from"./chunk-DK3KECNU.js";import{a as o,b as W}from"./chunk-ZMBCTCSM.js";import{a}from"./chunk-JARU7KSM.js";import{a as s}from"./chunk-VEYWSQAY.js";function _(i,m){let{attributes:V,vertex:e,varyings:l,fragment:f}=i;e.include(F,m),V.add("position","vec3"),l.add("vPositionWorldCameraRelative","vec3"),l.add("vPosition_view","vec3",{invariant:!0}),e.uniforms.add(new t("transformWorldFromViewTH",r=>r.transformWorldFromViewTH),new t("transformWorldFromViewTL",r=>r.transformWorldFromViewTL),new c("transformViewFromCameraRelativeRS",r=>r.transformViewFromCameraRelativeRS),new P("transformProjFromView",r=>r.camera.projectionMatrix),new d("transformWorldFromModelTH",r=>r.transformWorldFromModelTH),new d("transformWorldFromModelTL",r=>r.transformWorldFromModelTL));let{hasModelRotationScale:v}=m;v&&e.uniforms.add(new w("transformWorldFromModelRS",r=>r.transformWorldFromModelRS)),e.code.add(o`
      vec3 positionWorldCameraRelative() {
      vec3 rotatedModelPosition = ${W(v,o`transformWorldFromModelRS * `)} position;

      vec3 transform_CameraRelativeFromModel = dpAdd(
        transformWorldFromModelTL,
        transformWorldFromModelTH,
        -transformWorldFromViewTL,
        -transformWorldFromViewTH
      );

      return transform_CameraRelativeFromModel + rotatedModelPosition;
    }
  `),e.code.add(o`
    void forwardPosition(float fOffset) {
      vPositionWorldCameraRelative = positionWorldCameraRelative();
      if (fOffset != 0.0) {
        vPositionWorldCameraRelative += fOffset * ${m.spherical?o`normalize(transformWorldFromViewTL + vPositionWorldCameraRelative)`:o`vec3(0.0, 0.0, 1.0)`};
      }

      vPosition_view = transformViewFromCameraRelativeRS * vPositionWorldCameraRelative;
      gl_Position = transformProjFromView * vec4(vPosition_view, 1.0);
    }
  `),f.uniforms.add(new t("transformWorldFromViewTL",r=>r.transformWorldFromViewTL)),e.code.add(o`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`),f.code.add(o`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`)}var R=class extends n{constructor(){super(...arguments),this.transformWorldFromViewTH=a(),this.transformWorldFromViewTL=a(),this.transformViewFromCameraRelativeRS=s()}},p=class extends n{constructor(){super(...arguments),this.transformWorldFromModelRS=s(),this.transformWorldFromModelTH=a(),this.transformWorldFromModelTL=a()}};export{_ as a,R as b,p as c};
