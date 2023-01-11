import { Injectable } from '@nestjs/common'
import { ExceptionDecorator } from 'src/core/application/decorators/exception.decorator'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { ConcreteExceptionReductor } from 'src/core/infraestructure/exception/exception.reductor'
import { FranchiseDeletedEvent } from 'src/franchise/domain/events/franchise.deleted'
import { DeleteProductsByFranchiseApplicationService } from 'src/product/application/services/delete-products-franchise/delete.products.franchise.application.service'
import { ProductMongoRepository } from '../repositories/product.mongo.repository'

@Injectable()
export class FranchiseDeletedEventListener {
    constructor(
        private productRepository: ProductMongoRepository,
        private eventHnadler: EventHandlerNative,
    ) {
        this.execute()
    }

    execute() {
        this.eventHnadler.subscribe(
            FranchiseDeletedEvent.eventName,
            async (event: FranchiseDeletedEvent) => {
                await new ExceptionDecorator(
                    new DeleteProductsByFranchiseApplicationService(
                        this.productRepository,
                        this.eventHnadler,
                    ),
                    new ConcreteExceptionReductor(),
                ).execute({ franchise: event.id.value })
            },
        )
    }
}
