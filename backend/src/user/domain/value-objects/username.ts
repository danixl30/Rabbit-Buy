import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class Username implements ValueObject<Username> {
    private constructor(private username: string) {}

    get value(): string {
        return this.username
    }

    equals(other: Username): boolean {
        return other.value === this.username
    }

    static create(username: string) {
        return new Username(username)
    }
}
