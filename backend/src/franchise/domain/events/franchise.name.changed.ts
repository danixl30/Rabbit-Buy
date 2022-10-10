import { DomainEvent } from 'src/core/domain/events/event'
import { FranchiseId } from '../value-objects/franchise.id'
import { FranchiseName } from '../value-objects/franchise.name'

export class FranchiseNameChangedEvent extends DomainEvent {
    constructor(private _id: FranchiseId, private _name: FranchiseName) {
        super()
    }

    get id() {
        return this._id
    }

    get name() {
        return this._name
    }

    static eventName = FranchiseNameChangedEvent.constructor.name
}
