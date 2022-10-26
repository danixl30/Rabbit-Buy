import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ClientName implements ValueObject<ClientName> {
    constructor(private username: string) {}

    get value(): string {
        return this.username
    }

    equals(other: ClientName): boolean {
        return other.value === this.username
    }
}
