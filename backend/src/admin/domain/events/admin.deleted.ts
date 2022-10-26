import { DomainEvent } from 'src/core/domain/events/event'
import { AdminId } from '../value-objects/admin.id'

export class AdminDeletedEvent extends DomainEvent {
    constructor(private _id: AdminId) {
        super()
    }

    get id() {
        return this._id
    }
}
