import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { UserId } from 'src/user/domain/value-objects/user.id'

export class MessageFrom implements ValueObject<MessageFrom> {
    constructor(private id: UserId) {}

    get value() {
        return this.id
    }

    equals(other: MessageFrom): boolean {
        return other.value.equals(this.value)
    }
}
