import { createProgram, useBg } from "@/lib/webgl/util";
import { VSHADER_SOURCE, FSHADER_SOURCE } from "./shader";

var gl, program;

export const main = () => {
  gl = document.getElementById("").getContext("webgl");
  program = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  gl.useProgram(program);
  useBg(gl, program);

  const step = () => {
    this.updateFunc();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(step);
  };

  step();
};
