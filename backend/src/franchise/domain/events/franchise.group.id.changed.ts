import { DomainEvent } from 'src/core/domain/events/event'
import { FranchiseGroupId } from '../value-objects/franchise.group.id'
import { FranchiseId } from '../value-objects/franchise.id'

export class FranchiseGroupIdChangedEvent extends DomainEvent {
    constructor(private _id: FranchiseId, private _groupId: FranchiseGroupId) {
        super()
    }

    get groupId() {
        return this._groupId
    }

    get id() {
        return this._id
    }

    static eventName = FranchiseGroupIdChangedEvent.constructor.name
}
