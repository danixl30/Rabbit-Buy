import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class PetitionDate implements ValueObject<PetitionDate> {
    private constructor(private date: Date) {}

    get value() {
        return this.date
    }

    equals(other: PetitionDate): boolean {
        return other.value === this.value
    }

    static create(date: Date) {
        return new PetitionDate(date)
    }
}
