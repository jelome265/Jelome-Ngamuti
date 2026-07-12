// Ink bleed fragment shader
// Simulates liquid ink dispersing through paper fibres
// Based on fBM noise displacement with directional bleed

precision highp float;

uniform float uTime;
uniform vec2  uResolution;
uniform vec2  uMouse;

varying vec2 vUv;

// Simplex-like noise helper
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = vUv;
  vec2 center = vec2(0.5, 0.5);
  float dist = distance(uv, center);

  // Ink pool — radial gradient with noise displacement
  float inkBase = 1.0 - smoothstep(0.0, 0.6, dist);

  // Directional bleed influenced by mouse
  vec2 bleedDir = normalize(uv - center + 0.001);
  float bleedFactor = 0.3 + 0.7 * (1.0 - dist);
  vec2 displacedUv = uv + bleedDir * bleedFactor * 0.08;

  float inkNoise = fbm(displacedUv * 4.0 + uTime * 0.02);
  float ink = inkBase * (0.6 + 0.4 * inkNoise);

  // Edge feathering — fibrous scatter
  float edge = smoothstep(0.55, 0.75, dist);
  float scatter = fbm(uv * 12.0 + uTime * 0.01);
  float fibrous = edge * scatter * 0.3;

  // Mouse interaction — attract ink toward cursor
  float mouseDist = distance(uv, uMouse);
  float mousePull = smoothstep(0.4, 0.0, mouseDist) * 0.25;
  ink += mousePull * (1.0 - dist);

  // Composite
  float alpha = clamp(ink + fibrous, 0.0, 1.0);
  vec3 color = vec3(0.05, 0.05, 0.12); // deep near-black

  gl_FragColor = vec4(color, alpha);
}
