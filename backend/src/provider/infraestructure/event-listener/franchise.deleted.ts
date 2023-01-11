import { Injectable } from '@nestjs/common'
import { ExceptionDecorator } from 'src/core/application/decorators/exception.decorator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { ConcreteExceptionReductor } from 'src/core/infraestructure/exception/exception.reductor'
import { FranchiseDeletedEvent } from 'src/franchise/domain/events/franchise.deleted'
import { DeleteProvidersByFranchiseApplicationService } from 'src/provider/application/services/delete-by-franchise/delete.providers.application.service'
import { ProviderMongoRepository } from '../repositories/provider.mongo.repository'

@Injectable()
export class FranchiseDeletedEventListener {
    constructor(
        private providerRepository: ProviderMongoRepository,
        private eventHnadler: EventHandlerNative,
    ) {
        this.execute()
    }

    execute() {
        this.eventHnadler.subscribe(
            FranchiseDeletedEvent.eventName,
            async (event: FranchiseDeletedEvent) => {
                await new ExceptionDecorator(
                    new DeleteProvidersByFranchiseApplicationService(
                        this.providerRepository,
                        this.eventHnadler,
                    ),
                    new ConcreteExceptionReductor(),
                ).execute({ franchise: event.id.value })
            },
        )
    }
}
