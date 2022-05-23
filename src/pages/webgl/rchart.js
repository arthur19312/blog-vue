import { initShaders, normalize } from "./utils";
import { R_ITERATIONS } from "./compute";
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

  // gl.clear(gl.COLOR_BUFFER_BIT);
  for (let i = 0; i < g_points.length; i++) {
    const a_Position = gl.getAttribLocation(program, "a_Position");
    // const a_PointSize = gl.getAttribLocation(program, "a_PointSize");
    // const u_FragColor = gl.getUniformLocation(program, "u_FragColor");
    gl.vertexAttrib3f(a_Position, g_points[i].x, g_points[i].y, 0.0);
    // gl.vertexAttrib1f(a_PointSize, g_points[i][2].toFixed(1));
    // gl.uniform1f(u_FragColor, g_points[i][3].toFixed(1));
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

  const VSHADER_SOURCE = document.getElementById("vshader").innerText;
  const FSHADER_SOURCE = document.getElementById("fshader").innerText;

  program = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  if (!program) {
    console.log("Failed2init shaders");
    return null;
  }
};
