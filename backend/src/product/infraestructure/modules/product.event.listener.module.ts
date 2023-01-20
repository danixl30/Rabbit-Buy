import { Module } from '@nestjs/common'
import { MongoModelsModule } from 'src/core/infraestructure/models/mongo/models.mongo.module'
import { CloudinaryImageModule } from 'src/core/infraestructure/storage/image-cloudinary/module/cloudinary.image.module'
import { FranchiseDeletedEventListener } from '../event-listeners/franchise.deleted'
import { PetitionCancelledEventListener } from '../event-listeners/petition.cancelled'
import { PetitionCreatedEventListener } from '../event-listeners/petition.created'

@Module({
    imports: [MongoModelsModule, CloudinaryImageModule],
    providers: [
        PetitionCreatedEventListener,
        FranchiseDeletedEventListener,
        PetitionCancelledEventListener,
    ],
})
export class ProductEventListener {}
