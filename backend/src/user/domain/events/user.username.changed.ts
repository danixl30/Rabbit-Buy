import { DomainEvent } from 'src/core/domain/events/event'
import { UserId } from '../value-objects/user.id'
import { Username } from '../value-objects/username'

export class UserUsernameChangedEvent extends DomainEvent {
    constructor(private _id: UserId, private _username: Username) {
        super()
    }

    get id() {
        return this._id
    }

    get username() {
        return this._username
    }

    static eventName = this.prototype.constructor.name
}
