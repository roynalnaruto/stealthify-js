import { soliditySha3 } from 'web3-utils'
import sha256 from 'fast-sha256'

export abstract class Hash {
  abstract hash(message: string): string
}

export class Keccak256 extends Hash {
  constructor() {
    super()
  }

  hash(message: string): string {
    const hash = soliditySha3({ t: 'bytes', v: message })
    return hash === null ? '' : hash
  }
}

export class Sha256 extends Hash {
  constructor() {
    super()
  }

  hash(hexMessage: string): string {
    const message = Uint8Array.from(Buffer.from(hexMessage, 'hex'))
    const hash = sha256(message)
    return Buffer.from(hash).toString('hex')
  }
}
