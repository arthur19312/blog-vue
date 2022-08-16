import {
  initShaders,
  getUniformLoc,
  createTexture,
  initTexture,
  useBg,
} from "@/lib/webgl/util";
import { SCALE, NORMAL } from "./constant";

export const getMainData = (gl, x, y) => {
  const pixels = new Uint8Array(9 * 4);
  gl.readPixels(x, y, 3, 3, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  return pixels;
};

export const computeKernelWeight = (kernel) => {
  const res = kernel.reduce((prev, cur) => prev + cur);
  return res <= 0 ? 1 : res;
};

export const initFramebuffers = (gl) => {
  const textures = [];
  const framebuffers = [];
  for (let i = 0; i < 2; i++) {
    const texture = createTexture(gl);
    textures.push(texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      SCALE,
      SCALE,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null
    );

    const fbo = gl.createFramebuffer();
    framebuffers.push(fbo);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0
    );
  }
  return { textures, framebuffers };
};

export const setFramebuffer = (gl, fbo) => {
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.viewport(0, 0, SCALE, SCALE);
};
