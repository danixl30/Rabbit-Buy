import { Module } from '@nestjs/common'
import { ControllersModule } from '../controllers/controllers.module'
import { DatabaseConnectionModule } from '../database/database.connection.module'
import { EventHandlerModule } from '../event-handler/event.handler.module'
import { FileUpploaderModule } from '../file-upploader/file.upploader.module'
import { RateLimitModule } from '../rate-limit/rate.limit.module'

@Module({
    imports: [
        RateLimitModule,
        DatabaseConnectionModule,
        ControllersModule,
        EventHandlerModule,
        FileUpploaderModule,
    ],
})
export class AppModule {}
