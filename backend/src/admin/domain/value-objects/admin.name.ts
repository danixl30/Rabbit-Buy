import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class AdminName implements ValueObject<AdminName> {
    constructor(private username: string) {}

    get value(): string {
        return this.username
    }

    equals(other: AdminName): boolean {
        return other.value === this.username
    }
}
