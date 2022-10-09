import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID/UUID.reg.exp'
import { InvalidPetitionIdException } from '../exceptions/invalid.petition.id'

export class PetitionId implements ValueObject<PetitionId> {
    constructor(private id: string) {
        if (!regExpUUID.test(id)) throw new InvalidPetitionIdException()
    }

    get value(): string {
        return this.id
    }

    equals(other: PetitionId): boolean {
        return other.value === this.value
    }
}
