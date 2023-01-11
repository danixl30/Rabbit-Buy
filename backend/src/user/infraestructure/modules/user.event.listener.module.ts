import { Module } from '@nestjs/common'
import { MongoModelsModule } from 'src/core/infraestructure/models/mongo/models.mongo.module'
import { ProviderDeletedEventListener } from '../event-listeners/provider.deleted'

@Module({
    imports: [MongoModelsModule],
    providers: [ProviderDeletedEventListener],
})
export class UserEventListenerModule {}
