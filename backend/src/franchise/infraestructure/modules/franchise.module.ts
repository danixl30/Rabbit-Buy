import { Module } from '@nestjs/common'
import { MongoModelsModule } from 'src/core/infraestructure/models/mongo/models.mongo.module'
import { TokenModule } from 'src/core/infraestructure/token/token.module'
import { UUIDModule } from 'src/core/infraestructure/UUID/module/UUID.module'
import { FranchiseController } from '../controllers/franchise.controller'

@Module({
    controllers: [FranchiseController],
    imports: [UUIDModule, MongoModelsModule, TokenModule],
})
export class FranchiseModule {}
