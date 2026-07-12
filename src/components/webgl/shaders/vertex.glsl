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
