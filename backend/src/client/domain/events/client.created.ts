import { DomainEvent } from 'src/core/domain/events/event'
import { ClientEmail } from '../value-objects/client.email'
import { ClientId } from '../value-objects/client.id'
import { ClientName } from '../value-objects/client.name'

export class ClientCreatedEvent extends DomainEvent {
    constructor(
        private _id: ClientId,
        private _name: ClientName,
        private _email: ClientEmail,
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
