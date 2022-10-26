import { DomainEvent } from 'src/core/domain/events/event'
import { AdminEmail } from '../value-objects/admin.email'
import { AdminId } from '../value-objects/admin.id'
import { AdminName } from '../value-objects/admin.name'

export class AdminCreatedEvent extends DomainEvent {
    constructor(
        private _id: AdminId,
        private _name: AdminName,
        private _email: AdminEmail,
    ) {
        super()
    }

    get id() {
        return this._id
    }

    get name() {
        return this._name
    }

    get email() {
        return this._email
    }
}
