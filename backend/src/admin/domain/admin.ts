import { AgreggateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { AdminCreatedEvent } from './events/admin.created'
import { AdminDeletedEvent } from './events/admin.deleted'
import { AdminEmailChangedEvent } from './events/admin.email.changed'
import { AdminNameChangedEvent } from './events/admin.name.changed'
import { InvalidAdminException } from './exceptions/invalid.admin'
import { AdminEmail } from './value-objects/admin.email'
import { AdminId } from './value-objects/admin.id'
import { AdminName } from './value-objects/admin.name'

export class Admin extends AgreggateRoot<AdminId> {
    constructor(
        id: AdminId,
        private _name: AdminName,
        private _email: AdminEmail,
    ) {
        super(id)
        this.apply(new AdminCreatedEvent(id, this.name, this.email))
    }

    get name() {
        return this._name
    }

    get email() {
        return this._email
    }

    changeName(name: AdminName) {
        this._name = name
        this.apply(new AdminNameChangedEvent(this.id, name))
    }

    changeEmail(email: AdminEmail) {
        this._email = email
        this.apply(new AdminEmailChangedEvent(this.id, email))
    }

    delete() {
        this.apply(new AdminDeletedEvent(this.id))
    }

    validateState(): void {
        if (!this.id || !this.name || !this.email)
            throw new InvalidAdminException()
    }
}
