export class Fraction {
  constructor(n, d = 1) {
    if (d === 0) throw new Error("Division by zero");
    if (d < 0) {
      n = -n;
      d = -d;
    }
    const g = Fraction.gcd(Math.abs(n), Math.abs(d));
    this.n = Math.round(n / g);
    this.d = Math.round(d / g);
    if (this.n === 0) this.d = 1;
  }

  static gcd(a, b) {
    return b === 0 ? a : Fraction.gcd(b, a % b);
  }

  add(other) {
    const o = Fraction.from(other);
    return new Fraction(this.n * o.d + o.n * this.d, this.d * o.d);
  }

  sub(other) {
    const o = Fraction.from(other);
    return new Fraction(this.n * o.d - o.n * this.d, this.d * o.d);
  }

  mul(other) {
    const o = Fraction.from(other);
    return new Fraction(this.n * o.n, this.d * o.d);
  }

  div(other) {
    const o = Fraction.from(other);
    if (o.n === 0) throw new Error("Division by zero");
    return new Fraction(this.n * o.d, this.d * o.n);
  }

  isZero() { return this.n === 0; }
  isOne() { return this.n === 1 && this.d === 1; }
  negate() { return new Fraction(-this.n, this.d); }

  static from(val) {
    if (val instanceof Fraction) return val;
    if (typeof val === 'number') {
      if (Number.isInteger(val)) return new Fraction(val, 1);
      const len = val.toString().split('.')[1]?.length || 0;
      const den = Math.pow(10, Math.min(len, 4));
      return new Fraction(Math.round(val * den), den);
    }
    if (typeof val === 'string') {
      if (val.includes('/')) {
        const [p1, p2] = val.split('/');
        return new Fraction(parseInt(p1 || 0, 10), parseInt(p2 || 1, 10));
      }
      const num = parseFloat(val);
      return isNaN(num) ? new Fraction(0) : Fraction.from(num);
    }
    return new Fraction(0);
  }

  toString() {
    if (this.d === 1) return `${this.n}`;
    return `${this.n}/${this.d}`;
  }

  toTex() {
    if (this.d === 1) return `${this.n}`;
    if (this.n < 0) return `-\\frac{${Math.abs(this.n)}}{${this.d}}`;
    return `\\frac{${this.n}}{${this.d}}`;
  }
}