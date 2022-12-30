import { Module } from '@nestjs/common'
import { ChatGatewayModule } from 'src/chat/infraestructure/modules/chat.gateway.module'

@Module({
    imports: [ChatGatewayModule],
})
export class GatewayModule {}
