import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ChatTimestamp implements ValueObject<ChatTimestamp> {
    constructor(private date: Date = new Date()) {}

    get value() {
        return this.date
    }

    update() {
        return new ChatTimestamp()
    }

    equals(other: ChatTimestamp): boolean {
        return other.value === this.date
    }
}
