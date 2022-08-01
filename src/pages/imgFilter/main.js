import {
  initShaders,
  getUniformLoc,
  initTexture,
  useBg,
} from "@/lib/webgl/util";
import { VSHADER_SOURCE, FSHADER_SOURCE } from "./mainShader";
const NORMAL = [0, 0, 0, 0, 1, 0, 0, 0, 0];
var gl, program;
var kernel, kernelWeight;

const computeKernelWeight = () => {
  const res = kernel.reduce((prev, cur) => prev + cur);
  return res <= 0 ? 1 : res;
};

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
    updateKernel(NORMAL);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  img.src = "/assets/img/filter/1.jpg";
};

export const getMainData = (x, y) => {
  const pixels = new Uint8Array(9 * 4);
  gl.readPixels(x, y, 3, 3, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  return pixels;
};

export const updateKernel = (newKernel) => {
  kernel = newKernel;
  kernelWeight = computeKernelWeight();
  console.log(kernel, kernelWeight);
  gl.uniform1fv(gl.getUniformLocation(program, "u_kernel"), kernel);
  gl.uniform1f(getUniformLoc(gl, program, "u_kernelWeight"), kernelWeight);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

export default main;
