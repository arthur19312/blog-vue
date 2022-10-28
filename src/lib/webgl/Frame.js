import { createProgram, useBg, getUniformLoc } from "@/lib/webgl/util";

export default class glFrame {
  constructor({
    canvasId = "",
    initFunc,
    updateFunc,
    needInit = true,
    VSHADER_SOURCE,
    FSHADER_SOURCE,
    withIParams = null,
  }) {
    this.withIParams = withIParams;
    this.setCanvasId(canvasId);
    this.domEle = document.getElementById(this.canvasId);
    this.setInitFunc(initFunc);
    this.setUpdateFunc(updateFunc);
    needInit && canvasId && this.init(VSHADER_SOURCE, FSHADER_SOURCE);
    if (withIParams) {
      /** update mouse */
      this.offsetX = 0;
      this.offsetY = 0;
      this.domEle.onmousedown = (e) => {
        this.updateMouse = true;
      };
      this.domEle.onmouseup = (e) => {
        this.updateMouse = false;
      };
      this.domEle.onmousemove = (e) => {
        if (this.updateMouse) {
          this.gl.uniform2f(
            getUniformLoc(this.gl, this.program, "iMouse"),
            e.offsetX,
            e.offsetY
          );
        }
      };

      /** update screen */
      if (this.withIParams.fullScreen) {
        window.onresize = (e) => {
          this.#onSize();
        };
      }
    }
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

  #onSize() {
    const x = window.innerWidth,
      y = window.innerHeight;
    this.gl.uniform2f(
      getUniformLoc(this.gl, this.program, "iResolution"),
      x,
      y
    );
  }

  #buildProgram(VSHADER_SOURCE, FSHADER_SOURCE) {
    this.program = createProgram(this.gl, VSHADER_SOURCE, FSHADER_SOURCE);
    this.gl.useProgram(this.program);
    useBg(this.gl, this.program);
    if (this.withIParams) {
      const size = { x: 800, y: 600 };
      if (this.withIParams.fullScreen) {
        this.#onSize();
      } else {
        this.gl.uniform2f(
          getUniformLoc(this.gl, this.program, "iResolution"),
          size.x,
          size.y
        );
      }
    }
    this.initFunc(this.gl, this.program);
    this.updateFunc && this.update();
  }

  init(VSHADER_SOURCE, FSHADER_SOURCE) {
    this.gl = this.domEle.getContext("webgl");
    this.#buildProgram(VSHADER_SOURCE, FSHADER_SOURCE);
  }

  update() {
    const step = () => {
      if (this.withIParams) {
        const t = (Date.now() % 100000000) / 10000;
        this.gl.uniform1f(getUniformLoc(this.gl, this.program, "iTime"), t);
      }
      this.updateFunc(this.gl, this.program);
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
      this.rafId = requestAnimationFrame(step);
    };

    step();
  }

  refreshProgram(VSHADER_SOURCE, FSHADER_SOURCE) {
    this.stop();
    this.#buildProgram(VSHADER_SOURCE, FSHADER_SOURCE);
  }

  stop() {
    cancelAnimationFrame(this.rafId);
  }
}
