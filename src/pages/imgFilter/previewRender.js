import {
  initShaders,
  useBuffer,
  initTexture,
  getUniformLoc,
  useBg,
} from "@/lib/webgl/util";
import { VSHADER_SOURCE, FSHADER_SOURCE } from "./previewShader";
var glBefore, programBefore, glAfter, programAfter;
const previewRender = (gl, program, imageData, isAfter = false) => {
  useBg(gl, program);
  !isAfter && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  imageData && initTexture({ gl, program, image: imageData });
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

const updateTexture = (gl, program, imageData, isArrayBuffer = false) => {
  isArrayBuffer
    ? initTexture({
        gl,
        program,
        image: imageData,
        isArrayBuffer,
        width: 3,
        height: 3,
      })
    : initTexture({ gl, program, image: imageData });
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

export const initBefore = (imageData) => {
  glBefore = document.getElementById("webgl-filter-before").getContext("webgl");
  programBefore = initShaders(glBefore, VSHADER_SOURCE, FSHADER_SOURCE);
  previewRender(glBefore, programBefore, imageData);
};

export const initAfter = (imageData) => {
  glAfter = document.getElementById("webgl-filter-after").getContext("webgl");
  programAfter = initShaders(glAfter, VSHADER_SOURCE, FSHADER_SOURCE);
  previewRender(glAfter, programAfter, imageData, true);
};

export const updateBefore = (imageData) => {
  updateTexture(glBefore, programBefore, imageData);
};

export const updateAfter = (imageData) => {
  updateTexture(glAfter, programAfter, imageData, true);
};
