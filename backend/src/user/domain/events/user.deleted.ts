import { DomainEvent } from 'src/core/domain/events/event'
import { UserId } from '../value-objects/user.id'

export class UserDeletedEvent extends DomainEvent {
    constructor(private _id: UserId) {
        super()
    }

    get id() {
        return this._id
    }

    static eventName = this.prototype.constructor.name
}
