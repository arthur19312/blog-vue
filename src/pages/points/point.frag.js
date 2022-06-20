export default `
    precision lowp float;  
    uniform float u_FragColor;
    void main() {
        float dist = distance(gl_PointCoord, vec2(0.5,0.5));
        float color = dist * u_FragColor * 10.0;
        float r = (dist + color) * 2.0;
        float g = 1.0 - color;
        float b = dist;
        if(dist < 0.5){
          gl_FragColor = vec4(r,g,b,1.0);
        }else{
          discard;
        }
    }
`;