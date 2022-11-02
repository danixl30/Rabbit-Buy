import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpRif } from 'src/utils/reg-exps/rif/rif.reg.exp'
import { InvalidFranchiseRifException } from '../exceptions/invalid.franchise.rif'

export class FranchiseRif implements ValueObject<FranchiseRif> {
    constructor(private rif: string) {
        if (!regExpRif.test(rif)) throw new InvalidFranchiseRifException()
    }

    get value(): string {
        return this.rif
    }

    equals(other: FranchiseRif): boolean {
        return other.value === this.value
    }
}
