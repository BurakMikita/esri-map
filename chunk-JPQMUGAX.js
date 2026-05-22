import{a as T,b as k}from"./chunk-N7ZNAA2Y.js";import{a as F}from"./chunk-IUFXCA3M.js";import{a as y}from"./chunk-HL3GROME.js";import{a as t,b as g}from"./chunk-ZMBCTCSM.js";import{c as w}from"./chunk-BPT6XXKC.js";import{a as B}from"./chunk-4L2DWQRB.js";import{b as v}from"./chunk-ECVQ7ERL.js";import{a as N}from"./chunk-WNSZCIFR.js";function I(e){switch(e.elementType){case"float":switch(e.elementCount){case 1:return t`float`;case 2:return t`vec2`;case 3:return t`vec3`;case 4:return t`vec4`;case 9:return t`mat3`;default:e.elementCount}break;case"int":switch(e.elementCount){case 1:return t`int`;case 2:return t`ivec2`;case 3:return t`ivec3`;case 4:return t`ivec4`;case 9:throw new Error("Invalid element count 9 for type int");default:e.elementCount}break;case"uint":switch(e.elementCount){case 1:return t`uint`;case 2:return t`uvec2`;case 3:return t`uvec3`;case 4:return t`uvec4`;case 9:throw new Error("Invalid element count 9 for type uint");default:e.elementCount}break;default:e.elementType}throw new Error("unsupported field")}var E=new F("const_NaN",()=>NaN,{supportsNaN:!0}),l=class extends T{constructor(o){super(),this.supportNaN=o}};function D(e,o){let n=o?.supportNaN;n&&(e.uniforms.add(E),e.code.add(t`bool bitsEncodeFloat16NaN(highp uint bits) {
const highp uint nanExponent = 0x00007c00u;
highp uint exponent = bits & nanExponent;
highp uint mantissa = bits & 0x000003ffu;
return exponent == nanExponent && mantissa != 0u;
}`)),e.code.add(t`
    mediump float unpackHalf2x8(highp uint bits0, highp uint bits1) {
      highp uint halfBits = (bits1 << 8u) | bits0;
      ${g(n,t`
        if (bitsEncodeFloat16NaN(halfBits)) {
          return const_NaN;
        }`)}
      return unpackHalf2x16(halfBits).x;
    }`)}function S(e,o){let n=o?.supportNaN;n&&(e.uniforms.add(E),e.code.add(t`bool bitsEncodeFloat32NaN(highp uint bits) {
const highp uint nanExponent = 0x7f800000u;
highp uint exponent = bits & nanExponent;
highp uint mantissa = bits & 0x007fffffu;
return exponent == nanExponent && mantissa != 0u;
}`)),e.code.add(t`
    highp float unpackFloat4x8(highp uint bits0, highp uint bits1, highp uint bits2, highp uint bits3) {
      highp uint floatBits = (bits3 << 24u) |(bits2 << 16u) | (bits1 << 8u) | bits0;
      ${g(n,t`
        if (bitsEncodeFloat32NaN(floatBits)) {
          return const_NaN;
        }`)}
      return uintBitsToFloat(floatBits);
    }`)}function C(e){let{fieldType:o}=e;return`${(0,H[o])(z(e))}`}N([k()],l.prototype,"supportNaN",void 0);var H={u8:e=>t`${e[0]}`,unorm8:e=>t`float(${e[0]})/255.0`,vec4unorm8:e=>t`vec4(${`${e[0]}, ${e[1]}, ${e[2]}, ${e[3]}`})/255.0`,f16:w?e=>t`unpackHalf2x8(${`${e[0]}, ${e[1]}`})`:e=>t`unpackFloat4x8(${`${e[0]}, ${e[1]}, ${e[2]}, ${e[3]}`})`,f32:e=>t`unpackFloat4x8(${`${e[0]}, ${e[1]}, ${e[2]}, ${e[3]}`})`,vec4u8:e=>t`uvec4(${`${e[0]}, ${e[1]}, ${e[2]}, ${e[3]}`})`,mat3f32:e=>{let o=e.reduce((n,s)=>{let i=n.at(-1);return i==null||i.length>=4?n.push([s]):i.push(s),n},new Array).map(n=>t`unpackFloat4x8(${`${n[0]}, ${n[1]}, ${n[2]}, ${n[3]}`})`);return t`mat3(${o.join(`,
`)})`}};function z(e){let{startTexel:o,byteOffset:n,texelByteStride:s,byteSize:i}=e,u=o,c=n%s,d=new Array;for(let r=0;r<i;++r){let f=t`texel${t.int(u)}.${W[c]}`;d.push(f),++c,c>=s&&(c=0,++u)}return d}var W=["x","y","z","w"];var M=new l(!0),X=new l(!1),_=class{constructor(o){this.moduleId=v(),this.namespace=`_tbb_${this.moduleId}_`;let{itemIndexAttribute:n,bufferUniform:s,layout:i}=o,u=o.fieldFilter??(()=>!0),c=o.enableNaNSupport?M:X;this.TextureBackedBufferModule=(d,r)=>Y(this.namespace,d,r,n,s,i,u,c),this.getTextureAttribute=j(this.namespace)}};function Y(e,o,n,s,i,u,c,d){let{vertex:r}=o;r.include(S,d),r.include(D,d);let f=`${e}tbbStride`,p=`${e}TextureBackedBufferItemData`,$=`${e}fetchTextureBackedBufferItemData`,x=A(e);for(let a of[f,p,$,x])B(a.length<1024,"Identifiers do not have a valid length");r.constants.add(f,"uint",u.texelStride),r.uniforms.add(i);let h=new Array;for(let a of u.fields.values())c(a.name,n)&&h.push(a);if(h.length===0)return;let m=[];for(let a=0;a<u.texelStride;++a)m.push(!1);for(let a of h)for(let b=0;b<a.numTexels;++b)m[a.startTexel+b]=!0;r.code.add(t`
  struct ${p} {`);for(let a of h)r.code.add(t`\t${I(a)} ${a.name};`);r.code.add(t`};`),r.code.add(t`
  ${p} ${$}(highp uint itemIndex) {
    ${p} itemData;
    highp uint index = itemIndex * ${f};
    highp uint rowWidth = uint(textureSize(${i.name}, 0).x);
    int coordX = int(index % rowWidth);
    int coordY = int(index / rowWidth);
  `);for(let a=0;a<m.length;++a)m[a]!==!1&&r.code.add(t`lowp uvec4 texel${t.int(a)} = texelFetch(${i.name}, ivec2(coordX + ${t.int(a)}, coordY), 0);`);for(let a of h)r.code.add(t`itemData.${a.name} = ${C(a)};`);r.code.add(t`return itemData;
}`),r.code.add(t`${p} ${x};`),r.main.add(t`${x} = ${$}(${s});`)}function j(e){let o=A(e);return n=>t`${o}.${n}`}function A(e){return`${e}ItemData`}var U=class extends y{constructor(o,n){super(o,"usampler2D",2,(s,i,u)=>s.bindTexture(o,n(i,u)))}};export{_ as a,U as b};
