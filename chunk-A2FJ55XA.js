import{a as L,b as f}from"./chunk-N7ZNAA2Y.js";import{a as D}from"./chunk-L7NOU4T2.js";import{a as o}from"./chunk-XVDRQD57.js";import{a as m}from"./chunk-DK3KECNU.js";import{a as w}from"./chunk-ZMBCTCSM.js";import{h as y}from"./chunk-WMGH7MKS.js";import{c as x,d as O,e as h,y as p}from"./chunk-G3M47L72.js";import{a as u,i as b}from"./chunk-JARU7KSM.js";import{a as F}from"./chunk-JJQR3F6K.js";import{a as l}from"./chunk-WNSZCIFR.js";var t=class extends L{constructor(){super(...arguments),this.output=0,this.hasEmission=!1}};l([f({count:10})],t.prototype,"output",void 0),l([f()],t.prototype,"hasEmission",void 0);var P=class extends t{constructor(){super(...arguments),this.instancedDoublePrecision=!1,this.hasModelTransformation=!1}};var B=class extends P{constructor(){super(...arguments),this.hasSlicePlane=!1,this.hasSliceTranslatedView=!1}};l([f()],B.prototype,"hasSlicePlane",void 0);var M=class extends D{constructor(s){super(),this.slicePlaneLocalOrigin=s}};function ee(a,s){C(a,s,new m("slicePlaneOrigin",(e,i)=>g(s,e,i)),new m("slicePlaneBasis1",(e,i)=>n(s,e,i,i.slicePlane?.basis1)),new m("slicePlaneBasis2",(e,i)=>n(s,e,i,i.slicePlane?.basis2)))}function se(a,s){C(a,s,new o("slicePlaneOrigin",(e,i)=>g(s,e,i)),new o("slicePlaneBasis1",(e,i)=>n(s,e,i,i.slicePlane?.basis1)),new o("slicePlaneBasis2",(e,i)=>n(s,e,i,i.slicePlane?.basis2)))}function ae(a,s){T(a,s,new o("slicePlaneOrigin",(e,i)=>g(s,e,i)),new o("slicePlaneBasis1",(e,i)=>n(s,e,i,i.slicePlane?.basis1)),new o("slicePlaneBasis2",(e,i)=>n(s,e,i,i.slicePlane?.basis2)))}var N=w`struct SliceFactors {
float front;
float side0;
float side1;
float side2;
float side3;
};
SliceFactors calculateSliceFactors(vec3 pos) {
vec3 rel = pos - slicePlaneOrigin;
vec3 slicePlaneNormal = -cross(slicePlaneBasis1, slicePlaneBasis2);
float slicePlaneW = -dot(slicePlaneNormal, slicePlaneOrigin);
float basis1Len2 = dot(slicePlaneBasis1, slicePlaneBasis1);
float basis2Len2 = dot(slicePlaneBasis2, slicePlaneBasis2);
float basis1Dot = dot(slicePlaneBasis1, rel);
float basis2Dot = dot(slicePlaneBasis2, rel);
return SliceFactors(
dot(slicePlaneNormal, pos) + slicePlaneW,
-basis1Dot - basis1Len2,
basis1Dot - basis1Len2,
-basis2Dot - basis2Len2,
basis2Dot - basis2Len2
);
}
bool sliceByFactors(SliceFactors factors) {
return factors.front < 0.0
&& factors.side0 < 0.0
&& factors.side1 < 0.0
&& factors.side2 < 0.0
&& factors.side3 < 0.0;
}
bool sliceEnabled() {
return dot(slicePlaneBasis1, slicePlaneBasis1) != 0.0;
}
bool rejectBySlice(vec3 pos) {
return sliceEnabled() && sliceByFactors(calculateSliceFactors(pos));
}`;function T(a,s,...e){s.hasSlicePlane?(a.uniforms.add(...e),a.code.add(N)):a.code.add("bool rejectBySlice(vec3 pos) { return false; }")}function C(a,s,...e){a.constants.add("groundSliceOpacity","float",.2),T(a,s,...e),s.hasSlicePlane?a.code.add(`
    void discardBySlice(vec3 pos) {
      if (rejectBySlice(pos)) {
        discard;
      }
    }

    vec4 applySliceOutline(vec4 color, vec3 pos) {
      SliceFactors factors = calculateSliceFactors(pos);

      factors.front /= 2.0 * fwidth(factors.front);
      factors.side0 /= 2.0 * fwidth(factors.side0);
      factors.side1 /= 2.0 * fwidth(factors.side1);
      factors.side2 /= 2.0 * fwidth(factors.side2);
      factors.side3 /= 2.0 * fwidth(factors.side3);

      // return after calling fwidth, to avoid aliasing caused by discontinuities in the input to fwidth
      if (sliceByFactors(factors)) {
        return color;
      }

      float outlineFactor = (1.0 - step(0.5, factors.front))
        * (1.0 - step(0.5, factors.side0))
        * (1.0 - step(0.5, factors.side1))
        * (1.0 - step(0.5, factors.side2))
        * (1.0 - step(0.5, factors.side3));

      return mix(color, vec4(vec3(0.0), color.a), outlineFactor * 0.3);
    }

    vec4 applySlice(vec4 color, vec3 pos) {
      return sliceEnabled() ? applySliceOutline(color, pos) : color;
    }
  `):a.code.add(w`void discardBySlice(vec3 pos) { }
vec4 applySlice(vec4 color, vec3 pos) { return color; }`)}function E(a,s,e){return a.instancedDoublePrecision?x(_,e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]):s.slicePlaneLocalOrigin}function j(a,s){return a!=null?h(S,s.origin,a):s.origin}function I(a,s,e){return a.hasSliceTranslatedView?s!=null?y(R,e.camera.viewMatrix,s):e.camera.viewMatrix:null}function g(a,s,e){if(e.slicePlane==null)return b;let i=E(a,s,e),r=j(i,e.slicePlane),c=I(a,i,e);return c!=null?p(S,r,c):r}function n(a,s,e,i){if(i==null||e.slicePlane==null)return b;let r=E(a,s,e),c=j(r,e.slicePlane),v=I(a,r,e);return v!=null?(O(d,i,c),p(S,c,v),p(d,d,v),h(d,d,S)):i}var _=u(),S=u(),d=u(),R=F();export{t as a,P as b,B as c,M as d,ee as e,se as f,ae as g};
