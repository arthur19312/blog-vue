import { VSHADER_SOURCE, FSHADER_SOURCE } from "./shader";
import glFrame from "@/lib/webgl/Frame";
import { getUniformLoc } from "@/lib/webgl/util";

const initFunc = (gl, program) => {
  gl.uniform2f(getUniformLoc(gl, program, "iResolution"), 800, 600);
};
const updateFunc = (gl, program) => {
  const t = (Date.now() % 100000000) / 10000;
  gl.uniform1f(getUniformLoc(gl, program, "iTime"), t);
};

export const main = () => {
  const glF = new glFrame({
    canvasId: "webgl-decker",
    initFunc,
    updateFunc,
    VSHADER_SOURCE,
    FSHADER_SOURCE,
  });
};
