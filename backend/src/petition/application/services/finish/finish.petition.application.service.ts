import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { PetitionId } from 'src/petition/domain/value-objects/petition.id'
import { PetitionNotFoundException } from '../../exceptions/petition.not.found'
import { PetitionRepository } from '../../repositories/petition.repository'
import { FinishPetitionDTO } from './type/dto'
import { FinishPetitionResponse } from './type/response'

export class FinishPetitionApplicationService
    implements ApplicationService<FinishPetitionDTO, FinishPetitionResponse>
{
    constructor(
        private petitionRepository: PetitionRepository,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: FinishPetitionDTO): Promise<FinishPetitionDTO> {
        const petition = await this.petitionRepository.searchById(
            new PetitionId(data.id),
        )
        if (!petition) throw new PetitionNotFoundException()
        petition.finish()
        await this.petitionRepository.save(petition)
        this.eventHandler.publish(
            petition.pullEvents().filter((_, index) => index > 0),
        )
        return {
            id: data.id,
        }
    }
}
