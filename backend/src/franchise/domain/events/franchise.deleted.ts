import { DomainEvent } from 'src/core/domain/events/event'
import { FranchiseId } from '../value-objects/franchise.id'

export class FranchiseCreatedEvent extends DomainEvent {
    constructor(private _id: FranchiseId) {
        super()
    }

    get id() {
        return this._id
    }

    static eventName = this.prototype.constructor.name
}
