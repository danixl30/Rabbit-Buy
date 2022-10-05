import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ProviderId implements ValueObject<ProviderId> {
    constructor(private id: string) {}

    get value(): string {
        return this.id
    }

    equals(other: ProviderId): boolean {
        return other.value === this.value
    }
}
