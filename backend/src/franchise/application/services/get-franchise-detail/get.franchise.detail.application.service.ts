import { ApplicationService } from 'src/core/application/service/application.service'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { FranchiseNotFoundException } from '../../exceptions/franchise.not.found'
import { FranchiseRepository } from '../../repositories/franchise.repository'
import { GetFranchiseDetailDTO } from './types/get.franchise.detail.dto'
import { GetFranchiseDetailResponse } from './types/get.franchise.detail.response'

export class GetFranchiseDetailApplicationService
    implements
        ApplicationService<GetFranchiseDetailDTO, GetFranchiseDetailResponse>
{
    constructor(private franchiseRepository: FranchiseRepository) {}

    async execute(
        data: GetFranchiseDetailDTO,
    ): Promise<GetFranchiseDetailResponse> {
        const franchise = await this.franchiseRepository.searchById(
            new FranchiseId(data.id),
        )
        if (!franchise) throw new FranchiseNotFoundException()
        return {
            id: franchise.id.value,
            name: franchise.name.value,
            rif: franchise.rif.value,
            groupId: franchise.groupId.value,
            image: franchise.image.value,
        }
    }
}
