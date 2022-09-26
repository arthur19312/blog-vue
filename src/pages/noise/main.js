import { VSHADER_SOURCE, FSHADER_SOURCE } from "./shader";
import glFrame from "@/lib/webgl/Frame";
import { getUniformLoc } from "@/lib/webgl/util";
import { toUpperCamelCase } from "./tool";
var glF,
  params = {};

const updateMap = {};

const commonParamUpdater = (key, value, gl, program) => {
  if (Array.isArray(value)) {
    gl.uniform3fv(
      getUniformLoc(gl, program, `u_${toUpperCamelCase(key)}`),
      value
    );
  } else {
    gl.uniform1f(
      getUniformLoc(gl, program, `u_${toUpperCamelCase(key)}`),
      value
    );
  }
};

const refreshParams = () => {
  Object.keys(updateMap).forEach((key) => {
    if (key !== "fbm") {
      updateMap[key].needUpdate = true;
    }
  });
};

export const main = () => {
  const ps = FSHADER_SOURCE({ fbm: 6 });

  const updateFunc = function (gl, program) {
    const t = (Date.now() % 100000000) / 1000;
    gl.uniform1f(getUniformLoc(gl, program, "u_Time"), t);
    for (let key in updateMap) {
      const { needUpdate, value } = updateMap[key];
      if (!needUpdate) continue;
      if (key === "fbm") {
        setTimeout(() => {
          this.refreshProgram(VSHADER_SOURCE, FSHADER_SOURCE({ fbm: value }));
          refreshParams();
        }, 0);
      } else {
        commonParamUpdater(key, value, gl, program);
      }
      updateMap[key].needUpdate = false;
    }
  };

  glF = new glFrame({
    canvasId: "webgl-noise",
    initFunc: (gl, program) => {
      gl.uniform2f(getUniformLoc(gl, program, "u_Resolution"), 600, 600);
      gl.uniform1f(
        getUniformLoc(gl, program, "u_Time"),
        (Date.now() % 100000000) / 1000
      );
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
  params[type] = value;
};
