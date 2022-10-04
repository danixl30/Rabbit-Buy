import { ApplicationService } from 'src/core/application/service/application.service'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { FranchiseName } from 'src/franchise/domain/value-objects/franchise.name'
import { FranchiseNotFoundException } from '../../exceptions/franchise.not.found'
import { FranchiseRepository } from '../../repositories/franchise.repository'
import { UpdateNameDTO } from './types/update.name.dto'
import { UpdateNameResponse } from './types/update.name.response'

export class UpdateNameApplicationService
    implements ApplicationService<UpdateNameDTO, UpdateNameResponse>
{
    constructor(private franchiseRepository: FranchiseRepository) {}

    async execute(data: UpdateNameDTO): Promise<UpdateNameResponse> {
        const franchise = await this.franchiseRepository.searchById(
            new FranchiseId(data.id),
        )
        if (!franchise) throw new FranchiseNotFoundException()
        franchise.changeName(new FranchiseName(data.name))
        await this.franchiseRepository.save(franchise)
        return {
            id: franchise.id.value,
        }
    }
}
