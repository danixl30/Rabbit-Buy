import { DomainEvent } from 'src/core/domain/events/event'
import { ClientId } from '../value-objects/client.id'
import { ClientName } from '../value-objects/client.name'

export class ClientNameChangedEvent extends DomainEvent {
    constructor(private _id: ClientId, private _name: ClientName) {
        super()
    }

    get id() {
        return this._id
    }

    get name() {
        return this._name
    }
}
