import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'

export class FranchiseRef implements ValueObject<FranchiseRef> {
    constructor(private franchiseId: FranchiseId) {}

    get value() {
        return this.franchiseId
    }

    equals(other: FranchiseRef): boolean {
        return other.value.equals(this.value)
    }
}
