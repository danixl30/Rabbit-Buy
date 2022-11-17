import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { InvalidPetitionStatusException } from '../exceptions/invalid.status'
import { Statuses } from './statuses'

export class Status implements ValueObject<Status> {
    constructor(private status: Statuses) {
        if (!Statuses[status]) throw new InvalidPetitionStatusException()
    }

    get value() {
        return this.status
    }

    isNotFisished() {
        return this.value !== Statuses.FINISHED
    }

    equals(other: Status): boolean {
        return other.value === this.value
    }
}
