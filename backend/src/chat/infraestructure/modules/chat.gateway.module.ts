import { Module } from '@nestjs/common'
import { MongoModelsModule } from 'src/core/infraestructure/models/mongo/models.mongo.module'
import { UUIDModule } from 'src/core/infraestructure/UUID/module/UUID.module'
import { ChatGateway } from '../gateways/chat.gateway'

@Module({
    imports: [MongoModelsModule, UUIDModule],
    providers: [ChatGateway],
})
export class ChatGatewayModule {}
