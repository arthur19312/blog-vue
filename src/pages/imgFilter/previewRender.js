import {
  initShaders,
  useBuffer,
  initTexture,
  getUniformLoc,
} from "@/lib/webgl/util";
import { VSHADER_SOURCE, FSHADER_SOURCE } from "./previewShader";
var gl, program;
const previewRender = (imageData) => {
  gl = document.getElementById("webgl-filter-before").getContext("webgl");
  program = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  initVertexBuffer(program);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  initTexture(gl, program, 0, "u_sampler", imageData);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

const initVertexBuffer = (program) => {
  const verticesTexCoord = new Float32Array([
    -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0,
  ]);
  useBuffer(gl, verticesTexCoord);
  const SIZE = verticesTexCoord.BYTES_PER_ELEMENT;
  const a_position = gl.getAttribLocation(program, "a_position");
  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, SIZE * 2, 0);
  gl.enableVertexAttribArray(a_position);
};

export const updateTexture = (imageData) => {
  initTexture(gl, program, 0, "u_sampler", imageData);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

export default previewRender;
