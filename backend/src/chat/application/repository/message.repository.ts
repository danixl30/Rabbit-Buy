import { Message } from 'src/chat/domain/message/message'
import { MessageId } from 'src/chat/domain/message/value-objects/message.id'
import { Criteria } from 'src/core/application/repository/query/criteria'
import { Repository } from 'src/core/application/repository/repository'

export interface MessageRepository extends Repository<MessageId, Message> {
    searchById(id: MessageId): Promise<Message>
    searchAll(criteria: Criteria): Promise<Message[]>
}
