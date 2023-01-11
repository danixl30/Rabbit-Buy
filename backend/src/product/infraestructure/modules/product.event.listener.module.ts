import { Module } from '@nestjs/common'
import { MongoModelsModule } from 'src/core/infraestructure/models/mongo/models.mongo.module'
import { FranchiseDeletedEventListener } from '../event-listeners/franchise.deleted'
import { PetitionCreatedEventListener } from '../event-listeners/petition.created'

@Module({
    imports: [MongoModelsModule],
    providers: [PetitionCreatedEventListener, FranchiseDeletedEventListener],
})
export class ProductEventListener {}
