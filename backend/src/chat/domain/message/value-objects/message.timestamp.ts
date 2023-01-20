import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class MessageTimestamp implements ValueObject<MessageTimestamp> {
    private constructor(private date: Date = new Date()) {}

    get value() {
        return this.date
    }

    equals(other: MessageTimestamp): boolean {
        return other.value === this.date
    }

    static create(date = new Date()) {
        return new MessageTimestamp(date)
    }
}
