import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import {
    Franchise,
    FranchiseSchema,
} from 'src/franchise/infraestructure/models/franchise.model'
import { FranchiseMongoRepository } from 'src/franchise/infraestructure/repositories/franchise.mongo.repository'
import {
    Provider,
    ProviderSchema,
} from 'src/provider/infraestructure/models/provider.model'
import { ProviderMongoRepository } from 'src/provider/infraestructure/repositories/provider.mongo.repository'
import { User, UserSchema } from 'src/user/infraestructure/models/user.model'
import { UserMongoRepository } from 'src/user/infraestructure/repositories/user.mongo.repository'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Franchise.name, schema: FranchiseSchema },
            { name: Provider.name, schema: ProviderSchema },
        ]),
    ],
    providers: [
        UserMongoRepository,
        ProviderMongoRepository,
        FranchiseMongoRepository,
    ],
    exports: [
        UserMongoRepository,
        ProviderMongoRepository,
        FranchiseMongoRepository,
    ],
})
export class MongoModelsModule {}
