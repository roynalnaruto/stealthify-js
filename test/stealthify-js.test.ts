import Stealthify from '../src/stealthify-js'
import { Bn254, Secp256k1 } from '../src/curves'
import { Keccak256, Sha256 } from '../src/hashes'

describe('Instantiation', () => {
  it('Stealthify<Bn254, Keccak256> is instantiable', () => {
    expect(new Stealthify<Bn254, Keccak256>(Bn254, Keccak256)).toBeInstanceOf(Stealthify)
  })

  it('Stealthify<Bn254, Sha256> is instantiable', () => {
    expect(new Stealthify<Bn254, Sha256>(Bn254, Sha256)).toBeInstanceOf(Stealthify)
  })

  it('Stealthify<Secp256k1> is instantiable', () => {
    expect(new Stealthify<Secp256k1, Keccak256>(Secp256k1, Keccak256)).toBeInstanceOf(Stealthify)
  })

  it('Stealthify<Secp256k1> is instantiable', () => {
    expect(new Stealthify<Secp256k1, Sha256>(Secp256k1, Sha256)).toBeInstanceOf(Stealthify)
  })
})
