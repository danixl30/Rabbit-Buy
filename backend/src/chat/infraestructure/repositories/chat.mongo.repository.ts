import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ChatRepository } from 'src/chat/application/repository/chat.repository'
import { Chat } from 'src/chat/domain/chat'
import { ChatId } from 'src/chat/domain/value-objects/chat.id'
import { Criteria } from 'src/core/application/repository/query/criteria'
import { CriteriaMongoTransformer } from 'src/core/infraestructure/criteria-transformer/mongo/crietia.mongo.transformer'
import { Chat as ChatDB, ChatDocument } from '../models/chat.model'
import { from as MongoUUID } from 'uuid-mongodb'
import { chatDbToDomain } from '../mappers/chat.db.domain'

@Injectable()
export class ChatMongoRepository implements ChatRepository {
    constructor(
        @InjectModel(ChatDB.name) private chatModel: Model<ChatDocument>,
        private criteriaTransformer: CriteriaMongoTransformer,
    ) {}

    async save(aggregate: Chat): Promise<Chat> {
        const possibleChat = await this.chatModel.findById(
            MongoUUID(aggregate.id.value),
        )
        if (!possibleChat) {
            const newChat = new this.chatModel()
            newChat.id = aggregate.id.value
            newChat.client = aggregate.client.value.value
            newChat.franchise = aggregate.franchise.value.value
            newChat.timestamp = aggregate.timestamp.value
            newChat.messages = aggregate.messages.map((e) => e.value.value)
            await this.chatModel.create(possibleChat)
        }
        possibleChat.client = aggregate.client.value.value
        possibleChat.franchise = aggregate.franchise.value.value
        possibleChat.timestamp = aggregate.timestamp.value
        possibleChat.messages = aggregate.messages.map((e) => e.value.value)
        await possibleChat.save()
        return aggregate
    }

    async delete(aggregate: Chat): Promise<Chat> {
        await this.chatModel.findByIdAndDelete(MongoUUID(aggregate.id.value))
        return aggregate
    }

    async searchAll(criteria: Criteria): Promise<Chat[]> {
        const criteriaMongo = this.criteriaTransformer.transform(criteria)
        const chats = await this.chatModel
            .find(criteriaMongo.filter)
            .sort(criteriaMongo.sort)
            .skip(criteriaMongo.skip)
            .limit(criteriaMongo.limit)
        return chats.map(chatDbToDomain)
    }

    async searchOne(criteria: Criteria): Promise<Chat> {
        const criteriaMongo = this.criteriaTransformer.transform(criteria)
        const chat = await this.chatModel
            .findOne(criteriaMongo.filter)
            .sort(criteriaMongo.sort)
        return chat ? chatDbToDomain(chat) : null
    }

    async searchById(id: ChatId): Promise<Chat> {
        const chat = await this.chatModel.findById(MongoUUID(id.value))
        return chat ? chatDbToDomain(chat) : null
    }
}
