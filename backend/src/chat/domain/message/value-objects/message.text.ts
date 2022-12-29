import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class MessageText implements ValueObject<MessageText> {
    constructor(private text: string) {
        if (!text) throw new Error('body invalid')
    }

    get value() {
        return this.text
    }

    equals(other: MessageText): boolean {
        return other.value === this.value
    }
}
