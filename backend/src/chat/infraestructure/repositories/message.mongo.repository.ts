import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { MessageRepository } from 'src/chat/application/repository/message.repository'
import { Message } from 'src/chat/domain/message/message'
import { MessageId } from 'src/chat/domain/message/value-objects/message.id'
import { Criteria } from 'src/core/application/repository/query/criteria'
import { CriteriaMongoTransformer } from 'src/core/infraestructure/criteria-transformer/mongo/crietia.mongo.transformer'
import { from as MongoUUID } from 'uuid-mongodb'
import { messageDbToDomain } from '../mappers/message.db.domain'
import { Message as MessageDB, MessageDocument } from '../models/message.model'

@Injectable()
export class MessageMongoRepository implements MessageRepository {
    constructor(
        @InjectModel(MessageDB.name)
        private messageModel: Model<MessageDocument>,
        private criteriaTransformer: CriteriaMongoTransformer,
    ) {}

    async save(aggregate: Message): Promise<Message> {
        const message = await this.messageModel.findById(
            MongoUUID(aggregate.id.value),
        )
        if (!message) {
            const newMessage = new this.messageModel()
            newMessage.id = aggregate.id.value
            newMessage.from = aggregate.from.value.value
            newMessage.chat = aggregate.chat.value.value
            newMessage.timestamp = aggregate.timestamp.value
            newMessage.body = aggregate.body.value
            await newMessage.save()
        }
        message.from = aggregate.from.value.value
        message.chat = aggregate.chat.value.value
        message.timestamp = aggregate.timestamp.value
        message.body = aggregate.body.value
        await message.save()
        return aggregate
    }

    async delete(aggregate: Message): Promise<Message> {
        await this.messageModel.findByIdAndDelete(MongoUUID(aggregate.id.value))
        return aggregate
    }

    async searchAll(criteria: Criteria): Promise<Message[]> {
        const criteriaMongo = this.criteriaTransformer.transform(criteria)
        const messages = await this.messageModel
            .find(criteriaMongo.filter)
            .sort(criteriaMongo.sort)
            .skip(criteriaMongo.skip)
            .limit(criteriaMongo.limit)
        return messages.map(messageDbToDomain)
    }

    async searchById(id: MessageId): Promise<Message> {
        const message = await this.messageModel.findById(MongoUUID(id.value))
        return message ? messageDbToDomain(message) : null
    }
}
