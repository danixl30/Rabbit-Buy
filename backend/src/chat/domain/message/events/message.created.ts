import { DomainEvent } from 'src/core/domain/events/event'
import { MessageChat } from '../value-objects/message.chat'
import { MessageFrom } from '../value-objects/message.from'
import { MessageId } from '../value-objects/message.id'
import { MessageText } from '../value-objects/message.text'
import { MessageTimestamp } from '../value-objects/message.timestamp'

export class MessageCreatedEvent extends DomainEvent {
    constructor(
        private _id: MessageId,
        private _from: MessageFrom,
        private _chat: MessageChat,
        private _body: MessageText,
        private _timestamp: MessageTimestamp,
    ) {
        super()
    }

    get id() {
        return this._id
    }

    get chat() {
        return this._chat
    }

    get body() {
        return this._body
    }

    get timestamp() {
        return this._timestamp
    }

    get from() {
        return this._from
    }
}
