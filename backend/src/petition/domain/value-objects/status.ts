import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { InvalidPetitionStatusException } from '../exceptions/invalid.status'
import { Statuses } from './statuses'

export class Status implements ValueObject<Status> {
    private constructor(private status: Statuses) {
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

    static create(status: Statuses) {
        return new Status(status)
    }

    static createOpened() {
        return new Status(Statuses.OPEN)
    }

    static createConfirmed() {
        return new Status(Statuses.CONFIRMED)
    }

    static createClosed() {
        return new Status(Statuses.CLOSED)
    }

    static createCancelled() {
        return new Status(Statuses.CANCELLED)
    }

    static createSuspended() {
        return new Status(Statuses.SUSPEND)
    }

    static createFinished() {
        return new Status(Statuses.FINISHED)
    }
}
