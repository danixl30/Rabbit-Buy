import { DomainEvent } from 'src/core/domain/events/event'
import { Email } from '../value-objects/email'
import { UserId } from '../value-objects/user.id'

export class UserEmailChangedEvent extends DomainEvent {
    constructor(private _id: UserId, private _email: Email) {
        super()
    }

    get id() {
        return this._id
    }

    get email() {
        return this._email
    }

    static eventName = this.prototype.constructor.name
}
