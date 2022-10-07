import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class PetitionQuantity implements ValueObject<PetitionQuantity> {
    constructor(private quantity: number) {}

    get value() {
        return this.quantity
    }

    equals(other: PetitionQuantity): boolean {
        return other.value === this.value
    }
}
