import { Chat } from 'src/chat/domain/chat'
import { ChatId } from 'src/chat/domain/value-objects/chat.id'
import { Criteria } from 'src/core/application/repository/query/criteria'
import { Repository } from 'src/core/application/repository/repository'

export interface ChatRepository extends Repository<ChatId, Chat> {
    searchAll(criteria: Criteria): Promise<Chat[]>
    searchOne(criteria: Criteria): Promise<Chat>
    searchById(id: ChatId): Promise<Chat>
}
