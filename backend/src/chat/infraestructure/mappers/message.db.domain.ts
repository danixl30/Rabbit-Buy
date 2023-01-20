import { Message } from 'src/chat/domain/message/message'
import { MessageChat } from 'src/chat/domain/message/value-objects/message.chat'
import { MessageFrom } from 'src/chat/domain/message/value-objects/message.from'
import { MessageId } from 'src/chat/domain/message/value-objects/message.id'
import { MessageText } from 'src/chat/domain/message/value-objects/message.text'
import { MessageTimestamp } from 'src/chat/domain/message/value-objects/message.timestamp'
import { ChatId } from 'src/chat/domain/value-objects/chat.id'
import { UserId } from 'src/user/domain/value-objects/user.id'
import { MessageDocument } from '../models/message.model'

export const messageDbToDomain = (message: MessageDocument) =>
    Message.create(
        MessageId.create(message.id),
        MessageFrom.create(UserId.create(message.from)),
        MessageChat.create(ChatId.create(message.chat)),
        MessageText.create(message.body),
        MessageTimestamp.create(message.timestamp),
    )
