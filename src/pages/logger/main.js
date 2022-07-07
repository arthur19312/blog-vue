import { initShaders, createProgram } from "@/lib/webgl/util";
import { VSHADER_SOURCE, FSHADER_SOURCE } from "./shader";

export const WIDTH = 1600;
export const HEIGHT = 1200;

var gl;
const bgData = new Float32Array([-1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0]);

export const main = () => {
  const canvas = document.getElementById("webgl-logger");
  gl = canvas.getContext("webgl");
  if (!gl) {
    console.log("Failed2get rendering context 4 webgl");
    return;
  }
  drawBg(program);
  const step = () => {
    drawBg(program);
    requestAnimationFrame(step);
  };

  step();
};

const drawBg = (program) => {
  var bgBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bgBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, bgData, gl.STATIC_DRAW);
  var posAttr = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(posAttr);
  gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 2 * 4, 0);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};
