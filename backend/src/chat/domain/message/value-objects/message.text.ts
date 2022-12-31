import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { InvalidMessageBodyException } from '../exceptions/invalid.message.body'

export class MessageText implements ValueObject<MessageText> {
    constructor(private text: string) {
        if (!text) throw new InvalidMessageBodyException()
    }

    get value() {
        return this.text
    }

    equals(other: MessageText): boolean {
        return other.value === this.value
    }
}
