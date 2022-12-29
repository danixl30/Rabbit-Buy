import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID/UUID.reg.exp'
import { InvalidChatIdException } from '../exceptions/invalid.chat.id'

export class ChatId implements ValueObject<ChatId> {
    constructor(private id: string) {
        if (!regExpUUID.test(id)) throw new InvalidChatIdException()
    }

    get value() {
        return this.id
    }

    equals(other: ChatId): boolean {
        return other.value === this.value
    }
}
