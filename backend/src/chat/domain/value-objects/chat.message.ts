import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { MessageId } from '../message/value-objects/message.id'

export class ChatMessage implements ValueObject<ChatMessage> {
    private constructor(private id: MessageId) {}

    get value() {
        return this.id
    }

    equals(other: ChatMessage): boolean {
        return other.value.equals(this.value)
    }

    static create(id: MessageId) {
        return new ChatMessage(id)
    }
}
