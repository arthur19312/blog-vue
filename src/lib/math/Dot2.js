export default class Dot2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  applyMatrix(m) {
    const x = this.x,
      y = this.y,
      e = m.elements;

    const w = 1 / (e[6] * x + e[7] * y + e[8]);
    return new this.constructor(
      (e[0] * x + e[1] * y + e[2]) * w,
      (e[3] * x + e[4] * y + e[5]) * w
    );
  }

  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  lengthSq() {
    return this.x * this.x + this.y * this.y;
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
}
