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

describe('Stealthify.generate', () => {
  it('Generates stealth address with Bn254 and Keccak256', () => {
    let stealthify = new Stealthify<Bn254, Keccak256>(Bn254, Keccak256)
    let publicKey = stealthify.ec.compressToHex(stealthify.ec.randomPoint())
    let stealth = stealthify.generate(publicKey)
  })

  it('Generates stealth address with Bn254 and Sha256', () => {
    let stealthify = new Stealthify<Bn254, Sha256>(Bn254, Sha256)
    let publicKey = stealthify.ec.compressToHex(stealthify.ec.randomPoint())
    let stealth = stealthify.generate(publicKey)
  })

  it('Generates stealth address with Secp256k1 and Keccak256', () => {
    let stealthify = new Stealthify<Secp256k1, Keccak256>(Secp256k1, Keccak256)
    let publicKey = stealthify.ec.compressToHex(stealthify.ec.randomPoint())
    let stealth = stealthify.generate(publicKey)
  })

  it('Generates stealth address with Secp256k1 and Sha256', () => {
    let stealthify = new Stealthify<Secp256k1, Sha256>(Secp256k1, Sha256)
    let publicKey = stealthify.ec.compressToHex(stealthify.ec.randomPoint())
    let stealth = stealthify.generate(publicKey)
  })
})
