import { VSHADER_SOURCE, FSHADER_SOURCE } from "./shader";
import glFrame from "@/lib/webgl/Frame";
import { toUpperCamelCase } from "./tool";
var glF,
  scale = 6,
  fbm,
  runWithTime;

const updateMap = {};

export const main = () => {
  const ps = FSHADER_SOURCE({ fbm: 20 });

  const updateFunc = function (gl, program) {
    Object.keys(updateMap).forEach((key) => {
      const { needUpdate, value } = updateMap[key];
      if (!needUpdate) return;
      if (key === "fbm") {
        setTimeout(() => {
          this.refreshProgram(VSHADER_SOURCE, FSHADER_SOURCE({ fbm: value }));
        }, 0);
      } else {
        gl.uniform1f(
          gl.getUniformLocation(program, `u_${toUpperCamelCase(key)}`),
          value
        );
      }
      updateMap[key].needUpdate = false;
    });
  };

  glF = new glFrame({
    canvasId: "webgl-noise",
    initFunc: (gl, program) => {
      gl.uniform2f(gl.getUniformLocation(program, "u_Resolution"), 600, 600);
      gl.uniform1f(gl.getUniformLocation(program, "u_Scale"), scale);
      gl.uniform1f(gl.getUniformLocation(program, "u_Time"), Date.now());
    },
    updateFunc,
    VSHADER_SOURCE,
    FSHADER_SOURCE: ps,
  });
};

export const paramsDispather = (type, value) => {
  if (!updateMap[type]) {
    updateMap[type] = {};
  }
  updateMap[type].needUpdate = true;
  updateMap[type].value = value;
};
