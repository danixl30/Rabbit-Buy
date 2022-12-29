import { Module } from '@nestjs/common'
import { MongoModelsModule } from 'src/core/infraestructure/models/mongo/models.mongo.module'
import { JwtProviderModule } from 'src/core/infraestructure/token/jwt/module/jwt.provider.module'
import { UUIDModule } from 'src/core/infraestructure/UUID/module/UUID.module'
import { CategoryController } from '../controllers/category.controller'

@Module({
    controllers: [CategoryController],
    imports: [MongoModelsModule, UUIDModule, JwtProviderModule],
})
export class CategoryControllersModule {}
