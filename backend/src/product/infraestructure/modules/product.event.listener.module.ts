import { Module } from '@nestjs/common'
import { MongoModelsModule } from 'src/core/infraestructure/models/mongo/models.mongo.module'
import { PetitionCreatedEventListener } from '../event-listeners/petition.created'

@Module({
    imports: [MongoModelsModule],
    providers: [PetitionCreatedEventListener],
})
export class ProductEventListener {}
