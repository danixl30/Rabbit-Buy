import { Module } from '@nestjs/common'
import { MongoModelsModule } from 'src/core/infraestructure/models/mongo/models.mongo.module'
import { TokenModule } from 'src/core/infraestructure/token/token.module'
import { UUIDModule } from 'src/core/infraestructure/UUID/module/UUID.module'
import { PetitionController } from '../controllers/petition.controller'

@Module({
    imports: [MongoModelsModule, UUIDModule, TokenModule],
    controllers: [PetitionController],
})
export class PetitionModule {}
