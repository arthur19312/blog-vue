import { initShaders, useBuffer, initTexture } from "@/lib/webgl/util";
import { VSHADER_SOURCE, FSHADER_SOURCE } from "./shader";
var gl, program, u_value;
export const main = () => {
  const canvas = document.getElementById("webgl-logger");
  gl = canvas.getContext("webgl");
  if (!gl) {
    console.log("Failed2get rendering context 4 webgl");
    return;
  }

  program = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  if (!program) {
    console.log("Failed2init shaders");
    return;
  }

  initVertexBuffer(program);

  const image = new Image();
  image.onload = () => {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    initTexture({ gl, program, image });
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  image.src = "/assets/img/texture/1.jpg";

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
  u_value = gl.getUniformLocation(program, "u_value");
  gl.uniform1f(u_value, -59909);
};

export const mouse = (e) => {
  gl.uniform1f(
    gl.getUniformLocation(program, "u_value"),
    (e.clientX - 800) * 500
  );
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};
