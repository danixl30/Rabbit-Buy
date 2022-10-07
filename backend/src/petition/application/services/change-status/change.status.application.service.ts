import { ApplicationService } from 'src/core/application/service/application.service'
import { PetitionId } from 'src/petition/domain/value-objects/petition.id'
import { Status } from 'src/petition/domain/value-objects/status'
import { PetitionNotFoundException } from '../../exceptions/petition.not.found'
import { PetitionRepository } from '../../repositories/petition.repository'
import { ChangePetitionStatusDTO } from './types/change.status.dto'
import { ChangePetitionStatusResponse } from './types/change.status.response'

export class ChangePetitionStatusApplicationService
    implements
        ApplicationService<
            ChangePetitionStatusDTO,
            ChangePetitionStatusResponse
        >
{
    constructor(private petitionRepository: PetitionRepository) {}

    async execute(
        data: ChangePetitionStatusDTO,
    ): Promise<ChangePetitionStatusResponse> {
        const petition = await this.petitionRepository.searchById(
            new PetitionId(data.id),
        )
        if (!petition) throw new PetitionNotFoundException()
        petition.changeStatus(new Status(data.status))
        await this.petitionRepository.save(petition)
        return {
            id: petition.id.value,
        }
    }
}
