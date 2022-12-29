import { DomainEvent } from 'src/core/domain/events/event'
import { ChatId } from '../value-objects/chat.id'
import { ChatMessage } from '../value-objects/chat.message'

export class MessageAddedEvent extends DomainEvent {
    constructor(private _id: ChatId, private _messages: ChatMessage[]) {
        super()
    }

    get id() {
        return this._id
    }

    get messages() {
        return this._messages
    }
}
