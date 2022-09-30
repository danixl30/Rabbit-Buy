import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class FranchiseId implements ValueObject<FranchiseId> {
    constructor(private id: string) {}

    get value(): string {
        return this.id
    }
    equals(other: FranchiseId): boolean {
        return other.value === this.value
    }
}
