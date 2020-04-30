import { EllipticCurve } from './curves'
import { Hash } from './hashes'

export default class Stealthify<E extends EllipticCurve, H extends Hash> {
  ec: E
  hasher: H

  constructor(ECreator: { new (): E }, HCreator: { new (): H }) {
    this.ec = new ECreator()
    this.hasher = new HCreator()
  }
}
