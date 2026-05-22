import{a as v,b as E}from"./chunk-JPQMUGAX.js";import{a as $}from"./chunk-DTSF6TKK.js";import{a as I}from"./chunk-WZREUFT5.js";import{e as U}from"./chunk-DJSBN5WX.js";import{a as R}from"./chunk-ZOQEN237.js";import{a as F}from"./chunk-KM2EW6DR.js";import{a as L}from"./chunk-FMM7ICCH.js";import{a as k}from"./chunk-L3VRDRYJ.js";import{a as N}from"./chunk-ZPRRJLBJ.js";import{a as M}from"./chunk-EEIBN36S.js";import{f as D}from"./chunk-A2FJ55XA.js";import{b as l}from"./chunk-N7ZNAA2Y.js";import{a as O,b as B}from"./chunk-3QBD2465.js";import{a as z}from"./chunk-JYIOFSCM.js";import{a as m}from"./chunk-IUFXCA3M.js";import{a as W}from"./chunk-2OFKI5R7.js";import{a as t,b as u}from"./chunk-ZMBCTCSM.js";import{a as f}from"./chunk-XM4XKSXW.js";import{c as j}from"./chunk-EVZK7RLD.js";import{a as n}from"./chunk-WNSZCIFR.js";var a=class extends ${constructor(){super(...arguments),this.cullFace=0,this.style=0,this.hasVertexColors=!1,this.polygonOffset=!1,this.hasOccludees=!1,this.enableOffset=!0,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.hasVVColor=!1,this.draped=!1,this.textureCoordinateType=0,this.emissionSource=0,this.discardInvisibleFragments=!0,this.writeDepth=!0,this.occlusionPass=!1,this.hasVVInstancing=!1,this.hasVVSize=!1,this.hasVVOpacity=!1,this.overlayEnabled=!1,this.snowCover=!1}};function x(e,o,c,r){return e.draped?null:e.hasVVColor?r:e.hasVertexColors?c:o}n([l({count:3})],a.prototype,"cullFace",void 0),n([l({count:6})],a.prototype,"style",void 0),n([l()],a.prototype,"hasVertexColors",void 0),n([l()],a.prototype,"polygonOffset",void 0),n([l()],a.prototype,"hasOccludees",void 0),n([l()],a.prototype,"enableOffset",void 0),n([l()],a.prototype,"terrainDepthTest",void 0),n([l()],a.prototype,"cullAboveTerrain",void 0),n([l()],a.prototype,"hasVVColor",void 0),n([l()],a.prototype,"draped",void 0);function le(e){let o=j().vec3f("position").vec4f("uvMapSpace");return e.draped?e.hasVVColor?o.f32("colorFeatureAttribute"):e.hasVertexColors&&o.vec4u8("color",{glNormalized:!0}):o.u32("textureElementIndex",{integer:!0}),R()&&o.vec4u8("olidColor"),o.freeze()}var w=[{type:"mat3f32",name:"boundingRect"}],T=new f(w),V=new f([...w,{type:"vec4unorm8",name:"color"}]),b=new f([...w,{type:"f32",name:"colorFeatureAttribute"}]);function ce(e){return x(e,T,V,b)}var y=new E("componentTextureBuffer",e=>e.textureBuffer),H=new v({layout:T,itemIndexAttribute:"textureElementIndex",bufferUniform:y}),G=new v({layout:V,itemIndexAttribute:"textureElementIndex",bufferUniform:y}),J=new v({layout:b,itemIndexAttribute:"textureElementIndex",bufferUniform:y,enableNaNSupport:!0});function _(e){return x(e,H,G,J)}var P=.70710678118,q=P,K=.08715574274,S=10,Q=1;function X(e){let o=_(e),c=o!=null,r=new W;c&&r.include(o.TextureBackedBufferModule,e);let{vertex:i,fragment:d,attributes:p,varyings:g}=r,A=e.output===8;B(i,e),r.include(L);let h="";c?(e.hasVVColor&&(h=o.getTextureAttribute("colorFeatureAttribute")),e.hasVertexColors?(r.varyings.add("vColor","vec4"),r.vertex.code.add(t`void forwardVertexColor() { vColor = ${o.getTextureAttribute("color")}; }`)):r.vertex.code.add(t`void forwardVertexColor() {}`),p.add("textureElementIndex","uint")):(r.include(I,e),e.hasVVColor&&(p.add("colorFeatureAttribute","float"),h="colorFeatureAttribute")),r.include(U,e),r.include(F,e),r.fragment.include(D,e),r.include(k,e),r.include(N,e),e.draped&&i.uniforms.add(new m("worldToScreenRatio",s=>1/s.screenToPCSRatio)),p.add("position","vec3"),p.add("uvMapSpace","vec4"),e.hasVertexColors||g.add("vColor","vec4"),g.add("vpos","vec3",{invariant:!0}),g.add("vuv","vec2"),i.uniforms.add(new z("uColor",s=>s.color));let C=e.style===3||e.style===4||e.style===5;return C&&i.code.add(t`
      const mat2 rotate45 = mat2(${t.float(P)}, ${t.float(-q)},
                                 ${t.float(q)}, ${t.float(P)});
    `),!e.draped&&c&&(O(i,e),i.uniforms.add(new m("worldToScreenPerDistanceRatio",s=>1/s.camera.perScreenPixelRatio)),i.code.add(t`vec3 projectPointToLineSegment(vec3 center, vec3 halfVector, vec3 point) {
float projectedLength = dot(halfVector, point - center) / dot(halfVector, halfVector);
return center + halfVector * clamp(projectedLength, -1.0, 1.0);
}`),i.code.add(t`vec3 intersectRayPlane(vec3 rayDir, vec3 rayOrigin, vec3 planeNormal, vec3 planePoint) {
float d = dot(planeNormal, planePoint);
float t = (d - dot(planeNormal, rayOrigin)) / dot(planeNormal, rayDir);
return rayOrigin + t * rayDir;
}`),i.code.add(t`
      float boundingRectDistanceToCamera() {
        vec3 center = ${o.getTextureAttribute("boundingRect")}[0];
        vec3 halfU = ${o.getTextureAttribute("boundingRect")}[1];
        vec3 halfV = ${o.getTextureAttribute("boundingRect")}[2];
        vec3 n = normalize(cross(halfU, halfV));

        vec3 viewDir = - vec3(view[0][2], view[1][2], view[2][2]);

        float viewAngle = dot(viewDir, n);
        float minViewAngle = ${t.float(K)};

        if (abs(viewAngle) < minViewAngle) {
          // view direction is (almost) parallel to plane -> clamp it to min angle
          float normalComponent = sign(viewAngle) * minViewAngle - viewAngle;
          viewDir = normalize(viewDir + normalComponent * n);
        }

        // intersect view direction with infinite plane that contains bounding rect
        vec3 planeProjected = intersectRayPlane(viewDir, cameraPosition, n, center);

        // clip to bounds by projecting to u and v line segments individually
        vec3 uProjected = projectPointToLineSegment(center, halfU, planeProjected);
        vec3 vProjected = projectPointToLineSegment(center, halfV, planeProjected);

        // use to calculate the closest point to camera on bounding rect
        vec3 closestPoint = uProjected + vProjected - center;

        return length(closestPoint - cameraPosition);
      }
    `)),i.code.add(t`
    vec2 scaledUV() {
      vec2 uv = uvMapSpace.xy ${u(C," * rotate45")};
      vec2 uvCellOrigin = uvMapSpace.zw ${u(C," * rotate45")};

      ${u(!e.draped,t`float distanceToCamera = boundingRectDistanceToCamera();
               float worldToScreenRatio = worldToScreenPerDistanceRatio / distanceToCamera;`)}

      // Logarithmically discretize ratio to avoid jittering
      float step = 0.1;
      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);

      vec2 uvOffset = mod(uvCellOrigin * discreteWorldToScreenRatio, ${t.float(S)});
      return uvOffset + (uv * discreteWorldToScreenRatio);
    }
  `),i.main.add(t`
    vuv = scaledUV();
    vpos = position;
    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardVertexColor();
    forwardObjectAndLayerIdColor();
    ${e.hasVertexColors?"vColor *= uColor;":e.hasVVColor?t`vColor = uColor * interpolateVVColor(${h});`:"vColor = uColor;"}
    gl_Position = transformPosition(proj, view, vpos);
  `),d.include(M),e.draped&&d.uniforms.add(new m("texelSize",s=>1/s.camera.pixelRatio)),A||(d.code.add(t`
      const float lineWidth = ${t.float(Q)};
      const float spacing = ${t.float(S)};
      const float spacingINV = ${t.float(1/S)};

      float coverage(float p, float txlSize) {
        p = mod(p, spacing);

        float halfTxlSize = txlSize / 2.0;

        float start = p - halfTxlSize;
        float end = p + halfTxlSize;

        float coverage = (ceil(end * spacingINV) - floor(start * spacingINV)) * lineWidth;
        coverage -= min(lineWidth, mod(start, spacing));
        coverage -= max(lineWidth - mod(end, spacing), 0.0);

        return coverage / txlSize;
      }
    `),e.draped||d.code.add(t`const int maxSamples = 5;
float sampleAA(float p) {
vec2 dxdy = abs(vec2(dFdx(p), dFdy(p)));
float fwidth = dxdy.x + dxdy.y;
ivec2 samples = 1 + ivec2(clamp(dxdy, 0.0, float(maxSamples - 1)));
vec2 invSamples = 1.0 / vec2(samples);
float accumulator = 0.0;
for (int j = 0; j < maxSamples; j++) {
if(j >= samples.y) {
break;
}
for (int i = 0; i < maxSamples; i++) {
if(i >= samples.x) {
break;
}
vec2 step = vec2(i,j) * invSamples - 0.5;
accumulator += coverage(p + step.x * dxdy.x + step.y * dxdy.y, fwidth);
}
}
accumulator /= float(samples.x * samples.y);
return accumulator;
}`)),d.main.add(t`
    discardBySlice(vpos);
    discardByTerrainDepth();
    vec4 color = vColor;
    ${u(!A,t`color.a *= ${Y(e)};`)}
    outputColorHighlightOLID(applySlice(color, vpos), color.rgb);
  `),r}function Y(e){function o(c){return e.draped?t`coverage(vuv.${c}, texelSize)`:t`sampleAA(vuv.${c})`}switch(e.style){case 3:case 0:return o("y");case 4:case 1:return o("x");case 5:case 2:return t`1.0 - (1.0 - ${o("x")}) * (1.0 - ${o("y")})`;default:return"0.0"}}var De=Object.freeze(Object.defineProperty({__proto__:null,build:X},Symbol.toStringTag,{value:"Module"}));export{a,le as b,ce as c,X as d,De as e};
