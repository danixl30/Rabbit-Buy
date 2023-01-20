import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID/UUID.reg.exp'
import { InvalidFranchiseIdException } from '../exceptions/invalid.franchise.id'

export class FranchiseId implements ValueObject<FranchiseId> {
    private constructor(private id: string) {
        if (!regExpUUID.test(id)) throw new InvalidFranchiseIdException()
    }

    get value(): string {
        return this.id
    }
    equals(other: FranchiseId): boolean {
        return other.value === this.value
    }

    static create(id: string) {
        return new FranchiseId(id)
    }
}
