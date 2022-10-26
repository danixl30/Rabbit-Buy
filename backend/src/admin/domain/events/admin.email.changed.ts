import { DomainEvent } from 'src/core/domain/events/event'
import { AdminEmail } from '../value-objects/admin.email'
import { AdminId } from '../value-objects/admin.id'

export class AdminEmailChangedEvent extends DomainEvent {
    constructor(private _id: AdminId, private _email: AdminEmail) {
        super()
    }

    get id() {
        return this._id
    }

    get email() {
        return this._email
    }
}
