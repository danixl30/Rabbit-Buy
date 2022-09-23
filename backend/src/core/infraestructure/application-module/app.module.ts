import { Module } from '@nestjs/common'
import { DatabaseConnectionModule } from '../database/database.connection.module'
import { RateLimitModule } from '../rate-limit/rate.limit.module'

@Module({
    imports: [RateLimitModule, DatabaseConnectionModule],
})
export class AppModule {}
