import { Module } from '@nestjs/common'
import { MongoConnectionModule } from './MongoDB/connection/mongo.connection.module'

@Module({
    imports: [MongoConnectionModule],
})
export class DatabaseConnectionModule {}
