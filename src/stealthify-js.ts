import { EllipticCurve } from './curves'
import { Hash } from './hashes'

export interface Stealth {
  readonly stealthPublicKey: string
  readonly stealthAddress?: string
  readonly noncePoint: string
}

export default class Stealthify<E extends EllipticCurve, H extends Hash> {
  ec: E
  hasher: H

  constructor(ECreator: { new (): E }, HCreator: { new (): H }) {
    this.ec = new ECreator()
    this.hasher = new HCreator()
  }

  generate(compressedPK: string): Stealth {
    const pk = this.ec.decompressHex(compressedPK)

    const p = this.ec.randomScalar()
    const noncePoint = this.ec.pointFromScalar(p)
    const compressedNoncePoint = this.ec.compressToHex(noncePoint)

    const sharedSecret = this.ec.pointAsHex(pk.mul(p))
    const sharedSecretHashed = this.hasher.hash(sharedSecret)
    const sharedSecretNumber = this.ec.scalarFromHex(sharedSecretHashed)

    const recipientPublicKey = this.ec.pointFromScalar(sharedSecretNumber).add(pk)

    const stealth = {
      stealthPublicKey: this.ec.compressToHex(recipientPublicKey),
      noncePoint: compressedNoncePoint
    }

    return stealth
  }
}
