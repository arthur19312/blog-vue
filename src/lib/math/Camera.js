import Vector3 from "./Vector3";
import Matrix4 from "./Matrix4";
export default class Camera {
  constructor(x = 0, y = 0, z = 0) {
    this.position = new Vector3().set(x, y, z);
    // this.orientation = {
    //   right: new Vector3(1, 0, 0),
    //   up: new Vector3(0, 1, 0),
    //   dir: new Vector3(0, 0, 1),
    // };
    this.matrix = new Matrix4();
  }

  setLookAt(eye, target, up = new Vector3().set(0, 1, 0)) {
    // get camera base
    const dir = target.sub(eye).normalize();
    // if eye & target at same pos
    if (dir.lengthSq === 0) {
      dir.z = 1;
    }
    const right = dir.cross(up);
    // if dir parallel to up
    if (right.lengthSq === 0) {
      // increase dir offset, except dir.z is +-1
      if (Math.abs(dir.z) !== 1) {
        dir.z += 0.001;
      } else {
        dir.x += 0.001;
      }
      dir.normalize();
      right = dir.cross(up);
    }
    right.normalize();
    up = right.cross(dir).normalize();

    // get translation & rotation
    const { x: rx, y: ry, z: rz } = right;
    const { x: ux, y: uy, z: uz } = up;
    const { x: dx, y: dy, z: dz } = dir;
    const { x, y, z } = this.position;
    const posMatrix = new Matrix4().set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -x,
      -y,
      -z,
      1
    );
    const rotMatrix = new Matrix4().set(
      rx,
      ux,
      dx,
      0,
      ry,
      uy,
      dy,
      0,
      rz,
      uz,
      dz,
      0,
      0,
      0,
      0,
      1
    );
    this.matrix = posMatrix.premultiply(rotMatrix);
    return this;
  }
}
