const bn128 = require('@aztec/bn128')
const BN = require('bn.js')
const EC = require('elliptic')
const { randomHex } = require('web3-utils')

type ShortCurve = typeof EC.curve.short.ShortCurve
type Point = typeof EC.curve.short.Point

export abstract class EllipticCurve {
  curve: ShortCurve

  randomScalar(): typeof BN {
    const groupModulus = new BN(this.curve.n, 16)
    const groupReduction = BN.red(groupModulus)
    return new BN(randomHex(32), 16).toRed(groupReduction)
  }

  pointFromScalar(s: typeof BN): Point {
    return this.curve.g.mul(s)
  }

  randomPoint(): Point {
    const r = this.randomScalar()
    return this.pointFromScalar(r)
  }

  abstract decompressHex(h: typeof BN): Point
}

export class Bn254 extends EllipticCurve {
  compressionMask: typeof BN

  constructor() {
    super()
    this.curve = bn128.curve
    this.compressionMask = new BN(
      '8000000000000000000000000000000000000000000000000000000000000000',
      16
    )
  }

  compressToHex(p: Point): string {
    let compressed = p.getX()
    if (p.getY().testn(0)) {
      compressed = compressed.or(this.compressionMask)
    }
    return compressed.toString(16, 64)
  }

  decompressHex(h: string): Point {
    const compressed = new BN(h, 16)
    const yBit = compressed.testn(255)
    const x = compressed.maskn(255).toRed(this.curve.red)
    const y2 = x
      .redSqr()
      .redMul(x)
      .redIAdd(this.curve.b)
    const yRoot = y2.redSqrt()
    if (
      yRoot
        .redSqr()
        .redSub(y2)
        .fromRed()
        .cmpn(0) !== 0
    ) {
      throw new Error('x^3 + 3 not a square, malformed input')
    }
    let y = yRoot.fromRed()
    if (Boolean(y.isOdd()) !== Boolean(yBit)) {
      y = this.curve.p.sub(y)
    }
    return this.curve.point(x.fromRed(), y)
  }
}

export class Secp256k1 extends EllipticCurve {
  evenCompressionMask: typeof BN
  oddCompressionMask: typeof BN

  constructor() {
    super()
    this.curve = new EC.ec('secp256k1').curve
    this.evenCompressionMask = new BN(
      '020000000000000000000000000000000000000000000000000000000000000000',
      16
    )
    this.oddCompressionMask = new BN(
      '030000000000000000000000000000000000000000000000000000000000000000',
      16
    )
  }

  compressToHex(p: Point): string {
    let compressed = p.getX()
    if (p.getY().testn(0)) {
      compressed = compressed.or(this.oddCompressionMask)
    } else {
      compressed = compressed.or(this.evenCompressionMask)
    }
    return compressed.toString(16, 66)
  }

  decompressHex(h: string): Point {
    const compressed = new BN(h, 16)
    const yBit = compressed.testn(256)
    const x = compressed.maskn(256).toRed(this.curve.red)
    const y2 = x
      .redSqr()
      .redMul(x)
      .redIAdd(this.curve.b)
    const yRoot = y2.redSqrt()
    if (
      yRoot
        .redSqr()
        .redSub(y2)
        .fromRed()
        .cmpn(0) !== 0
    ) {
      throw new Error('x^3 + 7 not a square, malformed input')
    }
    let y = yRoot.fromRed()
    if (Boolean(y.isOdd()) !== Boolean(yBit)) {
      y = this.curve.p.sub(y)
    }
    return this.curve.point(x.fromRed(), y)
  }
}
