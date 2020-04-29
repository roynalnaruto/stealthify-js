import Stealthify from '../src/stealthify-js'

import { Bn254, Secp256k1 } from '../src/curves'

describe('Instantiation', () => {
  it('Stealthify<Bn254> is instantiable', () => {
    expect(new Stealthify<Bn254>(Bn254)).toBeInstanceOf(Stealthify)
  })

  it('Stealthify<Secp256k1> is instantiable', () => {
    expect(new Stealthify<Secp256k1>(Secp256k1)).toBeInstanceOf(Stealthify)
  })
})
