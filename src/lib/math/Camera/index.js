import Vector3 from "../Vector3";
import Matrix4 from "../Matrix4";
import CameraUtils from "./CameraUtils";
export class Camera {
  constructor() {
    this._position = new Vector3();
    this._rotation = new Vector3();
    this._matrix = new Matrix4();
  }

  get position() {
    return this._position;
  }

  set position(val) {
    this._position = pos;
    this.updateMatrix();
  }

  get rotation() {
    return this._rotation;
  }

  set rotation(val) {
    console.log("set");
    this._rotation = val;
    this.updateMatrix();
  }

  updateMatrix() {
    CameraUtils.setLookAt(
      this._position,
      new Vector3(0, 0, 0),
      new Vector3(0, 1, 0)
    );
  }
}

export class OrthographicCamera extends Camera {
  constructor({ width = 100, height = 100, near = 0.01, far = 1000 } = {}) {
    super();
    this.orthoMatrix = CameraUtils.getOrtho({
      l: -width / 2,
      r: width / 2,
      t: height / 2,
      b: -height / 2,
      n: near,
      f: far,
    });
  }

  updateMatrix() {}
}
