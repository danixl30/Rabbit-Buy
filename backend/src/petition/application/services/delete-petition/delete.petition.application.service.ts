import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { PetitionId } from 'src/petition/domain/value-objects/petition.id'
import { PetitionNotFoundException } from '../../exceptions/petition.not.found'
import { PetitionRepository } from '../../repositories/petition.repository'
import { DeletePetitionDTO } from './types/delete.petition.dto'
import { DeletePetitionResponse } from './types/delete.petition.response'

export class DeletePetitionApplicationService
    implements ApplicationService<DeletePetitionDTO, DeletePetitionResponse>
{
    constructor(
        private petitionRepository: PetitionRepository,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: DeletePetitionDTO): Promise<DeletePetitionResponse> {
        const petition = await this.petitionRepository.searchById(
            PetitionId.create(data.id),
        )
        if (!petition) throw new PetitionNotFoundException()
        petition.delete()
        await this.petitionRepository.delete(petition)
        this.eventHandler.publish(petition.pullEvents())
        return {
            id: petition.id.value,
        }
    }
}
