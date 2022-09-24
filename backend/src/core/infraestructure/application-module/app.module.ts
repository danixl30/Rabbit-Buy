import { Module } from '@nestjs/common'
import { ControllersModule } from '../controllers/controllers.module'
import { CryptoModule } from '../crypto/crypto.module'
import { DatabaseConnectionModule } from '../database/database.connection.module'
import { EventHandlerModule } from '../event-handler/event.handler.module'
import { RateLimitModule } from '../rate-limit/rate.limit.module'
import { TokenModule } from '../token/token.module'

@Module({
    imports: [
        RateLimitModule,
        DatabaseConnectionModule,
        ControllersModule,
        CryptoModule,
        TokenModule,
        EventHandlerModule,
    ],
})
export class AppModule {}
