import { Module } from '@nestjs/common'
import { CryptoModule } from 'src/core/infraestructure/crypto/crypto.module'
import { MongoModelsModule } from 'src/core/infraestructure/models/mongo/models.mongo.module'
import { TokenModule } from 'src/core/infraestructure/token/token.module'
import { UUIDModule } from 'src/core/infraestructure/UUID/module/UUID.module'
import { ProviderController } from '../controllers/provider.controller'

@Module({
    imports: [MongoModelsModule, CryptoModule, TokenModule, UUIDModule],
    controllers: [ProviderController],
})
export class ProviderModule {}
