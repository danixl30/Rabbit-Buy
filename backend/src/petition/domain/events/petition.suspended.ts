import { DomainEvent } from 'src/core/domain/events/event'
import { PetitionId } from '../value-objects/petition.id'
import { Status } from '../value-objects/status'

export class PetitionSuspendedEvent extends DomainEvent {
    constructor(private _id: PetitionId, private _status: Status) {
        super()
    }

    get id() {
        return this._id
    }

    get status() {
        return this._status
    }

    static eventName = this.prototype.constructor.name
}
