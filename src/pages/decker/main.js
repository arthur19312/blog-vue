import { VSHADER_SOURCE, FSHADER_SOURCE } from "./shader";
import glFrame from "@/lib/webgl/Frame";

let curGl, curProgram;
const initFunc = (gl, program) => {
  curGl = gl;
  curProgram = program;
};
const updateFunc = (gl, program) => {};

export const main = () => {
  const glF = new glFrame({
    canvasId: "webgl-decker",
    initFunc,
    updateFunc,
    VSHADER_SOURCE,
    FSHADER_SOURCE,
    withIParams: true,
  });
};
