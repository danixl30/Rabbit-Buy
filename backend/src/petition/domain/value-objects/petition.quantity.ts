import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { InvalidPetitionQuantityException } from '../exceptions/invalid.petition.quantity'

export class PetitionQuantity implements ValueObject<PetitionQuantity> {
    constructor(private quantity: number) {
        if (quantity <= 0) throw new InvalidPetitionQuantityException()
    }

    get value() {
        return this.quantity
    }

    equals(other: PetitionQuantity): boolean {
        return other.value === this.value
    }
}
