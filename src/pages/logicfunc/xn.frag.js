export default `
void main() {
  gl_FragColor = vec4(1.0,0.6-gl_FragCoord.x/800.0,0.0,1.0);
}
`;