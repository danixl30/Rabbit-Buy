import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { MessageCreatedEvent } from './events/message.created'
import { MessageDeletedEvent } from './events/message.deleted'
import { InvalidMessageException } from './exceptions/invalid.message'
import { MessageChat } from './value-objects/message.chat'
import { MessageFrom } from './value-objects/message.from'
import { MessageId } from './value-objects/message.id'
import { MessageText } from './value-objects/message.text'
import { MessageTimestamp } from './value-objects/message.timestamp'

export class Message extends AggregateRoot<MessageId> {
    private constructor(
        id: MessageId,
        private _from: MessageFrom,
        private _chat: MessageChat,
        private _body: MessageText,
        private _timestamp: MessageTimestamp,
    ) {
        super(id)
        this.apply(
            new MessageCreatedEvent(
                id,
                this.from,
                this.chat,
                this.body,
                this.timestamp,
            ),
        )
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

    delete() {
        this.apply(new MessageDeletedEvent(this.id))
    }

    validateState(): void {
        if (!this.body || !this.timestamp || !this.chat || !this.from)
            throw new InvalidMessageException()
    }

    static create(
        id: MessageId,
        from: MessageFrom,
        chat: MessageChat,
        body: MessageText,
        timestamp = MessageTimestamp.create(),
    ) {
        return new Message(id, from, chat, body, timestamp)
    }
}
