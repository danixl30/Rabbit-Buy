import { ApplicationService } from 'src/core/application/service/application.service'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { FranchiseNotFoundException } from '../../exceptions/franchise.not.found'
import { FranchiseRepository } from '../../repositories/franchise.repository'
import { DeleteFranchiseDTO } from './types/delete.franchise.dto'
import { DeleteFranchiseResponse } from './types/delete.franchise.response'

export class DeleteFranchiseApplicationService
    implements ApplicationService<DeleteFranchiseDTO, DeleteFranchiseResponse>
{
    constructor(private franchiseRepository: FranchiseRepository) {}

    async execute(data: DeleteFranchiseDTO): Promise<DeleteFranchiseResponse> {
        const franchise = await this.franchiseRepository.searchById(
            new FranchiseId(data.id),
        )
        if (!franchise) throw new FranchiseNotFoundException()
        await this.franchiseRepository.delete(franchise)
        return {
            id: franchise.id.value,
        }
    }
}
