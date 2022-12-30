import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import {
    Category,
    CategorySchema,
} from 'src/category/infraestructure/models/category.model'
import { CategoryMongoRepository } from 'src/category/infraestructure/repositories/category.mongo.repository'
import { Chat, ChatSchema } from 'src/chat/infraestructure/models/chat.model'
import {
    Message,
    MessageSchema,
} from 'src/chat/infraestructure/models/message.model'
import { ChatMongoRepository } from 'src/chat/infraestructure/repositories/chat.mongo.repository'
import { MessageMongoRepository } from 'src/chat/infraestructure/repositories/message.mongo.repository'
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
import { CriteriaMongoTransformer } from '../../criteria-transformer/mongo/crietia.mongo.transformer'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Franchise.name, schema: FranchiseSchema },
            { name: Provider.name, schema: ProviderSchema },
            { name: Product.name, schema: ProductSchema },
            { name: Petition.name, schema: PetitionSchema },
            { name: Category.name, schema: CategorySchema },
            { name: Message.name, schema: MessageSchema },
            { name: Chat.name, schema: ChatSchema },
        ]),
    ],
    providers: [
        CriteriaMongoTransformer,
        UserMongoRepository,
        ProviderMongoRepository,
        FranchiseMongoRepository,
        ProductMongoRepository,
        PetitionMongoRepository,
        CategoryMongoRepository,
        MessageMongoRepository,
        ChatMongoRepository,
    ],
    exports: [
        UserMongoRepository,
        ProviderMongoRepository,
        FranchiseMongoRepository,
        ProductMongoRepository,
        PetitionMongoRepository,
        CategoryMongoRepository,
        MessageMongoRepository,
        ChatMongoRepository,
    ],
})
export class MongoModelsModule {}
