export default class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  set(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  applyMatrix(m) {
    const x = this.x,
      y = this.y,
      z = this.z,
      e = m.elements;
    const w = 1 / (e[12] * x + e[13] * y + e[14] * z + e[15]);
    return new this.constructor(
      (e[0] * x + e[1] * y + e[2] * z + e[3]) * w,
      (e[4] * x + e[5] * y + e[6] * z + e[7]) * w,
      (e[8] * x + e[9] * y + e[10] * z + e[11]) * w
    );
  }

  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }

  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  length() {
    return Math.sqrt(this.lengthSq());
  }

  divideScalar(scalar) {
    return this.multiplyScalar(1 / scalar);
  }

  normalize() {
    return this.divideScalar(this.length() || 1);
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }

  cross(v) {
    return this.crossVectors(this, v);
  }

  crossVectors(a, b) {
    const ax = a.x,
      ay = a.y,
      az = a.z;
    const bx = b.x,
      by = b.y,
      bz = b.z;

    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;

    return this;
  }
}
