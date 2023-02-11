import * as THREE from "@/lib/ThreeJs/three.module";
import { RenderPass } from "@/lib/ThreeJs/RenderPass";
import { ShaderPass } from "@/lib/ThreeJs/depends/ShaderPass";
import { EffectComposer } from "@/lib/ThreeJs/EffectComposer";

export const getComposer = ({ renderer, scene, camera }) => {
  var composer;

  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  composer.addPass(getColorPass(renderer));

  return composer;
};

const getColorPass = (renderer) => {
  const colorShader = {
    uniforms: {
      tDiffuse: { value: null },
      color: { value: new THREE.Color(0xffaaf0) },
      uSize: {
        value: new THREE.Vector2(
          renderer.domElement.offsetWidth,
          renderer.domElement.offsetHeight
        ),
      },
    },
    vertexShader: `
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform vec3 color;
      uniform sampler2D tDiffuse;
      uniform vec2 uSize;
vec2 offset[9];


  vec2 Hash21(vec2 p){
    p = fract(p*vec2(123.31,456.87));
    p+=dot(p,p+40.7);
    return fract(p);
  }
      void main() {
        vec4 preCol = texture2D(tDiffuse, vUv);

vec4 col = preCol;

vec4 bios = vec4(.001);
vec4 maxValue = vec4(0.);
  vec2 maxOffset = vec2(0);
  vec2 pos = vUv;
  vec2 onePixel = vec2(1,1)/uSize;
  float x = -1.;float y=-1.;
  for (int i = 0; i < 9; i++){
    offset[i]= vec2(x,y);
    vec4 cur = texture2D(tDiffuse, pos + onePixel*offset[i]);
    maxValue = max(cur,maxValue);
if(cur == maxValue){
maxOffset = vec2(x,y);
}
    x++;
    if(x>1.){
      x=-1.;y++;
    }
  }

  if(maxValue.x>.8 && maxValue.y>.8){
    float a = smoothstep(1.,2.,length(maxOffset));
col = a*preCol + (1.-a)* maxValue;

  }
        
        if(preCol.z <.3 && preCol.x==preCol.y && preCol.y==preCol.z){
          gl_FragColor = preCol;
        }else{
gl_FragColor = col;
        }        
      }
    `,
  };
  const colorPass = new ShaderPass(colorShader);
  colorPass.renderToScreen = true;

  return colorPass;
};
