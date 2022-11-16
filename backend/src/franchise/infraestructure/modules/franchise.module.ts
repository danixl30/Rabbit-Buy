import { Module } from '@nestjs/common'
import { FileManagerModule } from 'src/core/infraestructure/files/file.manager.module'
import { MongoModelsModule } from 'src/core/infraestructure/models/mongo/models.mongo.module'
import { StorageModule } from 'src/core/infraestructure/storage/storage.module'
import { TokenModule } from 'src/core/infraestructure/token/token.module'
import { UUIDModule } from 'src/core/infraestructure/UUID/module/UUID.module'
import { FranchiseController } from '../controllers/franchise.controller'

@Module({
    controllers: [FranchiseController],
    imports: [
        UUIDModule,
        MongoModelsModule,
        TokenModule,
        FileManagerModule,
        StorageModule,
    ],
})
export class FranchiseModule {}
