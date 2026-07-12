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
