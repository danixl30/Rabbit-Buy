import { Injectable } from '@nestjs/common'
import { ExceptionDecorator } from 'src/core/application/decorators/exception.decorator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { ConcreteExceptionReductor } from 'src/core/infraestructure/exception/exception.reductor'
import { PetitionCancelledEvent } from 'src/petition/domain/events/petition.cancelled'
import { PetitionMongoRepository } from 'src/petition/infraestructure/repositories/petition.mongo.repository'
import { RestoreProductExistenceApplicationService } from 'src/product/application/services/restore-existence/restore.product.existence.application.service'
import { ProductMongoRepository } from '../repositories/product.mongo.repository'

@Injectable()
export class PetitionCancelledEventListener {
    constructor(
        private petitionRepository: PetitionMongoRepository,
        private productRepository: ProductMongoRepository,
        private eventHandler: EventHandlerNative,
    ) {
        this.execute()
    }

    execute() {
        this.eventHandler.subscribe(
            PetitionCancelledEvent.eventName,
            async (event: PetitionCancelledEvent) => {
                await new ExceptionDecorator(
                    new RestoreProductExistenceApplicationService(
                        this.petitionRepository,
                        this.productRepository,
                        this.eventHandler,
                    ),
                    new ConcreteExceptionReductor(),
                ).execute({ petition: event.id.value })
            },
        )
    }
}
