import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class PetitionId implements ValueObject<PetitionId> {
    constructor(private id: string) {}

    get value(): string {
        return this.id
    }

    equals(other: PetitionId): boolean {
        return other.value === this.value
    }
}
