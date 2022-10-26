import { DomainEvent } from 'src/core/domain/events/event'
import { AdminId } from '../value-objects/admin.id'
import { AdminName } from '../value-objects/admin.name'

export class AdminNameChangedEvent extends DomainEvent {
    constructor(private _id: AdminId, private _name: AdminName) {
        super()
    }

    get id() {
        return this._id
    }

    get name() {
        return this._name
    }
}
