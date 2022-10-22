import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import {
    Franchise,
    FranchiseSchema,
} from 'src/franchise/infraestructure/models/franchise.model'
import { FranchiseMongoRepository } from 'src/franchise/infraestructure/repositories/franchise.mongo.repository'
import {
    Petition,
    PetitionSchema,
} from 'src/petition/infraestructure/models/petition.model'
import { PetitionMongoRepository } from 'src/petition/infraestructure/repositories/petition.mongo.repository'
import {
    Product,
    ProductSchema,
} from 'src/product/infraestructure/models/product.model'
import { ProductMongoRepository } from 'src/product/infraestructure/repositories/product.mongo.repository'
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
            { name: Product.name, schema: ProductSchema },
            { name: Petition.name, schema: PetitionSchema },
        ]),
    ],
    providers: [
        UserMongoRepository,
        ProviderMongoRepository,
        FranchiseMongoRepository,
        ProductMongoRepository,
        PetitionMongoRepository,
    ],
    exports: [
        UserMongoRepository,
        ProviderMongoRepository,
        FranchiseMongoRepository,
        ProductMongoRepository,
        PetitionMongoRepository,
    ],
})
export class MongoModelsModule {}
