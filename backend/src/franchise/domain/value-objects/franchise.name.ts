import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { InvalidFranchiseNameException } from '../exceptions/invalid.franchise.name'

export class FranchiseName implements ValueObject<FranchiseName> {
    constructor(private name: string) {
        if (name.isEmpty()) throw new InvalidFranchiseNameException()
    }

    get value(): string {
        return this.name
    }

    equals(other: FranchiseName): boolean {
        return other.value === this.value
    }
}
