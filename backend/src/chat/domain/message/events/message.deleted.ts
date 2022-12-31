import { DomainEvent } from 'src/core/domain/events/event'
import { MessageId } from '../value-objects/message.id'

export class MessageDeletedEvent extends DomainEvent {
    constructor(private _id: MessageId) {
        super()
    }

    get id() {
        return this._id
    }
}
