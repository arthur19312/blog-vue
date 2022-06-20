export default `
void main() {
  gl_FragColor = vec4(1.0,(gl_FragCoord.x-1000.0)/2400.0+0.3,0.0,1.0-(gl_FragCoord.x-1000.0)/1600.0);
}
`;