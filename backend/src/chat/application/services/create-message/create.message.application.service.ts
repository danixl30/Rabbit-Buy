import { Message } from 'src/chat/domain/message/message'
import { MessageChat } from 'src/chat/domain/message/value-objects/message.chat'
import { MessageFrom } from 'src/chat/domain/message/value-objects/message.from'
import { MessageId } from 'src/chat/domain/message/value-objects/message.id'
import { MessageText } from 'src/chat/domain/message/value-objects/message.text'
import { ChatId } from 'src/chat/domain/value-objects/chat.id'
import { ChatMessage } from 'src/chat/domain/value-objects/chat.message'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { UserId } from 'src/user/domain/value-objects/user.id'
import { ChatRepository } from '../../repository/chat.repository'
import { MessageRepository } from '../../repository/message.repository'
import { CreateMessageDTO } from './types/dto'
import { CreateMessageResponse } from './types/response'

export class CreateMessageApplicationService
    implements ApplicationService<CreateMessageDTO, CreateMessageResponse>
{
    constructor(
        private chatRepository: ChatRepository,
        private messageRepository: MessageRepository,
        private uuidGenerator: UUIDGenerator,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: CreateMessageDTO): Promise<CreateMessageResponse> {
        const chat = await this.chatRepository.searchById(new ChatId(data.chat))
        if (!chat) throw new Error('Chat not exist')
        const message = new Message(
            new MessageId(this.uuidGenerator.generate()),
            new MessageFrom(new UserId(data.from)),
            new MessageChat(new ChatId(data.chat)),
            new MessageText(data.body),
        )
        await this.messageRepository.save(message)
        chat.addMessage(new ChatMessage(message.id))
        await this.chatRepository.save(chat)
        this.eventHandler.publish([
            ...message.pullEvents(),
            ...chat.pullEvents(),
        ])
        return {
            id: message.id.value,
            from: message.from.value.value,
            body: message.body.value,
            timestamp: message.timestamp.value,
        }
    }
}
