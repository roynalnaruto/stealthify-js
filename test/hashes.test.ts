import { strict as assert } from 'assert'
import BN = require('bn.js')

import { Keccak256, Sha256 } from '../src/hashes'

describe('Hash.hash', () => {
  it('Outputs correct Keccak256 hash', () => {
    let keccak256 = new Keccak256()
    assert.deepStrictEqual(
      keccak256.hash('0x407D73d8a49eeb85D32Cf465507dd71d507100c1'),
      '0x4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b'
    )

    assert.deepStrictEqual(
      keccak256.hash('407D73d8a49eeb85D32Cf465507dd71d507100c1'),
      '0x4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b'
    )
  })

  it('Outputs correct Sha256 hash', () => {
    let sha256 = new Sha256()
    assert.deepStrictEqual(
      sha256.hash('abcd'),
      '123d4c7ef2d1600a1b3a0f6addc60a10f05a3495c9409f2ecbf4cc095d000a6b'
    )
  })
})
