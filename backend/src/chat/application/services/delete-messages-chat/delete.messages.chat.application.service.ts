import { MessageChat } from 'src/chat/domain/message/value-objects/message.chat'
import { ChatId } from 'src/chat/domain/value-objects/chat.id'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { MessageRepository } from '../../repository/message.repository'
import { FindChatMessagesQueryFactory } from '../get-messages/queries/find.messages.chat.query'
import { DeleteMessagesByChatDTO } from './types/dto'

export class DeleteMessagesByChatApplicationService
    implements ApplicationService<DeleteMessagesByChatDTO, void>
{
    constructor(
        private messageRepository: MessageRepository,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: DeleteMessagesByChatDTO): Promise<void> {
        const messages = await this.messageRepository.searchAll(
            new FindChatMessagesQueryFactory(
                MessageChat.create(ChatId.create(data.chat)),
                0,
                0,
            ).create(),
        )
        messages.forEach((message) => message.delete())
        await messages.asyncForEach(async (message) =>
            this.messageRepository.delete(message),
        )
        this.eventHandler.publish(
            messages.map((message) => message.pullEvents()).flat(),
        )
    }
}
