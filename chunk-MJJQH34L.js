import{a as q}from"./chunk-6BAWOY3B.js";import{a as G}from"./chunk-X4HGYM5U.js";import{a as A}from"./chunk-KQTDRXW7.js";import{a as c}from"./chunk-63XBOVX6.js";import{c as F,d as k,e as T}from"./chunk-DUTO7CRC.js";import{a as b}from"./chunk-ZPRRJLBJ.js";import{a as D,b as r}from"./chunk-N7ZNAA2Y.js";import{a as P}from"./chunk-PIAEM5HF.js";import{a as v}from"./chunk-O6MDTSVU.js";import{a as z}from"./chunk-L7NOU4T2.js";import{a as d}from"./chunk-DK3KECNU.js";import{a as C}from"./chunk-PMVHKVIR.js";import{a as p}from"./chunk-3RSKBJV5.js";import{a as S}from"./chunk-2OFKI5R7.js";import{a as f}from"./chunk-B2KD3GMI.js";import{a as t,b as w}from"./chunk-ZMBCTCSM.js";import{a as u}from"./chunk-6QJXCAOV.js";import{a as l}from"./chunk-JARU7KSM.js";import{b as y}from"./chunk-RL4CZUGQ.js";import{a as o}from"./chunk-WNSZCIFR.js";function R(n){n.code.add(t`void computeCovariance3D(in mat3 rotation, in vec3 scale, out vec3 covarianceA, out vec3 covarianceB) {
mat3 scaleMatrix = mat3(
vec3(scale.x, 0.0, 0.0),
vec3(0.0, scale.y, 0.0),
vec3(0.0, 0.0, scale.z)
);
mat3 M = scaleMatrix * rotation;
mat3 covariance3D = transpose(M) * M;
covarianceA = vec3(covariance3D[0][0], covariance3D[0][1], covariance3D[0][2]);
covarianceB = vec3(covariance3D[1][1], covariance3D[1][2], covariance3D[2][2]);
}
vec3 computeCovariance2D(vec3 center, float focalLength, vec2 tanFov, float[6] cov3D, mat4 view) {
vec4 viewSpacePoint = vec4(center, 1);
vec2 max = 1.3 * tanFov;
vec2 normalized = viewSpacePoint.xy / viewSpacePoint.z;
viewSpacePoint.xy = clamp(normalized, -max, max) * viewSpacePoint.z;
float invZ = 1.0 / viewSpacePoint.z;
float invZSquared = invZ * invZ;
mat3 projectionJacobian = mat3(
focalLength * invZ,  0.0,                   -(focalLength * viewSpacePoint.x) * invZSquared,
0.0,                 focalLength * invZ,    -(focalLength * viewSpacePoint.y) * invZSquared,
0.0,                 0.0,                   0.0
);
mat3 worldToView = transpose(mat3(view));
mat3 T = worldToView * projectionJacobian;
mat3 covariance3D = mat3(
cov3D[0], cov3D[1], cov3D[2],
cov3D[1], cov3D[3], cov3D[4],
cov3D[2], cov3D[4], cov3D[5]
);
mat3 covariance2D = transpose(T) * transpose(covariance3D) * T;
const float regularization = 0.3;
covariance2D[0][0] += regularization;
covariance2D[1][1] += regularization;
return vec3(covariance2D[0][0], covariance2D[0][1], covariance2D[1][1]);
}`)}var s=class extends z{constructor(){super(...arguments),this.tileCameraPosition=l(),this.cameraDelta=l()}};function I(n){n.code.add(t`vec4 unpackColor(uvec4 packedGaussian) {
vec4 color;
color.r = float((packedGaussian.w >> 1u) & 0xfeu);
color.g = float((packedGaussian.w >> 9u) & 0xffu);
color.b = float((packedGaussian.w >> 16u) & 0xfeu);
color.a = float((packedGaussian.w >> 24u) & 0xffu);
return color / 255.0;
}`),n.code.add(t`vec3 unpackScale(uvec4 packedGaussian) {
uint sx = (packedGaussian.z >> 10u) & 0xffu;
uint sy = (packedGaussian.z >> 18u) & 0xffu;
uint szLow = (packedGaussian.z >> 26u) & 0x3fu;
uint szHigh = packedGaussian.a & 0x3u;
uint sz = szLow | (szHigh << 6u);
return exp(vec3(sx, sy, sz) / 16.0 - 10.0);
}`),n.code.add(t`const uint MASK_9_BITS = 0x1FFu;
const float SQRT_HALF = 0.7071067811865476;
const ivec3 COMPONENT_ORDER[4] = ivec3[4](
ivec3(3, 2, 1),
ivec3(3, 2, 0),
ivec3(3, 1, 0),
ivec3(2, 1, 0)
);
vec4 unpackQuaternion(uvec4 packedGaussian) {
uint packedRotation = packedGaussian.x;
uint largestComponent = packedRotation >> 30u;
vec4 quaternion = vec4(0.0);
float sumSquares = 0.0;
uint bitfield = packedRotation;
for (int j = 0; j < 3; ++j) {
int index = COMPONENT_ORDER[int(largestComponent)][j];
uint magnitude = bitfield & MASK_9_BITS;
uint signBit = (bitfield >> 9u) & 1u;
bitfield = bitfield >> 10u;
float value = SQRT_HALF * float(magnitude) / float(MASK_9_BITS);
quaternion[index] = signBit == 1u ? -value : value;
sumSquares += value * value;
}
quaternion[int(largestComponent)] = sqrt(1.0 - sumSquares);
return quaternion;
}`),n.code.add(t`vec3 unpackTileOriginRelativePosition(uvec4 packedGaussian) {
uint packedPositionLow = packedGaussian.y;
uint packedPositionHigh = packedGaussian.z;
uint x = packedPositionLow & 0x3FFFu;
uint y = (packedPositionLow >> 14u) & 0x3FFFu;
uint zLow = (packedPositionLow >> 28u) & 0xFu;
uint zHigh = packedPositionHigh & 0x3FFu;
uint z = zLow | (zHigh << 4u);
return vec3(float(x), float(y), float(z));
}`),n.uniforms.add(new d("tileCameraPosition",a=>a.tileCameraPosition),new d("cameraDelta",a=>a.cameraDelta)).code.add(t`vec3 unpackCameraRelativeGaussianPosition(uvec4 packedHeader, highp vec3 position) {
vec3 tileOrigin = uintBitsToFloat(packedHeader.xyz);
float invPosScale = 1.0 / exp2(float(packedHeader.w & 0xfu));
vec3 delta = tileOrigin.xyz - tileCameraPosition;
vec3 cameraRelativePosition = position * invPosScale + delta * 2.048 - cameraDelta;
return cameraRelativePosition;
}`)}function L(n){n.code.add(t`mat3 quaternionToRotationMatrix(vec4 q) {
float x2 = q.x + q.x;
float y2 = q.y + q.y;
float z2 = q.z + q.z;
float xx = x2 * q.x;
float yy = y2 * q.y;
float zz = z2 * q.z;
float xy = x2 * q.y;
float xz = x2 * q.z;
float yz = y2 * q.z;
float wx = x2 * q.w;
float wy = y2 * q.w;
float wz = z2 * q.w;
return mat3(
1.0 - (yy + zz), xy - wz, xz + wy,
xy + wz, 1.0 - (xx + zz), yz - wx,
xz - wy, yz + wx, 1.0 - (xx + yy)
);
}`)}var i=class extends D{constructor(a){super(),this.spherical=a,this.alphaCutoff=1,this.fadingEnabled=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.occlusionPass=!1,this.receiveAmbientOcclusion=!1,this.pbrMode=0,this.useCustomDTRExponentForWater=!1,this.useFillLights=!1,this.hasColorTexture=!0}};function O(n){switch(n){case 2:return .005;case 0:return .05;default:return .01}}o([r({count:3})],i.prototype,"alphaCutoff",void 0),o([r()],i.prototype,"fadingEnabled",void 0),o([r()],i.prototype,"terrainDepthTest",void 0),o([r()],i.prototype,"cullAboveTerrain",void 0),o([r()],i.prototype,"receiveAmbientOcclusion",void 0);var m=class extends s{constructor(){super(...arguments),this.focalLength=-1,this.minSplatRadius=-1,this.tanFov=u()}};function B(n){let a=new S;a.varyings.add("vColor","vec4"),a.varyings.add("conicOpacity","vec4"),a.varyings.add("offsetFromCenter","vec2"),a.vertex.uniforms.add(new c("splatOrderTexture",e=>e.splatOrder),new c("splatFadingTexture",e=>e.splatFading),new c("splatAtlasTexture",e=>e.splatAtlas),new f("focalLength",e=>e.focalLength),new f("minSplatRadius",e=>e.minSplatRadius),new C("tanFov",e=>e.tanFov),new p("screenSize",({camera:e})=>y(M,e.fullWidth,e.fullHeight)),new v("proj",e=>e.camera.projectionMatrix),new v("view",e=>e.camera.viewMatrix),new p("nearFar",e=>e.camera.nearFar),new P("cameraPosition",e=>e.camera.eye)),a.vertex.include(I),a.vertex.include(L),a.vertex.include(R),a.vertex.include(T,n),a.include(G,n),F(a.vertex),k(a.vertex),a.include(b,n),a.outputs.add("fragColor","vec4",0),a.outputs.add("fragDepthColor","vec4",1);let x=O(n.alphaCutoff),g=Math.log(x),h=-2*g;return a.vertex.code.add(t`vec2 ndcToPixel(vec2 ndcCoord, vec2 screenSize) {
return ((ndcCoord + 1.0) * screenSize - 1.0) * 0.5;
}`),a.vertex.main.add(`
    uint instanceID = uint(gl_InstanceID);

    // Transform the instanceID into 2D coordinates
    uint orderTextureWidth = uint(textureSize(splatOrderTexture, 0).x);
    uint x = instanceID % orderTextureWidth;
    uint y = instanceID / orderTextureWidth;

    // Fetch the index of the remaining frontmost Gaussian
    uint gaussianIndex = texelFetch(splatOrderTexture, ivec2(x, y), 0).r;

    uint splatAtlasWidth = uint(textureSize(splatAtlasTexture, 0).x);

    // Fetch the packed Gaussian according to the index
    uint gaussianIndexX = gaussianIndex % splatAtlasWidth;
    uint gaussianIndexY = gaussianIndex / splatAtlasWidth;
    uvec4 packedGaussian = texelFetch(splatAtlasTexture, ivec2(gaussianIndexX, gaussianIndexY), 0);

    // Fetch the header associated with the packed Gaussian (contains tile origin and number of fractional bits)
    uint pageNum = gaussianIndex / 1024u;
    uint headerIndex = (pageNum + 1u) * 1024u - 1u;
    uint headerIndexX = headerIndex % splatAtlasWidth;
    uint headerIndexY = headerIndex / splatAtlasWidth;
    uvec4 packedHeader = texelFetch(splatAtlasTexture, ivec2(headerIndexX, headerIndexY), 0);

    // Unpack the Gaussian
    vColor = unpackColor(packedGaussian);

    // Handle fading
    ${w(n.fadingEnabled,`
      uint fadingTextureWidth = uint(textureSize(splatFadingTexture, 0).x);
      uint fadeX = pageNum  % fadingTextureWidth;
      uint fadeY = pageNum  / fadingTextureWidth;
      uint opacityModifierByte = texelFetch(splatFadingTexture, ivec2(fadeX , fadeY), 0).r;
      float opacityModifier = float(opacityModifierByte) / 255.0;
      vColor.a *= opacityModifier;
      `)}

    // set default position outside clipspace for early returns
    gl_Position = ${A};

    if(vColor.a < ${x}) {
      return;
    }

    vec3 scale = unpackScale(packedGaussian);
    vec4 quaternion = unpackQuaternion(packedGaussian);
    mat3 rotation = quaternionToRotationMatrix(quaternion);
    vec3 tileOriginRelativePosition = unpackTileOriginRelativePosition(packedGaussian);

    vec3 cameraRelativePosition = unpackCameraRelativeGaussianPosition(packedHeader, tileOriginRelativePosition);

    vec4 viewPos = vec4(mat3(view) * cameraRelativePosition, 1);

    if (viewPos.z > -nearFar.x || viewPos.z < -nearFar.y) {
      return;
    }

    forwardViewPosDepth(viewPos.xyz);

    // Handle environment (scene lighting)
    vec3 groundNormal = ${n.spherical?t`normalize(cameraRelativePosition + cameraPosition)`:t`vec3(0.0, 0.0, 1.0)`};
    float groundLightAlignment = dot(groundNormal, mainLightDirection);
    float additionalAmbientScale = additionalDirectedAmbientLight(groundLightAlignment);
    vec3 additionalLight = mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
    vColor.rgb = evaluateSceneLighting(groundNormal, vColor.rgb, 0.0, 0.0, mainLightIntensity);

    vec3 covarianceA;
    vec3 covarianceB;
    computeCovariance3D(rotation, scale.xyz, covarianceA, covarianceB);

    float covariance3D[6] = float[6](covarianceA.x, covarianceA.y, covarianceA.z, covarianceB.x, covarianceB.y, covarianceB.z);

    vec3 covariance2D = computeCovariance2D(viewPos.xyz, focalLength, tanFov, covariance3D, view);

    // Compute the Gaussians extent in screen space by finding the eigenvalues lambda1 and lambda2
    // of the 2D covariance matrix
    float mid = 0.5 * (covariance2D.x + covariance2D.z);
    float radius = length(vec2((covariance2D.x - covariance2D.z) * 0.5, covariance2D.y));
    float lambda1 = mid + radius;
    float lambda2 = mid - radius;

    // Compute the extents along the principal axes
    float l1 = ceil(sqrt(lambda1 * ${h}));
    float l2 = ceil(sqrt(lambda2 * ${h}));

    float maxRadius = max(l1, l2);

    // Ignore gaussians with very small contribution, with tolerance based on the quality profile
    if(minSplatRadius > 0.0) {
      float effectiveSize = maxRadius * vColor.a;
      if(effectiveSize < minSplatRadius) {
        return;
      }
    }

    vec4 projPos = proj * viewPos;
    float invW = 1. / (projPos.w + 1e-7);
    vec3 ndcPos = projPos.xyz * invW;

    // Screen space frustum culling
    vec2 radiusNDC = maxRadius * 2.0 / screenSize;

    if (any(greaterThan(abs(ndcPos.xy) - radiusNDC, vec2(1.0)))) {
        return;
    }

    // Compute the principal diagonal direction (eigenvector for lambda1)
    vec2 diagonalVector = normalize(vec2(covariance2D.y, lambda1 - covariance2D.x));

    vec2 majorAxis = l1 * diagonalVector;
    vec2 minorAxis = l2 * vec2(diagonalVector.y, -diagonalVector.x);

    vec2 gaussianCenterScreenPos = ndcToPixel(ndcPos.xy, screenSize);

    // This maps vertex IDs 0, 1, 2, 3 to (-1,-1), (1,-1), (-1,1), (1,1)
    vec2 corner = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2) - 1.0;
    offsetFromCenter = corner.x * majorAxis + corner.y * minorAxis;

    // Invert covariance (EWA algorithm)
    float determinant = (covariance2D.x * covariance2D.z - covariance2D.y * covariance2D.y);
    if (determinant <= 0.) {
      return;
    }
    float invDeterminant = 1. / determinant;

    // We use a conic function to derive the opacity
    vec3 conic = vec3(covariance2D.z, -covariance2D.y, covariance2D.x) * invDeterminant;
    conicOpacity = vec4(conic, vColor.a);

    // Convert from screen-space to clip-space using center + offset
    vec2 clipPos = (gaussianCenterScreenPos + offsetFromCenter) / screenSize * 2. - 1.;

    gl_Position = vec4(clipPos, ndcPos.z, 1.0);

  `),a.fragment.include(q),a.fragment.main.add(`
    discardByTerrainDepth();

    // Evaluate the 2D elliptical Gaussian exponent using the general conic form: Ax^2+2Bxy+Cy^2
    float x = offsetFromCenter.x;
    float y = offsetFromCenter.y;
    float conic = dot(conicOpacity.xyz, vec3(x * x, 2.0 * x * y, y * y));
    float gaussianExponent = -0.5 * conic;

    // A positive exponent indicates alpha > 1, this should not happen
    // We also early check the alphaCutoff (i.e., ln(alphaCutoff)), to avoid unnecessary exp()
    if (gaussianExponent > 0.0 || gaussianExponent < ${g}) {
      discard;
    }

    float gaussianFalloff = exp(gaussianExponent);

    // cap at 0.99 to avoid blending issues, such as seams between overlapping Gaussians
    float alpha = min(.99f, conicOpacity.w * gaussianFalloff);

    fragColor = vec4(vColor.rgb * alpha, alpha);

    // We simulate first hit based depth using 0.25 as the opacity threshold.
    // This works because we render in front-to-back order,
    // i.e. the first hit that counts completelly saturates the alpha channel
    // and further splats do not contribute.
    float countHit = step(0.25, alpha);
    float normalizedDepth = gl_FragCoord.z;
    fragDepthColor = vec4(encodeNormalizedDepthToRGB(normalizedDepth) * countHit, countHit);
  `),a}var M=u(),xa=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatPassParameters:m,build:B},Symbol.toStringTag,{value:"Module"}));export{i as a,m as b,B as c,xa as d};
