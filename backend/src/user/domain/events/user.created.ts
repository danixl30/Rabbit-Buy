import { DomainEvent } from 'src/core/domain/events/event'
import { Email } from '../value-objects/email'
import { Password } from '../value-objects/password'
import { Role } from '../value-objects/role'
import { UserId } from '../value-objects/user.id'
import { Username } from '../value-objects/username'

export class UserCreatedEvent extends DomainEvent {
    constructor(
        private _id: UserId,
        private _username: Username,
        private _password: Password,
        private _email: Email,
        private _role: Role,
    ) {
        super()
    }

    get id() {
        return this._id
    }

    get username() {
        return this._username
    }

    get password() {
        return this._password
    }

    get email() {
        return this._email
    }

    get role() {
        return this._role
    }

    static eventName = this.prototype.constructor.name
}
