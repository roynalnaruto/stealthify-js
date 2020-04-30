import { strict as assert } from 'assert'
import BN = require('bn.js')

import { Keccak256, Sha256 } from '../src/hashes'

describe('Hash.hash', () => {
  it('Outputs correct Keccak256 hash', () => {
    let keccak256 = new Keccak256()
    assert.deepStrictEqual(
      keccak256.hash('0x407D73d8a49eeb85D32Cf465507dd71d507100c1'),
      '0x3c69a194aaf415ba5d6afca734660d0a3d45acdc05d54cd1ca89a8988e7625b4'
    )
  })

  it('Outputs correct Sha256 hash', () => {
    let sha256 = new Sha256()
    assert.deepStrictEqual(
      sha256.hash('abc'),
      'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    )
  })
})
