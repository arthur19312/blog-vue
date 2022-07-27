import { initShaders, useBuffer, initTexture } from "@/lib/webgl/util";
import { VSHADER_SOURCE, FSHADER_SOURCE } from "./shader";
var gl;
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

  const img = new Image();
  img.onload = () => {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    initTexture(gl, program, 0, "u_sampler", img);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  img.src = "/assets/img/texture/1.jpg";

  const step = () => {
    // drawBg(program);
    // requestAnimationFrame(step);
  };

  step();
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
