import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { UserId } from 'src/user/domain/value-objects/user.id'

export class MessageFrom implements ValueObject<MessageFrom> {
    private constructor(private id: UserId) {}

    get value() {
        return this.id
    }

    equals(other: MessageFrom): boolean {
        return other.value.equals(this.value)
    }

    static create(id: UserId) {
        return new MessageFrom(id)
    }
}
