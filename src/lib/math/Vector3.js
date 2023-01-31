class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  set(x, y, z) {
    this._x = x;
    this._y = y;
    this._z = z;
    return this;
  }

  applyMatrix(m) {
    const x = this._x,
      y = this._y,
      z = this._z,
      e = m.elements;
    const w = 1 / (e[12] * x + e[13] * y + e[14] * z + e[15]);
    return new this.constructor(
      (e[0] * x + e[1] * y + e[2] * z + e[3]) * w,
      (e[4] * x + e[5] * y + e[6] * z + e[7]) * w,
      (e[8] * x + e[9] * y + e[10] * z + e[11]) * w
    );
  }

  multiplyScalar(scalar) {
    this._x *= scalar;
    this._y *= scalar;
    this._z *= scalar;
    return this;
  }

  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z;
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
    this._x -= v.x;
    this._y -= v.y;
    this._z -= v.z;
    return this;
  }

  cross(v) {
    return this.crossVectors(this, v);
  }

  crossVectors(a, b) {
    const ax = a._x,
      ay = a._y,
      az = a._z;
    const bx = b._x,
      by = b._y,
      bz = b._z;

    const x = ay * bz - az * by;
    const y = az * bx - ax * bz;
    const z = ax * by - ay * bx;

    return new this.constructor(x, y, z);
  }
}

Object.defineProperties(Vector3.prototype, {
  x: {
    get: function () {
      return this._x;
    },
    set: function (x) {
      this._x = x;
      this._onChange?.();
    },
  },
  y: {
    get: function () {
      return this._y;
    },
    set: function (y) {
      this._y = y;
      this._onChange?.();
    },
  },
  z: {
    get: function () {
      return this._z;
    },
    set: function (z) {
      this._z = z;
      this._onChange?.();
    },
  },
});

export default Vector3;
