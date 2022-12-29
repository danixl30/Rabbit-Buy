import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class MessageTimestamp implements ValueObject<MessageTimestamp> {
    constructor(private date: Date = new Date()) {}

    get value() {
        return this.date
    }

    equals(other: MessageTimestamp): boolean {
        return other.value === this.date
    }
}
