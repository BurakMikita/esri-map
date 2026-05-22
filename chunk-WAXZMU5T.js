import{a as s}from"./chunk-TJA4TQCZ.js";import{a as h,b as P,c as C}from"./chunk-V56YTXXT.js";import{a as m}from"./chunk-LXQQXD2R.js";import{a as y}from"./chunk-EEIBN36S.js";import{a as p}from"./chunk-UAVBXAJ7.js";import{a as u}from"./chunk-DK3KECNU.js";import{a as n}from"./chunk-PMVHKVIR.js";import{a as g}from"./chunk-2OFKI5R7.js";import{a as c}from"./chunk-K55TYFIP.js";import{a as i}from"./chunk-B2KD3GMI.js";import{a as r}from"./chunk-ZMBCTCSM.js";import{i as v}from"./chunk-JARU7KSM.js";function z(o){o.fragment.uniforms.add(new c("u_colormap",e=>e.u_colormap),new i("u_colormapOffset",e=>e.colormap.u_colormapOffset),new i("u_colormapMaxIndex",e=>e.colormap.u_colormapMaxIndex),new i("u_opacity",e=>e.common.u_opacity)),o.fragment.code.add(r`vec4 colormap(vec4 currentPixel, bool isFloat) {
float colorIndex = isFloat ? currentPixel.r - u_colormapOffset : currentPixel.r * 255.0 - u_colormapOffset;
vec4 result;
if (currentPixel.a == 0.0 || colorIndex > u_colormapMaxIndex) {
result = vec4(0.0, 0.0, 0.0, 0.0);
} else {
vec2 texelCoordinates = vec2((colorIndex + 0.5), 0.5);
result = texelFetch(u_colormap, ivec2(texelCoordinates), 0);
}
return result;
}`)}function b(o){o.fragment.uniforms.add(new c("u_transformGrid",e=>e.u_transformGrid),new n("u_transformSpacing",e=>e.common.u_transformSpacing),new n("u_targetImageSize",e=>e.common.u_targetImageSize)),o.fragment.code.add(r`vec2 projectPixelLocation(vec2 coords) {
vec2 index_image = floor(coords * u_targetImageSize);
vec2 oneTransformPixel = vec2(4.0, 1.0);
vec2 index_transform = floor(index_image / u_transformSpacing) * oneTransformPixel;
vec2 pos = fract((index_image + 0.5) / u_transformSpacing);
vec2 transform_location = index_transform + 0.5;
vec2 srcLocation;
if (pos.s <= pos.t) {
vec3 ll_abc = texelFetch(u_transformGrid, ivec2(transform_location), 0).rgb;
vec3 ll_def = texelFetch(u_transformGrid, ivec2(transform_location.s + 1.0, transform_location.t), 0).rgb;
srcLocation.s = dot(ll_abc, vec3(pos, 1.0));
srcLocation.t = dot(ll_def, vec3(pos, 1.0));
} else {
vec3 ur_abc = texelFetch(u_transformGrid, ivec2(transform_location.s + 2.0, transform_location.t), 0).rgb;
vec3 ur_def = texelFetch(u_transformGrid, ivec2(transform_location.s + 3.0, transform_location.t), 0).rgb;
srcLocation.s = dot(ur_abc, vec3(pos, 1.0));
srcLocation.t = dot(ur_def, vec3(pos, 1.0));
}
return srcLocation;
}`)}var d=class extends h{constructor(e,l,a){super(),this.common=e,this.u_image=l,this.u_transformGrid=a}};function O(o,e){o.include(b),o.fragment.uniforms.add(new c("u_image",a=>a.u_image),new s("u_flipY",a=>a.common.u_flipY),new s("u_applyTransform",a=>a.common.u_applyTransform));let{requireBilinearWithNN:l}=e;l&&o.fragment.uniforms.add(new n("u_srcImageSize",a=>a.common.u_srcImageSize)),o.fragment.code.add(r`vec2 getPixelLocation(vec2 coords) {
vec2 targetLocation = u_flipY ? vec2(coords.s, 1.0 - coords.t) : coords;
if (!u_applyTransform) {
return targetLocation;
}
return projectPixelLocation(targetLocation);
}
bool isOutside(vec2 coords){
if (coords.t>1.00001 ||coords.t<-0.00001 || coords.s>1.00001 ||coords.s<-0.00001) {
return true;
} else {
return false;
}
}`),l?o.fragment.code.add(r`vec4 sampleBilinear(sampler2D sampler, vec2 coords, vec2 texSize) {
vec2 texelStart = floor(coords * texSize);
vec2 coord0 = texelStart / texSize;
vec2 coord1 = (texelStart +  vec2(1.0, 0.0)) / texSize;
vec2 coord2 = (texelStart +  vec2(0.0, 1.0)) / texSize;
vec2 coord3 = (texelStart +  vec2(1.0, 1.0)) / texSize;
vec4 color0 = texture(sampler, coord0);
vec4 color1 = texture(sampler, coord1);
vec4 color2 = texture(sampler, coord2);
vec4 color3 = texture(sampler, coord3);
vec2 blend = fract(coords * texSize);
vec4 color01 = mix(color0, color1, blend.x);
vec4 color23 = mix(color2, color3, blend.x);
vec4 color = mix(color01, color23, blend.y);
float alpha = floor(color0.a * color1.a * color2.a * color3.a + 0.5);
color = color * alpha + (1.0 - alpha) * texture(sampler, coords);
return color;
}
vec4 getPixel(vec2 pixelLocation) {
return sampleBilinear(u_image, pixelLocation, u_srcImageSize);
}`):o.fragment.code.add(r`vec4 getPixel(vec2 pixelLocation) {
return texture(u_image, pixelLocation);
}`)}var f=class extends d{constructor(e,l,a,t,L,w){super(e,t,L),this.colormap=l,this.symbolizer=a,this.u_colormap=w,this.backgroundColor=v,this.fboTexture=null,this.baseOpacity=1}},x=class extends f{},_=class extends f{};function V(o){let e=new g;return e.include(P),e.include(O,o),e.include(z,o),e.include(C,o),e.fragment.code.add(r`vec4 applyBackgroundBlend(vec4 layerColor) {
return blendLayers(vuv, layerColor, u_opacity);
}`),o.colorizerType===0?S(e,o):o.colorizerType===1?B(e):o.colorizerType===2&&k(e,o),e}function B(o){o.fragment.main.add(r`vec2 pixelLocation = getPixelLocation(uv);
if (isOutside(pixelLocation)) {
fragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
return;
}
vec4 currentPixel = getPixel(pixelLocation);
fragColor = applyBackgroundBlend(colormap(currentPixel, true));`)}function S(o,e){o.fragment.uniforms.add(new p("u_bandCount",a=>a.symbolizer.u_bandCount),new u("u_minCutOff",a=>a.symbolizer.u_minCutOff),new u("u_maxCutOff",a=>a.symbolizer.u_maxCutOff),new u("u_factor",a=>a.symbolizer.u_factor),new i("u_minOutput",a=>a.symbolizer.u_minOutput),new i("u_maxOutput",a=>a.symbolizer.u_maxOutput),new s("u_useGamma",a=>a.symbolizer.u_useGamma),new u("u_gamma",a=>a.symbolizer.u_gamma),new u("u_gammaCorrection",a=>a.symbolizer.u_gammaCorrection),new i("u_opacity",a=>a.common.u_opacity)),o.fragment.code.add(r`float stretchOneValue(float val, float minCutOff, float maxCutOff, float minOutput, float maxOutput, float factor, bool useGamma, float gamma, float gammaCorrection) {
if (val >= maxCutOff) {
return maxOutput;
} else if (val <= minCutOff) {
return minOutput;
}
float stretchedVal;
if (useGamma) {
float tempf = 1.0;
float outRange = maxOutput - minOutput;
float relativeVal = (val - minCutOff) / (maxCutOff - minCutOff);
if (gamma > 1.0) {
tempf -= pow(1.0 / outRange, relativeVal * gammaCorrection);
}
stretchedVal = (tempf * outRange * pow(relativeVal, 1.0 / gamma) + minOutput) / 255.0;
} else {
stretchedVal = minOutput + (val - minCutOff) * factor;
}
return stretchedVal;
}`);let l=e.applyColormap?r`fragColor = applyBackgroundBlend(colormap(vec4(grayVal, grayVal, grayVal, currentPixel.a), !u_useGamma));`:r`fragColor = applyBackgroundBlend(vec4(grayVal, grayVal, grayVal, currentPixel.a));`;o.fragment.main.add(r`
    vec2 pixelLocation = getPixelLocation(uv);
    if (isOutside(pixelLocation)) {
      fragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
      return;
    }

    vec4 currentPixel = getPixel(pixelLocation);
    ${e.stretchType===0?r`fragColor = applyBackgroundBlend(currentPixel);`:r`
    if (currentPixel.a == 0.0) {
      fragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
      return;
    }
    if (u_bandCount == 1) {
      float grayVal = stretchOneValue(currentPixel.r, u_minCutOff[0], u_maxCutOff[0], u_minOutput, u_maxOutput, u_factor[0], u_useGamma, u_gamma[0], u_gammaCorrection[0]);
      ${l}
    } else {
      float redVal = stretchOneValue(currentPixel.r, u_minCutOff[0], u_maxCutOff[0], u_minOutput, u_maxOutput, u_factor[0], u_useGamma, u_gamma[0], u_gammaCorrection[0]);
      float greenVal = stretchOneValue(currentPixel.g, u_minCutOff[1], u_maxCutOff[1], u_minOutput, u_maxOutput, u_factor[1], u_useGamma, u_gamma[1], u_gammaCorrection[1]);
      float blueVal = stretchOneValue(currentPixel.b, u_minCutOff[2], u_maxCutOff[2], u_minOutput, u_maxOutput, u_factor[2], u_useGamma, u_gamma[2], u_gammaCorrection[2]);
      fragColor = applyBackgroundBlend(vec4(redVal, greenVal, blueVal, currentPixel.a));
    }`}`)}function k(o,e){let l=o.fragment;l.uniforms.add(new c("u_image",t=>t.u_image),new p("u_hillshadeType",t=>t.symbolizer.u_hillshadeType),new m("u_sinZcosAs",6,t=>t.symbolizer.u_sinZcosAs),new m("u_sinZsinAs",6,t=>t.symbolizer.u_sinZsinAs),new m("u_cosZs",6,t=>t.symbolizer.u_cosZs),new m("u_weights",6,t=>t.symbolizer.u_weights),new n("u_factor",t=>t.symbolizer.u_factor),new i("u_minValue",t=>t.symbolizer.u_minValue),new i("u_maxValue",t=>t.symbolizer.u_maxValue),new n("u_srcImageSize",t=>t.common.u_srcImageSize)),l.include(y),l.code.add(r`vec4 overlay(float val, float minValue, float maxValue, float hillshade, float alpha) {
val = clamp((val - minValue) / (maxValue - minValue), 0.0, 1.0);
vec4 color = colormap(vec4(val, val, val, 1.0), false);
vec3 hsv = rgb2hsv(color.rgb);
hsv.z = hillshade;
return vec4(hsv2rgb(hsv), 1.0) * alpha * color.a;
}`),l.code.add(r`float getNeighborHoodAlpha(float a, float b, float c, float d, float e, float f, float g, float h, float i){
if (a == 0.0 || a == 0.0 || a==0.0 || a == 0.0 || a == 0.0 || a==0.0 || a == 0.0 || a == 0.0 || a==0.0) {
return 0.0;
}  else {
return e;
}
}`);let a=e.applyColormap?r`fragColor = applyBackgroundBlend(overlay(ve.r, u_minValue, u_maxValue, hillshade, alpha));`:r`hillshade *= alpha;
fragColor = applyBackgroundBlend(vec4(hillshade, hillshade, hillshade, alpha));`;l.main.add(r`
      vec2 pixelLocation = getPixelLocation(uv);
      if (isOutside(pixelLocation)) {
        fragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
        return;
      }

      vec4 currentPixel = getPixel(pixelLocation);
      if (currentPixel.a == 0.0) {
        fragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
        return;
      }

      //mirror edge pixels
      vec2 axy = vec2(-1.0, -1.0);
      vec2 bxy = vec2(0.0, -1.0);
      vec2 cxy = vec2(1.0, -1.0);
      vec2 dxy = vec2(-1.0, 0.0);
      vec2 fxy = vec2(1.0, 0.0);
      vec2 gxy = vec2(-1.0, 1.0);
      vec2 hxy = vec2(0.0, 1.0);
      vec2 ixy = vec2(1.0, 1.0);
      vec2 onePixel = 1.0 / u_srcImageSize;
      if (pixelLocation.s < onePixel.s) {
        axy[0] = 1.0;
        dxy[0] = 1.0;
        gxy[0] = 1.0;
      }
      if (pixelLocation.t < onePixel.t) {
        axy[1] = 1.0;
        bxy[1] = 1.0;
        cxy[1] = 1.0;
      }
      if (pixelLocation.s > 1.0 - onePixel.s) {
        cxy[0] = -1.0;
        fxy[0] = -1.0;
        ixy[0] = -1.0;
      }
      if (pixelLocation.t > 1.0 - onePixel.t) {
        gxy[1] = -1.0;
        hxy[1] = -1.0;
        ixy[1] = -1.0;
      }

      // calculate hillshade
      vec4 va = texture(u_image, pixelLocation + onePixel * axy);
      vec4 vb = texture(u_image, pixelLocation + onePixel * bxy);
      vec4 vc = texture(u_image, pixelLocation + onePixel * cxy);
      vec4 vd = texture(u_image, pixelLocation + onePixel * dxy);
      vec4 ve = texture(u_image, pixelLocation);
      vec4 vf = texture(u_image, pixelLocation + onePixel * fxy);
      vec4 vg = texture(u_image, pixelLocation + onePixel * gxy);
      vec4 vh = texture(u_image, pixelLocation + onePixel * hxy);
      vec4 vi = texture(u_image, pixelLocation + onePixel * ixy);

      // calculate the rate of z change along the x, y, and diagonal direction
      float dzx = (vc + 2.0 * vf + vi - va - 2.0 * vd - vg).r * u_factor.s;
      float dzy = (vg + 2.0 * vh + vi - va - 2.0 * vb - vc).r * u_factor.t;
      float dzd = sqrt(1.0 + dzx * dzx + dzy * dzy);
      float hillshade = 0.0;

      // traditional single light source
      if (u_hillshadeType == 0){
        float cosDelta = u_sinZsinAs[0] * dzy - u_sinZcosAs[0] * dzx;
        float z = (u_cosZs[0] + cosDelta) / dzd;
        if (z < 0.0)  z = 0.0;
        hillshade = z;
      } else {
        // multi-directional with 6 light sources
        for (int k = 0; k < 6; k++) {
        float cosDelta = u_sinZsinAs[k] * dzy - u_sinZcosAs[k] * dzx;
        float z = (u_cosZs[k] + cosDelta) / dzd;
        if (z < 0.0) z = 0.0;
        hillshade = hillshade + z * u_weights[k];
        if (k == 5) break;
        }
      }

      // set color
      float alpha = getNeighborHoodAlpha(va.a, vb.a, vc.a, vd.a, ve.a, vf.a, vg.a, vh.a, vi.a);
      alpha *= u_opacity;
      ${a}`)}var ne=Object.freeze(Object.defineProperty({__proto__:null,ColorizerHillshadeUniforms:_,ColorizerStretchUniforms:x,ColorizerUniforms:f,build:V},Symbol.toStringTag,{value:"Module"}));export{f as a,x as b,_ as c,V as d,ne as e};
