import { Module } from '@nestjs/common'
import { RateLimitModule } from './core/infraestructure/rate-limit/rate.limit.module'

@Module({
    imports: [RateLimitModule],
})
export class AppModule {}
