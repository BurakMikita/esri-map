import{a as u}from"./chunk-KQTDRXW7.js";import{a as C}from"./chunk-AU22D56B.js";import{d as B,g as F}from"./chunk-A2FJ55XA.js";import{a as j}from"./chunk-NTTAKPTW.js";import{a as _}from"./chunk-O6MDTSVU.js";import{a as b}from"./chunk-L7NOU4T2.js";import{f as R}from"./chunk-Z4ZVOZG5.js";import{a as m}from"./chunk-XVDRQD57.js";import{a as H}from"./chunk-PMVHKVIR.js";import{a as d}from"./chunk-Y4IDVYXW.js";import{a as $}from"./chunk-2OFKI5R7.js";import{a as c,b as f}from"./chunk-ZMBCTCSM.js";import{g as h,n as P}from"./chunk-WMGH7MKS.js";import{a as O}from"./chunk-6QJXCAOV.js";import{c as l}from"./chunk-G3M47L72.js";import{a as v}from"./chunk-JARU7KSM.js";import{M as y,a as w}from"./chunk-LRBUUU2S.js";import{a as M}from"./chunk-JJQR3F6K.js";import{b as p}from"./chunk-RL4CZUGQ.js";import{y as s}from"./chunk-EBNBNVAU.js";var x=class extends b{constructor(){super(...arguments),this.clipBox=w(y),this.useFixedSizes=!1,this.useRealWorldSymbolSizes=!1,this.scaleFactor=1,this.minSizePx=0,this.size=0,this.sizePx=0}get fixedSize(){return this.drawScreenSpace?this.sizePx:this.size}get screenMinSize(){return this.useFixedSizes?0:this.minSizePx}get drawScreenSpace(){return this.useFixedSizes&&!this.useRealWorldSymbolSizes}},z=class extends B{constructor(t,n,r){super(t),this.origin=t,this.isLeaf=n,this.splatSize=r}};function L(o){let t=new $,n=R(o.output),{vertex:r,fragment:I}=t;t.vertex.include(F,o),t.attributes.add("position","vec3"),t.attributes.add("color","vec3"),r.uniforms.add(new j("modelView",(i,e)=>h(D,e.camera.viewMatrix,P(D,i.origin))),new _("proj",i=>i.camera.projectionMatrix),new d("screenMinMaxSize",(i,e,a)=>p(S,a.useFixedSizes?0:a.minSizePx*e.camera.pixelRatio,U(i.isLeaf)*e.camera.pixelRatio)),o.useFixedSizes?new H("pointScale",(i,e)=>p(S,i.fixedSize*e.camera.pixelRatio,e.camera.fullHeight)):new d("pointScale",(i,e,a)=>p(S,i.splatSize*a.scaleFactor*e.camera.pixelRatio,e.camera.fullHeight/e.camera.pixelRatio))),o.clippingEnabled?r.uniforms.add(new m("clipMin",(i,e,a)=>l(E,a.clipBox[0]-i.origin[0],a.clipBox[1]-i.origin[1],a.clipBox[2]-i.origin[2])),new m("clipMax",(i,e,a)=>l(E,a.clipBox[3]-i.origin[0],a.clipBox[4]-i.origin[1],a.clipBox[5]-i.origin[2]))):(r.constants.add("clipMin","vec3",[-s,-s,-s]),r.constants.add("clipMax","vec3",[s,s,s])),n&&t.varyings.add("vColor","vec3"),r.main.add(c`
    // Move clipped points outside of clipspace
    if (position.x < clipMin.x || position.y < clipMin.y || position.z < clipMin.z ||
      position.x > clipMax.x || position.y > clipMax.y || position.z > clipMax.z) {
      gl_Position = ${u};
      gl_PointSize = 0.0;
      return;
    }

    if (rejectBySlice(position)) {
      gl_Position = ${u};
      gl_PointSize = 0.0;
      return;
    }

    // Position in camera space
    vec4 camera = modelView * vec4(position, 1.0);

    float pointSize = pointScale.x;
    vec4 position = proj * camera;
    ${o.drawScreenSize?c`float clampedScreenSize = pointSize;`:c`float pointRadius = 0.5 * pointSize;
           vec4 cameraOffset = camera + vec4(0.0, pointRadius, 0.0, 0.0);
           vec4 positionOffset = proj * cameraOffset;
           float radius = abs(positionOffset.y - position.y);
           float viewHeight = pointScale.y;
           // screen diameter = (2 * r / w) * (h / 2)
           float screenPointSize = (radius / position.w) * viewHeight;
           float clampedScreenSize = clamp(screenPointSize, screenMinMaxSize.x, screenMinMaxSize.y);
           // Shift towards camera, to move rendered point out of terrain i.e. to
           // the camera-facing end of the virtual point when considering it as a
           // 3D sphere.
           camera.xyz -= normalize(camera.xyz) * pointRadius * clampedScreenSize / screenPointSize;
           position = proj * camera;`}

    gl_PointSize = clampedScreenSize;
    gl_Position = position;
    ${n?c`vColor = color;`:""}`),t.include(C,o);let g=0;return n&&o.hasEmission&&(t.outputs.add("fragColor","vec4",g++),t.outputs.add("fragEmission","vec4",g++)),I.main.add(c`
    vec2 vOffset = gl_PointCoord - vec2(0.5, 0.5);
    float r2 = dot(vOffset, vOffset);

    if (r2 > 0.25) {
      discard;
    }
    calculateOcclusionAndOutputHighlight();
    ${f(n,`fragColor = vec4(vColor, 1.0);
      ${f(o.hasEmission,"fragEmission = vec4(vec3(0.0), 1.0);")}`)}
  `),t}function U(o){return o?256:64}var D=M(),E=v(),S=O(),si=Object.freeze(Object.defineProperty({__proto__:null,PointRendererDrawParameters:z,PointRendererPassParameters:x,build:L,getMaxPointSizeScreenspace:U},Symbol.toStringTag,{value:"Module"}));export{x as a,z as b,L as c,U as d,si as e};
