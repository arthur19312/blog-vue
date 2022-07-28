import { initShaders, useBuffer, initTexture, useBg } from "@/lib/webgl/util";
import { VSHADER_SOURCE, FSHADER_SOURCE } from "./shader";
var gl, program;
const main = () => {
  gl = document
    .getElementById("webgl-filter")
    .getContext("webgl", { preserveDrawingBuffer: true });
  program = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  useBg(gl, program);

  const img = new Image();
  img.onload = () => {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    initTexture(gl, program, 0, "u_sampler", img);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  img.src = "/assets/img/filter/1.jpg";
};

export const getMainData = (x, y) => {
  const pixels = new Uint8Array(9 * 4);
  gl.readPixels(x, y, 3, 3, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  return pixels;
};

export default main;
