import { DomainEvent } from 'src/core/domain/events/event'
import { ChatClient } from '../value-objects/chat.client'
import { ChatFranchise } from '../value-objects/chat.franchise'
import { ChatId } from '../value-objects/chat.id'
import { ChatMessage } from '../value-objects/chat.message'
import { ChatTimestamp } from '../value-objects/chat.timestamp'

export class ChatCreatedEvent extends DomainEvent {
    constructor(
        private _id: ChatId,
        private _client: ChatClient,
        private _franchise: ChatFranchise,
        private _messages: ChatMessage[],
        private _timestamp: ChatTimestamp,
    ) {
        super()
    }

    get id() {
        return this._id
    }

    get client() {
        return this._client
    }

    get franchise() {
        return this._franchise
    }

    get messages() {
        return this._messages
    }

    get timestamp() {
        return this._timestamp
    }
}
