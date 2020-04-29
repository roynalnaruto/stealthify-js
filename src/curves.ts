const bn128 = require('@aztec/bn128')
const BN = require('bn.js')
const EC = require('elliptic')
const { randomHex } = require('web3-utils')

export abstract class EllipticCurve {
  curve: typeof EC.curve.short.ShortCurve

  randomScalar (): typeof BN {
    const groupModulus = new BN(this.curve.n, 16)
    const groupReduction = BN.red(groupModulus)
    return new BN(randomHex(32), 16).toRed(groupReduction)
  }
}

export class Bn254 extends EllipticCurve {
  constructor () {
    super()
    this.curve = bn128.curve
  }
}

export class Secp256k1 extends EllipticCurve {
  constructor () {
    super()
    this.curve = new EC.ec('secp256k1').curve
  }
}
