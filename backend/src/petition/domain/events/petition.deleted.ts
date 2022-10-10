import { DomainEvent } from 'src/core/domain/events/event'
import { PetitionId } from '../value-objects/petition.id'

export class PetitionDeletedEvent extends DomainEvent {
    constructor(private _id: PetitionId) {
        super()
    }

    get id() {
        return this._id
    }

    static eventName = this.prototype.constructor.name
}
