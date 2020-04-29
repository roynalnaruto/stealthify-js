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
