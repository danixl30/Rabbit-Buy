import { Module } from '@nestjs/common'
import { MongoModelsModule } from 'src/core/infraestructure/models/mongo/models.mongo.module'
import { JwtProviderModule } from 'src/core/infraestructure/token/jwt/module/jwt.provider.module'
import { UUIDModule } from 'src/core/infraestructure/UUID/module/UUID.module'
import { ChatController } from '../controllers/chat.controller'

@Module({
    imports: [MongoModelsModule, JwtProviderModule, UUIDModule],
    controllers: [ChatController],
})
export class ChatControllerModule {}
