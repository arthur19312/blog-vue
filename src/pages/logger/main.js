import { initShaders, useBuffer } from "@/lib/webgl/util";
import { VSHADER_SOURCE, FSHADER_SOURCE } from "./shader";
var gl;
const bgData = new Float32Array([-1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0]);

export const main = () => {
  const canvas = document.getElementById("webgl-logger");
  gl = canvas.getContext("webgl");
  if (!gl) {
    console.log("Failed2get rendering context 4 webgl");
    return;
  }

  const program = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  if (!program) {
    console.log("Failed2init shaders");
    return;
  }

  initVertexBuffer(program);
  initTexture(program);

  const step = () => {
    // drawBg(program);
    // requestAnimationFrame(step);
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

const initVertexBuffer = (program) => {
  // const verticesTexCoord = new Float32Array([
  //   -0.5, 0.5, 0, 1, -0.5, -0.5, 0, 0, 0.5, 0.5, 1, 1, 0.5, -0.5, 1, 0,
  // ]);
  const verticesTexCoord = new Float32Array([
    -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0,
  ]);
  const triangleData = new Float32Array([
    -0.6, 0.4, 0, 0.6, 0.3, -0.6, 0.4, 0, 0.7, 0.7, 1, 1,
  ]);
  useBuffer(gl, verticesTexCoord);
  const SIZE = verticesTexCoord.BYTES_PER_ELEMENT;
  const a_position = gl.getAttribLocation(program, "a_position");
  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, SIZE * 2, 0);
  gl.enableVertexAttribArray(a_position);
  const u_triangle = gl.getUniformLocation(program, "u_triangle");
  gl.uniform4fv(u_triangle, triangleData);
};

const initTexture = (program) => {
  const texture = gl.createTexture();
  const u_sampler = gl.getUniformLocation(program, "u_sampler");
  const img = new Image();
  img.onload = () => {
    loadTexture(gl, texture, img, u_sampler);
  };
  img.src = "/src/assets/img/texture/1.jpg";
};

const loadTexture = (gl, texture, image, u_sampler) => {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  gl.uniform1i(u_sampler, 0);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};
