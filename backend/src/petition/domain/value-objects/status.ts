import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { Statuses } from './statuses'

export class Status implements ValueObject<Status> {
    constructor(private status: Statuses) {}

    get value() {
        return this.status
    }

    equals(other: Status): boolean {
        return other.value === this.value
    }
}
