import { ApplicationService } from 'src/core/application/service/application.service'
import { PetitionId } from 'src/petition/domain/value-objects/petition.id'
import { PetitionNotFoundException } from '../../exceptions/petition.not.found'
import { PetitionRepository } from '../../repositories/petition.repository'
import { DeletePetitionDTO } from './types/delete.petition.dto'
import { DeletePetitionResponse } from './types/delete.petition.response'

export class DeletePetitionApplicationService
    implements ApplicationService<DeletePetitionDTO, DeletePetitionResponse>
{
    constructor(private petitionRepository: PetitionRepository) {}

    async execute(data: DeletePetitionDTO): Promise<DeletePetitionResponse> {
        const petition = await this.petitionRepository.searchById(
            new PetitionId(data.id),
        )
        if (!petition) throw new PetitionNotFoundException()
        await this.petitionRepository.delete(petition)
        return {
            id: petition.id.value,
        }
    }
}
