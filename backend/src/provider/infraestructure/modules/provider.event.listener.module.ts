import { Module } from '@nestjs/common'
import { MongoModelsModule } from 'src/core/infraestructure/models/mongo/models.mongo.module'
import { FranchiseDeletedEventListener } from '../event-listener/franchise.deleted'

@Module({
    imports: [MongoModelsModule],
    providers: [FranchiseDeletedEventListener],
})
export class ProviderEventListenerModule {}
