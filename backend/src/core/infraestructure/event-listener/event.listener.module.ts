import { Module } from '@nestjs/common'
import { ProductEventListener } from 'src/product/infraestructure/modules/product.event.listener.module'

@Module({
    imports: [ProductEventListener],
})
export class EventListenerModule {}
