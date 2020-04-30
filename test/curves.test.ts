import { strict as assert } from 'assert'
import BN = require('bn.js')

import { Bn254, Secp256k1 } from '../src/curves'

describe('EllipticCurve.randomScalar', () => {
  it('Creates a random scalar using Bn254', () => {
    let bn254 = new Bn254()
    let r = bn254.randomScalar()
  })

  it('Creates a random scalar using Secp256k1', () => {
    let secp256k1 = new Secp256k1()
    let r = secp256k1.randomScalar()
  })
})

describe('EllipticCurve.scalarFromHex', () => {
  it('Creates a scalar from hex using Bn254', () => {
    let bn254 = new Bn254()
    assert(bn254.scalarFromHex('1').eq(new BN('1', 16)))
  })

  it('Creates a scalar from hex using Secp256k1', () => {
    let secp256k1 = new Secp256k1()
    assert(secp256k1.scalarFromHex('1').eq(new BN('1', 16)))
  })
})

describe('EllipticCurve.pointFromScalar', () => {
  it('Generates a point given a scalar for Bn254', () => {
    let bn254 = new Bn254()
    let r = bn254.randomScalar()
    let p = bn254.pointFromScalar(r)
  })

  it('Generates a point given a scalar for Secp256k1', () => {
    let secp256k1 = new Secp256k1()
    let r = secp256k1.randomScalar()
    let p = secp256k1.pointFromScalar(r)
  })
})

describe('EllipticCurve.randomPoint', () => {
  it('Generates a random point for Bn254', () => {
    let bn254 = new Bn254()
    let p = bn254.randomPoint()
  })

  it('Generates a random point for Secp256k1', () => {
    let secp256k1 = new Secp256k1()
    let p = secp256k1.randomPoint()
  })
})

describe('EllipticCurve.pointAsHex', () => {
  it('Represents a point in hex for Bn254', () => {
    let bn254 = new Bn254()
    let x = new BN('1', 10)
    let y = new BN('2', 10)
    let p = bn254.curve.point(x, y)
    let h = bn254.pointAsHex(p)
    assert.deepStrictEqual(
      h,
      '00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002'
    )
  })

  it('Represents a point in hex for Secp256k1', () => {
    let secp256k1 = new Secp256k1()
    let x = new BN('79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798', 16)
    let y = new BN('483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8', 16)
    let p = secp256k1.curve.point(x, y)
    let h = secp256k1.pointAsHex(p)
    assert.deepStrictEqual(
      h,
      '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8'
    )
  })
})

describe('EllipticCurve.compressToHex', () => {
  it('Compresses a point to hex string for Bn254', () => {
    let bn254 = new Bn254()
    let x = new BN('1', 10)
    let y = new BN('2', 10)
    let p = bn254.curve.point(x, y)
    let c = bn254.compressToHex(p)
    assert.deepStrictEqual(c, '0000000000000000000000000000000000000000000000000000000000000001')

    let x2 = new BN('1', 10)
    let y2 = new BN('2', 10)
    y2 = bn254.curve.p.sub(y2)
    let p2 = bn254.curve.point(x2, y2)
    let c2 = bn254.compressToHex(p2)
    assert.deepStrictEqual(c2, '8000000000000000000000000000000000000000000000000000000000000001')
  })

  it('Compresses a point to hex string for Secp256k1', () => {
    let secp256k1 = new Secp256k1()
    let x = new BN('79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798', 16)
    let y = new BN('483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8', 16)
    let p = secp256k1.curve.point(x, y)
    let c = secp256k1.compressToHex(p)
    assert.deepStrictEqual(c, '0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798')

    let x2 = new BN('109b604bbe55ec2eefdb00828ba806dabedc0096d7f6857078e9365535b52812', 16)
    let y2 = new BN('7fbb07e07e592186eec8d7b1ecb51c228ec4e58166ceee55ff5aff0aac527f67', 16)
    let p2 = secp256k1.curve.point(x2, y2)
    let c2 = secp256k1.compressToHex(p2)
    assert.deepStrictEqual(c2, '03109b604bbe55ec2eefdb00828ba806dabedc0096d7f6857078e9365535b52812')
  })
})

describe('EllipticCurve.decompressHex', () => {
  it('Decompresses a hex encoding to point for Bn254', () => {
    let bn254 = new Bn254()
    let hex1 = '1'
    let p1 = bn254.decompressHex(hex1)
    assert(p1.eq(bn254.curve.g))

    let hex2 = '8000000000000000000000000000000000000000000000000000000000000001'
    let p2 = bn254.decompressHex(hex2)
    assert(p2.eq(bn254.curve.g.neg()))

    // x^3 + 3 = 3 (not a square)
    let hex3 = '0000000000000000000000000000000000000000000000000000000000000000'
    assert.throws(function() {
      bn254.decompressHex(hex3)
    }, Error('x^3 + 3 not a square, malformed input'))
  })

  it('Decompresses a hex encoding to point for Secp256k1', () => {
    let secp256k1 = new Secp256k1()
    let hex1 = '0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798'
    let hex2 = '279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798'
    let p1 = secp256k1.decompressHex(hex1)
    let p2 = secp256k1.decompressHex(hex2)
    assert(p1.eq(secp256k1.curve.g))
    assert(p2.eq(secp256k1.curve.g))

    let hex3 = '03109b604bbe55ec2eefdb00828ba806dabedc0096d7f6857078e9365535b52812'
    let p3 = secp256k1.decompressHex(hex3)
    let expectedX = new BN('109b604bbe55ec2eefdb00828ba806dabedc0096d7f6857078e9365535b52812', 16)
    let expectedY = new BN('7fbb07e07e592186eec8d7b1ecb51c228ec4e58166ceee55ff5aff0aac527f67', 16)
    assert(p3.getX().eq(expectedX))
    assert(p3.getY().eq(expectedY))

    // x^3 + 7 = 7 (not a square)
    let hex4 = '020000000000000000000000000000000000000000000000000000000000000000'
    assert.throws(function() {
      secp256k1.decompressHex(hex4)
    }, Error('x^3 + 7 not a square, malformed input'))
  })
})
