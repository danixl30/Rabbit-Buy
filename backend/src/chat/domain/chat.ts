import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { ChatCreatedEvent } from './events/chat.created'
import { ChatDeletedEvent } from './events/chat.deleted'
import { MessageAddedEvent } from './events/message.added'
import { InvalidChatException } from './exceptions/invalid.chat'
import { MessageExistException } from './exceptions/message.exist'
import { ChatClient } from './value-objects/chat.client'
import { ChatFranchise } from './value-objects/chat.franchise'
import { ChatId } from './value-objects/chat.id'
import { ChatMessage } from './value-objects/chat.message'
import { ChatTimestamp } from './value-objects/chat.timestamp'

export class Chat extends AggregateRoot<ChatId> {
    private constructor(
        id: ChatId,
        private _client: ChatClient,
        private _franchise: ChatFranchise,
        private _messages: ChatMessage[],
        private _timestamp: ChatTimestamp,
    ) {
        super(id)
        this.apply(
            new ChatCreatedEvent(
                id,
                this.client,
                this.franchise,
                this.messages,
                this.timestamp,
            ),
        )
    }

    get client() {
        return this._client
    }

    get franchise() {
        return this._franchise
    }

    get messages() {
        return [...this._messages]
    }

    get timestamp() {
        return this._timestamp
    }

    addMessage(message: ChatMessage) {
        if (this._messages.find((e) => e.equals(message)))
            throw new MessageExistException()
        this._messages.push(message)
        this._timestamp = this._timestamp.update()
        this.apply(new MessageAddedEvent(this.id, this.messages))
    }

    delete() {
        this.apply(new ChatDeletedEvent(this.id))
    }

    validateState(): void {
        if (!this.client || !this.franchise || !this.timestamp)
            throw new InvalidChatException()
    }

    static create(
        id: ChatId,
        client: ChatClient,
        franchise: ChatFranchise,
        messages: ChatMessage[] = [],
        timestamp = ChatTimestamp.create(),
    ) {
        return new Chat(id, client, franchise, messages, timestamp)
    }
}
