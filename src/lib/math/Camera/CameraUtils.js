import Vector3 from "../Vector3";
import Matrix4 from "../Matrix4";
export default class CameraUtils {
  static setLookAt(eye, target, up = new Vector3().set(0, 1, 0)) {
    // get camera base
    const dir = target.sub(eye).normalize();
    // if eye & target at same pos
    if (dir.lengthSq === 0) {
      dir.z = 1;
    }
    let right = dir.cross(up);
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
    const { x, y, z } = eye;
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
    return posMatrix.premultiply(rotMatrix);
  }

  static getOrtho({ l, r, t, b, n, f }) {
    return new Matrix4().inset(
      2 / (r - l),
      0,
      0,
      (r + l) / (l - r),
      0,
      2 / (t - b),
      0,
      (t + b) / (b - t),
      0,
      0,
      2 / (f - n),
      (f + n) / (n - f),
      0,
      0,
      0,
      1
    );
    // const scale = new Matrix4().inset(
    //   2 / (r - l),
    //   0,
    //   0,
    //   0,
    //   0,
    //   2 / (t - b),
    //   0,
    //   0,
    //   0,
    //   0,
    //   2 / (n - f),
    //   0,
    //   0,
    //   0,
    //   0,
    //   1
    // );
    // const trans = new Matrix4().inset(
    //   1,
    //   0,
    //   0,
    //   -(l + r) / 2,
    //   0,
    //   1,
    //   0,
    //   -(b + t) / 2,
    //   0,
    //   0,
    //   1,
    //   -(n + f) / 2,
    //   0,
    //   0,
    //   0,
    //   1
    // );
    // return trans.premultiply(scale);
  }
  static getPerspective({ l, r, t, b, n, f }) {
    const squeez = new Matrix4().inset(
      n,
      0,
      0,
      0,
      0,
      n,
      0,
      0,
      0,
      0,
      n + f,
      -n * f,
      0,
      0,
      1,
      0
    );
    const ortho = CameraUtils.getOrtho({ l, r, t, b, n, f });
    return squeez.premultiply(ortho);
  }

  static getViewCube({ theta, n, f }) {
    const th = (theta / 180) * Math.PI;
    const w = Math.tan(th / 2) * n;

    return { l: -w, r: w, t: w, b: -w, n, f };
  }

  static setOrthoCamera({ width, height, near, far }) {
    return CameraUtils.getOrtho({
      l: -width / 2,
      r: width / 2,
      t: height / 2,
      b: -height / 2,
      n: near,
      f: far,
    });
  }
  static setPerspectCamera({ theta, near, far }) {
    return CameraUtils.getPerspective(
      CameraUtils.getViewCube({ theta, n: near, f: far })
    );
  }
}
