import { Injectable } from '@nestjs/common'
import { ExceptionDecorator } from 'src/core/application/decorators/exception.decorator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { ConcreteExceptionReductor } from 'src/core/infraestructure/exception/exception.reductor'
import { FranchiseDeletedEvent } from 'src/franchise/domain/events/franchise.deleted'
import { DeletePetitionsByFranchiseApplicationService } from 'src/petition/application/services/delete-by-franchise/delete.petitions.franchise.application.service'
import { PetitionMongoRepository } from '../repositories/petition.mongo.repository'

@Injectable()
export class FranchiseDeletedEventListener {
    constructor(
        private petitionRepository: PetitionMongoRepository,
        private eventHnadler: EventHandlerNative,
    ) {
        this.execute()
    }

    execute() {
        this.eventHnadler.subscribe(
            FranchiseDeletedEvent.eventName,
            async (event: FranchiseDeletedEvent) => {
                await new ExceptionDecorator(
                    new DeletePetitionsByFranchiseApplicationService(
                        this.petitionRepository,
                        this.eventHnadler,
                    ),
                    new ConcreteExceptionReductor(),
                ).execute({ franchise: event.id.value })
            },
        )
    }
}
