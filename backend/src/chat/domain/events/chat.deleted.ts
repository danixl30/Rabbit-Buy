import { DomainEvent } from 'src/core/domain/events/event'
import { ChatId } from '../value-objects/chat.id'

export class ChatDeletedEvent extends DomainEvent {
    constructor(private _id: ChatId) {
        super()
    }

    get id() {
        return this._id
    }
}
