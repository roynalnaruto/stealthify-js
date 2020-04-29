import { EllipticCurve } from './curves'

export default class Stealthify<E extends EllipticCurve> {
  ec: E

  constructor (ECreator: { new (): E }) {
    this.ec = new ECreator()
  }
}
