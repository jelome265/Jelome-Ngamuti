/**
 * Runtime shader strings for Three.js ShaderMaterial.
 * Kept alongside .glsl files for documentation parity.
 */

export const vertexShader = `
uniform float uTime;
uniform float uAmplitude;
attribute float aRandom;
attribute float aSize;
varying float vAlpha;
varying vec2 vUv;
void main() {
  vec3 pos = position;
  float floatX = sin(uTime * 0.5 + aRandom * 10.0) * uAmplitude * aRandom;
  float floatY = cos(uTime * 0.3 + aRandom * 15.0) * uAmplitude * aRandom;
  float floatZ = sin(uTime * 0.4 + aRandom * 20.0) * uAmplitude * aRandom * 0.5;
  pos.x += floatX; pos.y += floatY; pos.z += floatZ;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aSize * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
  vAlpha = 0.3 + 0.7 * (1.0 - abs(pos.y) * 0.01);
  vUv = uv;
}
`;

export const fragmentShader = `
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uOpacity;
uniform float uMouseInfluence;
varying float vAlpha;
void main() {
  vec2 center = gl_PointCoord - vec2(0.5);
  float dist = length(center);
  if (dist > 0.5) discard;
  float alpha = smoothstep(0.5, 0.0, dist) * vAlpha * uOpacity;
  vec3 color = mix(uColor1, uColor2, dist * 2.0);
  color *= 1.0 + uMouseInfluence * 0.3;
  gl_FragColor = vec4(color, alpha);
}
`;

export const fbmNoise = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * 7.0 * (1.0 / 49.0));
  vec4 x_ = floor(j * 7.0 / 49.0);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.zzzz;
  vec4 t = 1.0 - x*x - y*y;
  return 0.5 + 0.5 * dot(t*t*t * (t * x * x + y * y), vec4(1.0, 0.0, -1.0, 0.5));
}
float fbm(vec3 p, int octaves) {
  float value = 0.0, amplitude = 0.5, frequency = 1.0;
  for (int i = 0; i < 5; i++) { if (i >= octaves) break; value += amplitude * snoise(p * frequency); amplitude *= 0.5; frequency *= 2.0; }
  return value;
}
`;
