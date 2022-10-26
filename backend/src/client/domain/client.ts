import { AgreggateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { ClientCreatedEvent } from './events/client.created'
import { ClientDeletedEvent } from './events/client.deleted'
import { ClientEmailChangedEvent } from './events/client.email.changed'
import { ClientNameChangedEvent } from './events/client.name.changed'
import { InvalidClientException } from './exceptions/invalid.client'
import { ClientEmail } from './value-objects/client.email'
import { ClientId } from './value-objects/client.id'
import { ClientName } from './value-objects/client.name'

export class Client extends AgreggateRoot<ClientId> {
    constructor(
        id: ClientId,
        private _name: ClientName,
        private _email: ClientEmail,
    ) {
        super(id)
        this.apply(new ClientCreatedEvent(id, this.name, this.email))
    }

    get name() {
        return this._name
    }

    get email() {
        return this._email
    }

    changeName(name: ClientName) {
        this._name = name
        this.apply(new ClientNameChangedEvent(this.id, name))
    }

    changeEmail(email: ClientEmail) {
        this._email = email
        this.apply(new ClientEmailChangedEvent(this.id, email))
    }

    delete() {
        this.apply(new ClientDeletedEvent(this.id))
    }

    validateState(): void {
        if (!this.id || !this.name || !this.email)
            throw new InvalidClientException()
    }
}
