import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { PetitionId } from 'src/petition/domain/value-objects/petition.id'
import { PetitionNotFoundException } from '../../exceptions/petition.not.found'
import { PetitionRepository } from '../../repositories/petition.repository'
import { SuspendPetitionDTO } from './types/dto'
import { SuspendPetitionResponse } from './types/response'

export class SuspendPetitionApplicationService
    implements ApplicationService<SuspendPetitionDTO, SuspendPetitionResponse>
{
    constructor(
        private petitionRepository: PetitionRepository,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: SuspendPetitionDTO): Promise<SuspendPetitionDTO> {
        const petition = await this.petitionRepository.searchById(
            PetitionId.create(data.id),
        )
        if (!petition) throw new PetitionNotFoundException()
        petition.suspend()
        await this.petitionRepository.save(petition)
        this.eventHandler.publish(petition.pullEvents())
        return {
            id: data.id,
        }
    }
}
