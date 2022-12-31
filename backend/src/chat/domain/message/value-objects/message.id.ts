import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID/UUID.reg.exp'
import { InvalidMessageIdException } from '../exceptions/invalid.message.id'

export class MessageId implements ValueObject<MessageId> {
    constructor(private id: string) {
        if (!regExpUUID.test(id)) throw new InvalidMessageIdException()
    }

    get value() {
        return this.id
    }

    equals(other: MessageId): boolean {
        return other.value === this.value
    }
}
