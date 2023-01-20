import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID/UUID.reg.exp'
import { InvalidProviderIdException } from '../exceptions/invalid.provider.id'

export class ProviderId implements ValueObject<ProviderId> {
    private constructor(private id: string) {
        if (!regExpUUID.test(id)) throw new InvalidProviderIdException()
    }

    get value(): string {
        return this.id
    }

    equals(other: ProviderId): boolean {
        return other.value === this.value
    }

    static create(id: string) {
        return new ProviderId(id)
    }
}
