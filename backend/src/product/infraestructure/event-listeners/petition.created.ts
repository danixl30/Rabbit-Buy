import { Injectable } from '@nestjs/common'
import { ExceptionDecorator } from 'src/core/application/decorators/exception.decorator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { ConcreteExceptionReductor } from 'src/core/infraestructure/exception/exception.reductor'
import { PetitionCreatedEvent } from 'src/petition/domain/events/petition.created'
import { PetitionMongoRepository } from 'src/petition/infraestructure/repositories/petition.mongo.repository'
import { BuyProductApplicationService } from 'src/product/application/services/buy-product/buy.product.application.service'
import { ProductMongoRepository } from '../repositories/product.mongo.repository'

@Injectable()
export class PetitionCreatedEventListener {
    constructor(
        private productRepository: ProductMongoRepository,
        private petitionRepository: PetitionMongoRepository,
        private eventHandler: EventHandlerNative,
    ) {
        this.execute()
    }

    execute() {
        this.eventHandler.subscribe(
            PetitionCreatedEvent.eventName,
            async (event: PetitionCreatedEvent) => {
                try {
                    await new ExceptionDecorator(
                        new BuyProductApplicationService(
                            this.productRepository,
                            this.petitionRepository,
                            this.eventHandler,
                        ),
                        new ConcreteExceptionReductor(),
                    ).execute({
                        quantity: event.quantity.value,
                        id: event.product.value.value,
                        petition: event.id.value,
                    })
                } catch (e) {
                    console.log(e.message)
                }
            },
        )
    }
}
