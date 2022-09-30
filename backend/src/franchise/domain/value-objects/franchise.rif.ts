import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class FranchiseRif implements ValueObject<FranchiseRif> {
    constructor(private rif: string) {}

    get value(): string {
        return this.rif
    }

    equals(other: FranchiseRif): boolean {
        return other.value === this.value
    }
}
