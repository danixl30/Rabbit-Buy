import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID/UUID.reg.exp'

export class MessageId implements ValueObject<MessageId> {
    constructor(private id: string) {
        if (!regExpUUID.test(id)) throw new Error('invalid id')
    }

    get value() {
        return this.id
    }

    equals(other: MessageId): boolean {
        return other.value === this.value
    }
}
