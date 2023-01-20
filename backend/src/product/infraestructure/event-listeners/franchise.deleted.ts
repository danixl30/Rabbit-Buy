import { Injectable } from '@nestjs/common'
import { ExceptionDecorator } from 'src/core/application/decorators/exception.decorator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { ConcreteExceptionReductor } from 'src/core/infraestructure/exception/exception.reductor'
import { CloudinaryImageStorage } from 'src/core/infraestructure/storage/image-cloudinary/service/cloudinary.service'
import { FranchiseDeletedEvent } from 'src/franchise/domain/events/franchise.deleted'
import { DeleteProductsByFranchiseApplicationService } from 'src/product/application/services/delete-products-franchise/delete.products.franchise.application.service'
import { ProductMongoRepository } from '../repositories/product.mongo.repository'

@Injectable()
export class FranchiseDeletedEventListener {
    constructor(
        private productRepository: ProductMongoRepository,
        private imageStorage: CloudinaryImageStorage,
        private eventHandler: EventHandlerNative,
    ) {
        this.execute()
    }

    execute() {
        this.eventHandler.subscribe(
            FranchiseDeletedEvent.eventName,
            async (event: FranchiseDeletedEvent) => {
                await new ExceptionDecorator(
                    new DeleteProductsByFranchiseApplicationService(
                        this.productRepository,
                        this.imageStorage,
                        this.eventHandler,
                    ),
                    new ConcreteExceptionReductor(),
                ).execute({ franchise: event.id.value })
            },
        )
    }
}
