import { createProgram, useBg } from "@/lib/webgl/util";

export default class glFrame {
  constructor({
    canvasId = "",
    initFunc,
    updateFunc,
    needInit = true,
    VSHADER_SOURCE,
    FSHADER_SOURCE,
  }) {
    this.setInitFunc(initFunc);
    this.setUpdateFunc(updateFunc);
    this.setCanvasId(canvasId);
    needInit && canvasId && this.init(VSHADER_SOURCE, FSHADER_SOURCE);
  }

  setInitFunc(initFunc) {
    this.initFunc = initFunc;
  }
  setUpdateFunc(updateFunc) {
    this.updateFunc = updateFunc;
  }
  setCanvasId(canvasId) {
    this.canvasId = canvasId;
  }

  init(VSHADER_SOURCE, FSHADER_SOURCE) {
    console.log("init");
    this.gl = document.getElementById(this.canvasId).getContext("webgl");
    this.program = createProgram(this.gl, VSHADER_SOURCE, FSHADER_SOURCE);
    this.gl.useProgram(this.program);
    useBg(this.gl, this.program);
    this.initFunc();
    this.updateFunc && this.update();
  }

  update() {
    console.log("update");
    const step = () => {
      this.updateFunc();
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
      this.rafId = requestAnimationFrame(step);
    };

    step();
  }

  stop() {
    cancelAnimationFrame(this.rafId);
  }
}
