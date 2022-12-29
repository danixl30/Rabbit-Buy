import { AgreggateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { MessageChat } from './value-objects/message.chat'
import { MessageFrom } from './value-objects/message.from'
import { MessageId } from './value-objects/message.id'
import { MessageText } from './value-objects/message.text'
import { MessageTimestamp } from './value-objects/message.timestamp'

export class Message extends AgreggateRoot<MessageId> {
    constructor(
        id: MessageId,
        private _from: MessageFrom,
        private _chat: MessageChat,
        private _body: MessageText,
        private _timestamp = new MessageTimestamp(),
    ) {
        super(id)
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

    validateState(): void {
        if (!this.body || !this.timestamp || !this.chat || !this.from)
            throw new Error('Invalid message')
    }
}
