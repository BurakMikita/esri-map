import{a as pe,b as de,c as S,n as ce}from"./chunk-NYO34HFO.js";import{a as me}from"./chunk-KQTDRXW7.js";import{a as se}from"./chunk-BPRPPUCD.js";import{a as oe}from"./chunk-JXKPIB3A.js";import{a as X}from"./chunk-KM2EW6DR.js";import{a as le}from"./chunk-L3VRDRYJ.js";import{a as re}from"./chunk-ZPRRJLBJ.js";import{a as ne}from"./chunk-EEIBN36S.js";import{f as K}from"./chunk-A2FJ55XA.js";import{a as g}from"./chunk-VGAXEXH3.js";import{a as Y,b as Z,d as P}from"./chunk-3QBD2465.js";import{a as v}from"./chunk-JYIOFSCM.js";import{a as q}from"./chunk-O6MDTSVU.js";import{a as F,f as b}from"./chunk-ZRT7THTA.js";import{a as te}from"./chunk-PMVHKVIR.js";import{a as ie}from"./chunk-J6SMZZK2.js";import{a as L}from"./chunk-IUFXCA3M.js";import{a as Q}from"./chunk-3RSKBJV5.js";import{a as ae}from"./chunk-2OFKI5R7.js";import{a as ee}from"./chunk-K55TYFIP.js";import{a as c}from"./chunk-B2KD3GMI.js";import{a as t,b as m}from"./chunk-ZMBCTCSM.js";import{c as w,g as R}from"./chunk-67YVG46W.js";import{a as G}from"./chunk-6QJXCAOV.js";import{a as H,g as J}from"./chunk-OFITSWDI.js";import{b as k}from"./chunk-RVXINLOX.js";import{b as B}from"./chunk-RL4CZUGQ.js";import{a as U}from"./chunk-RKEKPWE4.js";import{b as N}from"./chunk-ECVQ7ERL.js";var l={dash:[4,3],dot:[1,3],"long-dash":[8,3],"short-dash":[4,1],"short-dot":[1,1]},ye={dash:l.dash,"dash-dot":[...l.dash,...l.dot],dot:l.dot,"long-dash":l["long-dash"],"long-dash-dot":[...l["long-dash"],...l.dot],"long-dash-dot-dot":[...l["long-dash"],...l.dot,...l.dot],none:null,"short-dash":l["short-dash"],"short-dash-dot":[...l["short-dash"],...l["short-dot"]],"short-dash-dot-dot":[...l["short-dash"],...l["short-dot"],...l["short-dot"]],"short-dot":l["short-dot"],solid:null},Ce=8,A=class{constructor(i,n,r){this.image=i,this.width=n,this.length=r,this.uuid=U()}};function x(e){return e!=null&&"image"in e}function we(e,i){return e==null?e:{pattern:e.slice(),pixelRatio:i}}function je(e){return{pattern:[e,e],pixelRatio:2}}function Ve(e){switch(e?.type){case"style":return Re(e.style);case"image":return new A(e.image,e.width,e.length);case void 0:case null:return null}return null}function Re(e){return e!=null?we(ye[e],Ce):null}var y=class{constructor(i,n,r){this._createTexture=i,this._parametersKey=n,this._repository=new Map,this._orphanCache=r.newCache(`procedural-texture-repository:${N()}`,o=>o.dispose())}destroy(){for(let{texture:i}of this._repository.values())i.dispose();this._repository.clear(),this._orphanCache.destroy()}swap(i,n=null){let r=this._acquire(i);return this.release(n),r}release(i){if(i==null)return;let n=this._parametersKey(i),r=this._repository.get(n);if(r&&(r.refCount--,r.refCount===0)){this._repository.delete(n);let{texture:o}=r;this._orphanCache.put(n,o)}}_acquire(i){if(i==null)return null;let n=this._parametersKey(i),r=this._repository.get(n);if(r)return r.refCount++,r.texture;let o=this._orphanCache.pop(n)??this._createTexture(i),a=new z(o);return this._repository.set(n,a),o}},z=class{constructor(i){this.texture=i,this.refCount=1}};function Je(e,i){return new y(n=>{if(x(n))return be(e,n.image);let{data:r,textureSize:o}=Fe(n),a=new F(o,1);return a.dataType=R.FLOAT,a.pixelFormat=6403,a.internalFormat=w.R16F,a.wrapMode=10497,new b(e,a,r)},n=>x(n)?`image-${n.uuid}`:`${n.pattern.join(",")}-r${n.pixelRatio}`,i)}function Fe(e){let i=fe(e),n=1/e.pixelRatio,r=W(e),o=[],a=1;for(let p of i){for(let d=0;d<p;d++){let T=a*(Math.min(d,p-1-d)+.5)*n;o.push(T)}a=-a}let u=Math.round(i[0]/2);return{data:new Float32Array([...o.slice(u),...o.slice(0,u)]),textureSize:r}}function fe(e){return e.pattern.map(i=>Math.round(i*e.pixelRatio))}function W(e){if(e==null)return 1;let i=fe(e);return Math.floor(i.reduce((n,r)=>n+r))}function be(e,i){let{data:n,width:r,height:o}=i,a=new F(r,o);return a.dataType=R.UNSIGNED_BYTE,a.pixelFormat=6408,a.internalFormat=w.RGBA8,a.wrapMode={s:10497,t:33071},a.hasMipmap=!0,a.samplingMode=9987,new b(e,a,n)}function ue(e){return e==null?J:e.length===4?e:k(Ae,e[0],e[1],e[2],1)}var Ae=H();function he(e,i){if(!i.stippleEnabled)return void e.fragment.code.add(t`float getStippleAlpha(float lineWidth) { return 1.0; }
void discardByStippleAlpha(float stippleAlpha, float threshold) {}
vec4 blendStipple(vec4 color, float stippleAlpha) { return color; }`);let n=!(i.draped&&i.stipplePreferContinuous),{vertex:r,fragment:o}=e;i.draped||(Y(r,i),r.uniforms.add(new L("worldToScreenPerDistanceRatio",({camera:a})=>1/a.perScreenPixelRatio)).code.add(t`float computeWorldToScreenRatio(vec3 segmentCenter) {
float segmentDistanceToCamera = length(segmentCenter - cameraPosition);
return worldToScreenPerDistanceRatio / segmentDistanceToCamera;
}`)),e.varyings.add("vStippleDistance","float"),e.varyings.add("vStippleDistanceLimits","vec2"),e.varyings.add("vStipplePatternStretch","float"),r.code.add(t`
    float discretizeWorldToScreenRatio(float worldToScreenRatio) {
      float step = ${t.float(ze)};

      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);
      return discreteWorldToScreenRatio;
    }
  `),P(r),r.code.add(t`
    vec2 computeStippleDistanceLimits(float startPseudoScreen, float segmentLengthPseudoScreen, float segmentLengthScreen, float patternLength) {

      // First check if the segment is long enough to support fully screen space patterns.
      // Force sparse mode for segments that are very large in screen space even if it is not allowed,
      // to avoid imprecision from calculating with large floats.
      if (segmentLengthPseudoScreen >= ${n?"patternLength":"1e4"}) {
        // Round the screen length to get an integer number of pattern repetitions (minimum 1).
        float repetitions = segmentLengthScreen / (patternLength * pixelRatio);
        float flooredRepetitions = max(1.0, floor(repetitions + 0.5));
        float segmentLengthScreenRounded = flooredRepetitions * patternLength;

        float stretch = repetitions / flooredRepetitions;

        // We need to impose a lower bound on the stretch factor to prevent the dots from merging together when there is only 1 repetition.
        // 0.75 is the lowest possible stretch value for flooredRepetitions > 1, so it makes sense as lower bound.
        vStipplePatternStretch = max(0.75, stretch);

        return vec2(0.0, segmentLengthScreenRounded);
      }
      return vec2(startPseudoScreen, startPseudoScreen + segmentLengthPseudoScreen);
    }
  `),o.uniforms.add(new ee("stipplePatternTexture",a=>a.stippleTexture),new c("stipplePatternPixelSizeInv",a=>1/O(a))),i.stippleOffColorEnabled&&o.uniforms.add(new v("stippleOffColor",a=>ue(a.stippleOffColor))),e.include(S),i.worldSizedImagePattern?(e.varyings.add("vStippleV","float"),e.fragment.include(se),o.code.add(t`vec4 getStippleColor(out bool isClamped) {
vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;
float u = vStippleDistance * stipplePatternPixelSizeInv;
float v = vStippleV == -1.0 ? 0.5 : vStippleV;
return texture(stipplePatternTexture, vec2(u, v));
}
vec4 getStippleColor() {
bool ignored;
return getStippleColor(ignored);
}
float getStippleSDF() {
vec4 color = getStippleColor();
return color.a == 0.0 ? -0.5 : 0.5;
}
float getStippleAlpha(float lineWidth) {
return getStippleColor().a;
}
vec4 blendStipple(vec4 color, float stippleAlpha) {
vec4 stippleColor = getStippleColor();
int mixMode  = 1;
vec3 col = mixExternalColor(color.rgb, vec3(1.0), stippleColor.rgb, mixMode);
float opacity = mixExternalOpacity(color.a, 1.0, stippleColor.a, mixMode);
return vec4(col, opacity);
}`)):o.code.add(t`
    float getStippleSDF(out bool isClamped) {
      float stippleDistanceClamped = noPerspectiveRead(clamp(vStippleDistance, vStippleDistanceLimits.x, vStippleDistanceLimits.y));
      float lineSizeInv = noPerspectiveRead(vLineSizeInv);

      vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
      isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;

      float u = stippleDistanceClamped * stipplePatternPixelSizeInv * lineSizeInv;
      u = fract(u);

      float sdf = texture(stipplePatternTexture, vec2(u, 0.5)).r;

      return (sdf - 0.5) * vStipplePatternStretch + 0.5;
    }

    float getStippleSDF() {
      bool ignored;
      return getStippleSDF(ignored);
    }

    float getStippleAlpha(float lineWidth) {
      bool isClamped;
      float stippleSDF = getStippleSDF(isClamped);
      float antiAliasedResult = clamp(stippleSDF * lineWidth + 0.5, 0.0, 1.0);
      return isClamped ? floor(antiAliasedResult + 0.5) : antiAliasedResult;
    }

    vec4 blendStipple(vec4 color, float stippleAlpha) {
      return ${i.stippleOffColorEnabled?"mix(color, stippleOffColor, stippleAlpha)":"vec4(color.rgb, color.a * stippleAlpha)"};
    }
  `),o.code.add(t`
    void discardByStippleAlpha(float stippleAlpha, float threshold) {
     ${m(!i.stippleOffColorEnabled,"if (stippleAlpha < threshold) { discard; }")}
    }
  `)}function O(e){let i=e.stipplePattern;return x(i)?i.length:i?W(i)/i.pixelRatio:1}var ze=.4;var ct=.1,ve=1,ge=1,mt=1e3,ft=!1,ut=3,ht=1,vt=27e6,gt=501,St=256;var xt=3,Tt=2,Dt=2;function Se(e,i){let{hasAnimation:n,animation:r}=i;if(!n)return;let{attributes:o,varyings:a,vertex:u,fragment:p}=e;o.add("timeStamps","vec4"),a.add("vTimeStamp","float"),a.add("vFirstTime","float"),a.add("vLastTime","float"),a.add("vTransitionType","float"),u.main.add(t`vTimeStamp = timeStamps.x;
vFirstTime = timeStamps.y;
vLastTime = timeStamps.z;
vTransitionType = timeStamps.w;`),r===3&&p.constants.add("decayRate","float",2.3),p.code.add(t`
    float getTrailOpacity(float x) {
      if (x < 0.0) {
        return 0.0;
      }

      ${We(r)}
    }`),p.uniforms.add(new c("timeElapsed",d=>d.timeElapsed),new c("trailLength",d=>d.trailLength),new c("speed",d=>d.animationSpeed),new te("startEndTime",d=>B(Oe,d.startTime,d.endTime))),p.constants.add("fadeInTime","float",ge),p.constants.add("fadeOutTime","float",ve),p.constants.add("incomingTransition","int",0),p.constants.add("outgoingTransition","int",2),p.code.add(t`float fadeIn(float x) {
return smoothstep(0.0, fadeInTime, x);
}
float fadeOut(float x) {
return isinf(fadeOutTime) ? 1.0 : smoothstep(fadeOutTime, 0.0, x);
}
void updateAlphaIf(inout float alpha, bool condition, float newAlpha) {
alpha = condition ? min(alpha, newAlpha) : alpha;
}
vec4 animate(vec4 color) {
float startTime = startEndTime[0];
float endTime = startEndTime[1];
float totalTime = vLastTime - vFirstTime;
float actualFadeOutTime = min(fadeOutTime * speed, trailLength);
float longStreamlineThreshold = (fadeInTime + 1.0) * speed + actualFadeOutTime;
bool longStreamline = totalTime > longStreamlineThreshold;
float totalTimeWithFadeOut = longStreamline && actualFadeOutTime != trailLength ? totalTime : totalTime + actualFadeOutTime;
float fadeOutStartTime = longStreamline ? totalTime - actualFadeOutTime : totalTime;
float originTime =  -vFirstTime;
float actualEndTime = int(vTransitionType) == outgoingTransition ? min(endTime, startTime + vLastTime / speed) : endTime;
vec4 animatedColor = color;
if (speed == 0.0) {
float alpha = getTrailOpacity((totalTimeWithFadeOut - (vTimeStamp - vFirstTime)) / trailLength);
updateAlphaIf(alpha, !isinf(actualEndTime), fadeOut(timeElapsed - actualEndTime));
updateAlphaIf(alpha, true, fadeIn(timeElapsed - startTime));
animatedColor.a *= alpha;
return animatedColor;
}
float relativeStartTime = mod(startTime, totalTimeWithFadeOut);
float shiftedTimeElapsed = timeElapsed - relativeStartTime + originTime;
float headRelativeToFirst = mod(shiftedTimeElapsed * speed, totalTimeWithFadeOut);
float vRelativeToHead = headRelativeToFirst - originTime - vTimeStamp;
float vAbsoluteTime = timeElapsed - vRelativeToHead / speed;
if (startTime > timeElapsed) {
return vec4(0.0);
}
float alpha = getTrailOpacity(vRelativeToHead / trailLength);
updateAlphaIf(alpha, true, fadeIn(timeElapsed - startTime));
updateAlphaIf(alpha, !isinf(actualEndTime), fadeOut(timeElapsed - actualEndTime));
updateAlphaIf(alpha, int(vTransitionType) != incomingTransition, step(startTime, vAbsoluteTime));
updateAlphaIf(alpha, headRelativeToFirst > fadeOutStartTime, fadeOut((headRelativeToFirst - fadeOutStartTime) / speed));
alpha *= fadeIn(vTimeStamp - vFirstTime);
animatedColor.a *= alpha;
return animatedColor;
}`)}function We(e){switch(e){case 2:return"return x >= 0.0 && x <= 1.0 ? 1.0 : 0.0;";case 3:return`float cutOff = exp(-decayRate);
        return (exp(-decayRate * x) - cutOff) / (1.0 - cutOff);`;default:return"return 1.0;"}}var Oe=G();var E=1;function Ee(e){let i=new ae,{attributes:n,varyings:r,vertex:o,fragment:a}=i,{applyMarkerOffset:u,draped:p,output:d,capType:T,stippleEnabled:f,falloffEnabled:I,roundJoins:xe,wireframe:j,innerColorEnabled:Te,hasAnimation:De,hasScreenSizePerspective:D,worldSizedImagePattern:V}=e;a.include(oe),i.include(pe,e),i.include(he,e),i.include(X,e),i.include(re,e),i.include(Se,e);let _=u&&!p;_&&(o.uniforms.add(new c("markerScale",s=>s.markerScale)),i.include(ce,{space:2,hasScreenSizePerspective:D})),Z(o,e),o.uniforms.add(new q("inverseProjectionMatrix",s=>s.camera.inverseProjectionMatrix),new Q("nearFar",s=>s.camera.nearFar),new c("miterLimit",s=>s.join!=="miter"?0:s.miterLimit),new ie("viewport",s=>s.camera.fullViewport)),o.constants.add("LARGE_HALF_FLOAT","float",65500),n.add("position","vec3"),n.add("previousDelta","vec4"),n.add("nextDelta","vec4"),n.add("lineParameters","vec2"),n.add("u0","float"),r.add("vColor","vec4"),r.add("vpos","vec3",{invariant:!0}),r.add("vLineDistance","float"),r.add("vLineWidth","float");let $=f;$&&r.add("vLineSizeInv","float");let h=T===2,M=f&&h,C=I||M;C&&r.add("vLineDistanceNorm","float"),h&&(r.add("vSegmentSDF","float"),r.add("vReverseSegmentSDF","float")),o.code.add(t`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}
float interp(float ncp, vec4 a, vec4 b) {
return (-ncp - a.z) / (b.z - a.z);
}
vec2 rotate(vec2 v, float a) {
float s = sin(a);
float c = cos(a);
mat2 m = mat2(c, -s, s, c);
return m * v;
}`),o.code.add(t`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),o.code.add(t`void clip(
inout vec4 pos,
inout vec4 prev,
inout vec4 next,
bool isStartVertex
) {
float vnp = nearFar[0] * 0.99;
if (pos.z > -nearFar[0]) {
if (!isStartVertex) {
if (prev.z < -nearFar[0]) {
pos = mix(prev, pos, interp(vnp, prev, pos));
next = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
} else {
if (next.z < -nearFar[0]) {
pos = mix(pos, next, interp(vnp, pos, next));
prev = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
}
} else {
if (prev.z > -nearFar[0]) {
prev = mix(pos, prev, interp(vnp, pos, prev));
}
if (next.z > -nearFar[0]) {
next = mix(next, pos, interp(vnp, next, pos));
}
}
}`),P(o),o.constants.add("aaWidth","float",f?0:1).main.add(t`
    // unpack values from vertex type
    bool isStartVertex = abs(abs(lineParameters.y) - 3.0) == 1.0;
    vec3 prevPosition = position + previousDelta.xyz * previousDelta.w;
    vec3 nextPosition = position + nextDelta.xyz * nextDelta.w;

    float coverage = 1.0;

    // Check for special value of lineParameters.y which is used by the Renderer when graphics are removed before the
    // VBO is recompacted. If this is the case, then we just project outside of clip space.
    if (lineParameters.y == 0.0) {
      gl_Position = ${me};
    }
    else {
      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(prevPosition, 1.0);
      vec4 next = view * vec4(nextPosition, 1.0);

      bool isJoin = abs(lineParameters.y) < 3.0;
  `),_&&o.main.add(t`vec4 other = isStartVertex ? next : prev;
bool markersHidden = areWorldMarkersHidden(pos.xyz, other.xyz);
if (!isJoin && !markersHidden) {
pos.xyz += normalize(other.xyz - pos.xyz) * getWorldMarkerSize(pos.xyz) * 0.5;
}`),i.include(de),o.main.add(t`
      clip(pos, prev, next, isStartVertex);

      vec3 clippedPos = pos.xyz;
      vec3 clippedCenter = mix(pos.xyz, isStartVertex ? next.xyz : prev.xyz, 0.5);

      forwardViewPosDepth(pos.xyz);

      pos = projectAndScale(pos);
      next = projectAndScale(next);
      prev = projectAndScale(prev);

      vec2 left = (pos.xy - prev.xy);
      vec2 right = (next.xy - pos.xy);

      float leftLen = length(left);
      float rightLen = length(right);

      float lineSize = getSize(${m(D,"clippedPos")});
      ${m(f&&D,"float patternLineSize = getSize(clippedCenter);")}
      ${m(f&&!D,"float patternLineSize = lineSize;")}

      ${m(V,t`
          lineSize += aaWidth;
          float lineWidth = lineSize * pixelRatio * worldToScreenRatio;
          if (lineWidth < 1.0) {
            coverage = lineWidth;
            lineWidth = 1.0;
          }
        `,t`
          if (lineSize < 1.0) {
            coverage = lineSize; // convert sub-pixel coverage to alpha
            lineSize = 1.0;
          }

          lineSize += aaWidth;
          float lineWidth = lineSize * pixelRatio;
        `)}

      vLineWidth = noPerspectiveWrite(lineWidth, pos.w);
      ${$?t`vLineSizeInv = noPerspectiveWrite(1.0 / lineSize, pos.w);`:""}
  `),(f||h)&&o.main.add(t`
      float isEndVertex = float(!isStartVertex);
      vec2 segmentOrigin = mix(pos.xy, prev.xy, isEndVertex);
      vec2 segment = mix(right, left, isEndVertex);
      ${h?t`vec2 segmentEnd = mix(next.xy, pos.xy, isEndVertex);`:""}
    `),o.main.add(t`left = (leftLen > 0.001) ? left/leftLen : vec2(0.0, 0.0);
right = (rightLen > 0.001) ? right/rightLen : vec2(0.0, 0.0);
vec2 capDisplacementDir = vec2(0, 0);
vec2 joinDisplacementDir = vec2(0, 0);
float displacementLen = lineWidth;
if (isJoin) {
bool isOutside = (left.x * right.y - left.y * right.x) * lineParameters.y > 0.0;
joinDisplacementDir = normalize(left + right);
joinDisplacementDir = perpendicular(joinDisplacementDir);
if (leftLen > 0.001 && rightLen > 0.001) {
float nDotSeg = dot(joinDisplacementDir, left);
displacementLen /= length(nDotSeg * left - joinDisplacementDir);
if (!isOutside) {
displacementLen = min(displacementLen, min(leftLen, rightLen)/abs(nDotSeg));
}
}
float subdivisionFactor = lineParameters.x;
if (isOutside && (displacementLen > miterLimit * lineWidth)) {`),xe?o.main.add(t`
        vec2 startDir = leftLen < 0.001 ? right : left;
        startDir = perpendicular(startDir);

        vec2 endDir = rightLen < 0.001 ? left : right;
        endDir = perpendicular(endDir);

        float factor = ${f?t`min(1.0, subdivisionFactor * ${t.float((E+2)/(E+1))})`:t`subdivisionFactor`};

        float rotationAngle = acos(clamp(dot(startDir, endDir), -1.0, 1.0));
        joinDisplacementDir = rotate(startDir, -sign(lineParameters.y) * factor * rotationAngle);
      `):o.main.add(t`if (leftLen < 0.001) {
joinDisplacementDir = right;
}
else if (rightLen < 0.001) {
joinDisplacementDir = left;
}
else {
joinDisplacementDir = (isStartVertex || subdivisionFactor > 0.0) ? right : left;
}
joinDisplacementDir = perpendicular(joinDisplacementDir);`);let Le=T!==0;return o.main.add(t`
        displacementLen = lineWidth;
      }
    } else {
      // CAP handling ---------------------------------------------------
      joinDisplacementDir = isStartVertex ? right : left;
      joinDisplacementDir = perpendicular(joinDisplacementDir);

      ${Le?t`capDisplacementDir = isStartVertex ? -right : left;`:""}
    }
  `),o.main.add(t`
    // Displacement (in pixels) caused by join/or cap
    vec2 dpos = joinDisplacementDir * sign(lineParameters.y) * displacementLen + capDisplacementDir * displacementLen;
    float lineDistNorm = noPerspectiveWrite(sign(lineParameters.y), pos.w);

    vLineDistance = lineWidth * lineDistNorm;
    ${C?t`vLineDistanceNorm = lineDistNorm;`:""}

    pos.xy += dpos;
  `),h&&o.main.add(t`vec2 segmentDir = normalize(segment);
vSegmentSDF = noPerspectiveWrite((isJoin && isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentOrigin, segmentDir)), pos.w);
vReverseSegmentSDF = noPerspectiveWrite((isJoin && !isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentEnd, -segmentDir)), pos.w);`),f&&(p?o.uniforms.add(new L("worldToScreenRatio",s=>1/s.screenToPCSRatio)):o.main.add(t`vec3 segmentCenter = mix((nextPosition + position) * 0.5, (position + prevPosition) * 0.5, isEndVertex);
float worldToScreenRatio = computeWorldToScreenRatio(segmentCenter);`),o.main.add(t`float segmentLengthScreenDouble = length(segment);
float segmentLengthScreen = segmentLengthScreenDouble * 0.5;
float discreteWorldToScreenRatio = discretizeWorldToScreenRatio(worldToScreenRatio);
float segmentLengthRender = length(mix(nextPosition - position, position - prevPosition, isEndVertex));
vStipplePatternStretch = worldToScreenRatio / discreteWorldToScreenRatio;`),p?o.main.add(t`float segmentLengthPseudoScreen = segmentLengthScreen / pixelRatio * discreteWorldToScreenRatio / worldToScreenRatio;
float startPseudoScreen = u0 * discreteWorldToScreenRatio - mix(0.0, segmentLengthPseudoScreen, isEndVertex);`):o.main.add(t`float startPseudoScreen = mix(u0, u0 - segmentLengthRender, isEndVertex) * discreteWorldToScreenRatio;
float segmentLengthPseudoScreen = segmentLengthRender * discreteWorldToScreenRatio;`),o.uniforms.add(new c("stipplePatternPixelSize",s=>O(s))),o.main.add(t`
      float patternLength = patternLineSize * stipplePatternPixelSize;

      ${m(V,t`
          float uu = mix(u0, u0 - segmentLengthRender, isEndVertex);
          vStippleDistanceLimits = vec2(uu, uu + segmentLengthRender);
          vStipplePatternStretch = 1.0;

          // The v-coordinate used in case of an image pattern.
          bool isLeft = sign(lineParameters.y) < 0.0;
          vStippleV = isLeft ? 0.0 : 1.0;
        `,t`
          // Compute the coordinates at both start and end of the line segment, because we need both to clamp to in the
          // fragment shader
          vStippleDistanceLimits = computeStippleDistanceLimits(startPseudoScreen, segmentLengthPseudoScreen, segmentLengthScreen, patternLength);
        `)}

      vStippleDistance = mix(vStippleDistanceLimits.x, vStippleDistanceLimits.y, isEndVertex);

      // Adjust the coordinate to the displaced position (the pattern is shortened/overextended on the in/outside of
      // joins)
      if (segmentLengthScreenDouble >= 0.001) {
        // Project the actual vertex position onto the line segment. Note that the resulting factor is within [0..1]
        // at the original vertex positions, and slightly outside of that range at the displaced positions
        vec2 stippleDisplacement = pos.xy - segmentOrigin;
        float stippleDisplacementFactor = dot(segment, stippleDisplacement) / (segmentLengthScreenDouble * segmentLengthScreenDouble);

        // Apply this offset to the actual vertex coordinate (can be screen or pseudo-screen space)
        vStippleDistance += (stippleDisplacementFactor - isEndVertex) * (vStippleDistanceLimits.y - vStippleDistanceLimits.x);
      }

      // Cancel out perspective correct interpolation because we want this length the really represent the screen
      // distance
      vStippleDistanceLimits = noPerspectiveWrite(vStippleDistanceLimits, pos.w);
      vStippleDistance = noPerspectiveWrite(vStippleDistance, pos.w);

      // Disable stipple distance limits on caps
      vStippleDistanceLimits = isJoin ?
                                 vStippleDistanceLimits :
                                 isStartVertex ?
                                  vec2(-1e34, vStippleDistanceLimits.y) :
                                  vec2(vStippleDistanceLimits.x, 1e34);
    `)),o.main.add(t`
      // Convert back into NDC
      pos.xy = (pos.xy / viewport.zw) * pos.w;

      vColor = getColor();
      vColor.a = noPerspectiveWrite(vColor.a * coverage, pos.w);

      ${j&&!p?"pos.z -= 0.001 * pos.w;":""}

      // transform final position to camera space for slicing
      vpos = (inverseProjectionMatrix * pos).xyz;
      gl_Position = pos;
      forwardObjectAndLayerIdColor();
    }`),i.fragment.include(K,e),i.include(le,e),a.include(ne),a.main.add(t`discardBySlice(vpos);
discardByTerrainDepth();`),i.include(S),a.main.add(t`
    float lineWidth = noPerspectiveRead(vLineWidth);
    float lineDistance = noPerspectiveRead(vLineDistance);
    ${m(C,t`float lineDistanceNorm = noPerspectiveRead(vLineDistanceNorm);`)}
  `),j?a.main.add(t`vec4 finalColor = vec4(1.0, 0.0, 1.0, 1.0);`):(h&&a.main.add(t`
        float sdf = noPerspectiveRead(min(vSegmentSDF, vReverseSegmentSDF));
        vec2 fragmentPosition = vec2(min(sdf, 0.0), lineDistance);

        float fragmentRadius = length(fragmentPosition);
        float fragmentCapSDF = (fragmentRadius - lineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
        float capCoverage = clamp(0.5 - fragmentCapSDF, 0.0, 1.0);

        if (capCoverage < ${t.float(g)}) {
          discard;
        }
      `),M?a.main.add(t`
      vec2 stipplePosition = vec2(
        min(getStippleSDF() * 2.0 - 1.0, 0.0),
        lineDistanceNorm
      );
      float stippleRadius = length(stipplePosition * lineWidth);
      float stippleCapSDF = (stippleRadius - lineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
      float stippleCoverage = clamp(0.5 - stippleCapSDF, 0.0, 1.0);
      float stippleAlpha = step(${t.float(g)}, stippleCoverage);
      `):a.main.add(t`float stippleAlpha = getStippleAlpha(lineWidth);`),d!==9&&a.main.add(t`discardByStippleAlpha(stippleAlpha, ${t.float(g)});`),i.include(S),a.uniforms.add(new v("intrinsicColor",s=>s.color)).main.add(t`vec4 color = intrinsicColor * vColor;
color.a = noPerspectiveRead(color.a);`),Te&&a.uniforms.add(new v("innerColor",s=>s.innerColor??s.color),new c("innerWidth",(s,Pe)=>s.innerWidth*Pe.camera.pixelRatio)).main.add(t`float distToInner = abs(lineDistance) - innerWidth;
float innerAA = clamp(0.5 - distToInner, 0.0, 1.0);
float innerAlpha = innerColor.a + color.a * (1.0 - innerColor.a);
color = mix(color, vec4(innerColor.rgb, innerAlpha), innerAA);`),a.main.add(t`vec4 finalColor = blendStipple(color, stippleAlpha);`),I&&(a.uniforms.add(new c("falloff",s=>s.falloff)),a.main.add(t`finalColor.a *= pow(max(0.0, 1.0 - abs(lineDistanceNorm)), falloff);`)),f||a.main.add(t`float featherStartDistance = max(lineWidth - 2.0, 0.0);
float value = abs(lineDistance);
float feather = (value - featherStartDistance) / (lineWidth - featherStartDistance);
finalColor.a *= 1.0 - clamp(feather, 0.0, 1.0);`),De&&a.main.add(t`
        finalColor = animate(finalColor);

        ${m(d!==9,t`
            if (finalColor.a <= ${t.float(g)}) {
              discard;
            }`)}
      `)),a.main.add(t`outputColorHighlightOLID(applySlice(finalColor, vpos), finalColor.rgb);`),i}var Zt=Object.freeze(Object.defineProperty({__proto__:null,build:Ee,ribbonlineNumRoundJoinSubdivisions:E},Symbol.toStringTag,{value:"Module"}));export{x as a,je as b,Ve as c,y as d,Je as e,ct as f,ve as g,ge as h,mt as i,ft as j,ut as k,ht as l,vt as m,gt as n,St as o,xt as p,Tt as q,Dt as r,E as s,Ee as t,Zt as u};
