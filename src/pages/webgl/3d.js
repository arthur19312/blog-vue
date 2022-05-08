import { initShaders } from "./utils";

export const main = () => {
  const canvas = document.getElementById("webgl-canvas");
  const gl = canvas.getContext("webgl");
  if (!gl) {
    console.log("Failed2get rendering context 4 webgl");
    return;
  }

  const VSHADER_SOURCE = document.getElementById("vshader").innerText;
  const FSHADER_SOURCE = document.getElementById("fshader").innerText;

  const program = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  if (!program) {
    console.log("Failed2init shaders");
    return;
  }

  const a_Position = gl.getAttribLocation(program, "a_Position");
  const a_PointSize = gl.getAttribLocation(program, "a_PointSize");

  gl.clearColor(0.1, 0.4, 0.6, 0.8);
  gl.clear(gl.COLOR_BUFFER_BIT);

  canvas.onmousemove = (e) => {
    click(e, gl, canvas, a_Position, a_PointSize);
  };
};
let curX = 0,
  curY = 0;
const g_points = [];

export const click = (e, gl, canvas, a_Position, a_PointSize) => {
  const rect = e.target.getBoundingClientRect();
  const x = (e.clientX - rect.left - canvas.width / 2) / (canvas.width / 2);
  const y = (canvas.height / 2 - (e.clientY - rect.top)) / (canvas.height / 2);
  const scale = Math.max(
    80 - (Math.abs(curX - x) + Math.abs(curY - y)) * 400,
    10
  );
  console.log(scale);
  curX = x;
  curY = y;
  g_points.push([x, y, scale]);

  gl.clear(gl.COLOR_BUFFER_BIT);
  for (let i = 0; i < g_points.length; i++) {
    gl.vertexAttrib3f(a_Position, g_points[i][0], g_points[i][1], 0.0);
    gl.vertexAttrib1f(a_PointSize, g_points[i][2].toFixed(1));
    gl.drawArrays(gl.POINTS, 0, 1);
  }
};
