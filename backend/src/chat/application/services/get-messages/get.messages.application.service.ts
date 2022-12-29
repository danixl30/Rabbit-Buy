import { MessageChat } from 'src/chat/domain/message/value-objects/message.chat'
import { ChatId } from 'src/chat/domain/value-objects/chat.id'
import { ApplicationService } from 'src/core/application/service/application.service'
import { ChatRepository } from '../../repository/chat.repository'
import { MessageRepository } from '../../repository/message.repository'
import { FindChatMessagesQueryFactory } from './queries/find.messages.chat.query'
import { GetMessagesDTO } from './types/dto'
import { GetMessagesResponse } from './types/response'

export class GetMessagesApplicationService
    implements ApplicationService<GetMessagesDTO, GetMessagesResponse[]>
{
    constructor(private messageRepository: MessageRepository) {}

    async execute(data: GetMessagesDTO): Promise<GetMessagesResponse[]> {
        const messages = await this.messageRepository.searchAll(
            new FindChatMessagesQueryFactory(
                new MessageChat(new ChatId(data.chat)),
            ).create(),
        )
        return messages.map((e) => ({
            id: e.id.value,
            body: e.body.value,
            from: e.from.value.value,
            timestamp: e.timestamp.value,
        }))
    }
}
