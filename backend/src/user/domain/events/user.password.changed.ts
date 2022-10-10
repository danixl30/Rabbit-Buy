import { DomainEvent } from 'src/core/domain/events/event'
import { Password } from '../value-objects/password'
import { UserId } from '../value-objects/user.id'

export class UserPasswordChangedEvent extends DomainEvent {
    constructor(private _id: UserId, private _password: Password) {
        super()
    }

    get id() {
        return this._id
    }

    get password() {
        return this._password
    }

    static eventName = this.prototype.constructor.name
}
