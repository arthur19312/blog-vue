import { initShaders, normalize } from "./utils";
import { XN_ITERATIONS } from "./compute";
import VSHADER_SOURCE from './xn.vert'
import FSHADER_SOURCE from "./xn.frag";
let gl, program;

export const main = () => {
  init();
};

let g_points = [];
export const drawXnList = (xnList) => {
  g_points = xnList.reduce((arr, item) => {
    arr.push(normalize(item.x / XN_ITERATIONS), normalize(item.y));
    return arr;
  }, []);
  if (!initVertexbuffer(g_points)) {
    return;
  }
  gl.drawArrays(gl.LINE_STRIP, 0, g_points.length / 2);
};

const initVertexbuffer = (arr) => {
  const vlist = new Float32Array(arr);
  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log("Failed2create buffer obj");
    return false;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vlist, gl.STATIC_DRAW);
  const a_Position = gl.getAttribLocation(program, "a_Position");
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, true, 0, 0);
  gl.enableVertexAttribArray(a_Position);
  return true;
};

export const init = () => {
  const canvas = document.getElementById("xn-chart-canvas");
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
