import { initShaders, normalize } from "./utils";
import { R_ITERATIONS } from "./compute";
import VSHADER_SOURCE from './r.vert'
import FSHADER_SOURCE from './r.frag'
let gl, program;

export const main = () => {
  init();
};

let g_points = [];
export const drawRList = (rList) => {
  g_points = rList.map((item) => ({
    x: normalize(item.x / R_ITERATIONS),
    y: normalize(item.y),
  }));

  for (let i = 0; i < g_points.length; i++) {
    const a_Position = gl.getAttribLocation(program, "a_Position");
    gl.vertexAttrib3f(a_Position, g_points[i].x, g_points[i].y, 0.0);
    gl.drawArrays(gl.POINTS, 0, 1);
  }
};

export const init = () => {
  const canvas = document.getElementById("r-chart-canvas");
  gl = canvas.getContext("webgl");
  if (!gl) {
    console.log("Failed2get rendering context 4 webgl");
    return null;
  }

  program = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  if (!program) {
    console.log("Failed2init shaders");
    return null;
  }
};
