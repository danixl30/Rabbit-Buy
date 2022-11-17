import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { PetitionId } from 'src/petition/domain/value-objects/petition.id'
import { PetitionNotFoundException } from '../../exceptions/petition.not.found'
import { PetitionRepository } from '../../repositories/petition.repository'
import { ConfirmPetitionDTO } from './types/dto'
import { ConfirmPetitionResponse } from './types/response'

export class ConfirmPetitionApplicationService
    implements ApplicationService<ConfirmPetitionDTO, ConfirmPetitionResponse>
{
    constructor(
        private petitionRepository: PetitionRepository,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: ConfirmPetitionDTO): Promise<ConfirmPetitionDTO> {
        const petition = await this.petitionRepository.searchById(
            new PetitionId(data.id),
        )
        if (!petition) throw new PetitionNotFoundException()
        petition.confirm()
        await this.petitionRepository.save(petition)
        this.eventHandler.publish(petition.pullEvents())
        return {
            id: data.id,
        }
    }
}
