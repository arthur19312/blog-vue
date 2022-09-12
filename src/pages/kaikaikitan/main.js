import { VSHADER_SOURCE, FSHADER_SOURCE } from "./shader";
import glFrame from "@/lib/webgl/Frame";

export const main = () => {
  const glF = new glFrame({
    canvasId: "webgl-kaikaikitan",
    initFunc: () => {},
    updateFunc,
    VSHADER_SOURCE,
    FSHADER_SOURCE,
  });

  setTimeout(() => {
    glF.stop();
  }, 3000);
};

const updateFunc = () => {};
