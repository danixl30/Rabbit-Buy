import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class UserId implements ValueObject<UserId> {
    constructor(private id: string) {}

    get value(): string {
        return this.id
    }
    equals(other: UserId): boolean {
        return other.value === this.value
    }
}
