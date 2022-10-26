import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID/UUID.reg.exp'
import { InvalidClientIdException } from '../exceptions/invalid.client.id'

export class ClientId implements ValueObject<ClientId> {
    constructor(private id: string) {
        if (!regExpUUID.test(id)) throw new InvalidClientIdException()
    }

    get value() {
        return this.id
    }

    equals(other: ClientId): boolean {
        return other.value === this.value
    }
}
