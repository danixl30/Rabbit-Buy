import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { UserId } from 'src/user/domain/value-objects/user.id'

export class ChatClient implements ValueObject<ChatClient> {
    private constructor(private id: UserId) {}

    get value() {
        return this.id
    }

    equals(other: ChatClient): boolean {
        return other.value.equals(this.value)
    }

    static create(id: UserId) {
        return new ChatClient(id)
    }
}
