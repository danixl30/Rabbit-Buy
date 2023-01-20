import { Chat } from 'src/chat/domain/chat'
import { MessageId } from 'src/chat/domain/message/value-objects/message.id'
import { ChatClient } from 'src/chat/domain/value-objects/chat.client'
import { ChatFranchise } from 'src/chat/domain/value-objects/chat.franchise'
import { ChatId } from 'src/chat/domain/value-objects/chat.id'
import { ChatMessage } from 'src/chat/domain/value-objects/chat.message'
import { ChatTimestamp } from 'src/chat/domain/value-objects/chat.timestamp'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { UserId } from 'src/user/domain/value-objects/user.id'
import { ChatDocument } from '../models/chat.model'

export const chatDbToDomain = (chat: ChatDocument) =>
    Chat.create(
        ChatId.create(chat.id),
        ChatClient.create(UserId.create(chat.client)),
        ChatFranchise.create(FranchiseId.create(chat.franchise)),
        chat.messages.map((e) => ChatMessage.create(MessageId.create(e))),
        ChatTimestamp.create(chat.timestamp),
    )
