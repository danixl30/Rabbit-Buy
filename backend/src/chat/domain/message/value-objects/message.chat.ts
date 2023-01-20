import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { ChatId } from '../../value-objects/chat.id'

export class MessageChat implements ValueObject<MessageChat> {
    private constructor(private id: ChatId) {}

    get value() {
        return this.id
    }

    equals(other: MessageChat): boolean {
        return other.value.equals(this.value)
    }

    static create(id: ChatId) {
        return new MessageChat(id)
    }
}
