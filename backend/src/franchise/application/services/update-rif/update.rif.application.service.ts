import { ApplicationService } from 'src/core/application/service/application.service'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { FranchiseRif } from 'src/franchise/domain/value-objects/franchise.rif'
import { FranchiseNotFoundException } from '../../exceptions/franchise.not.found'
import { FranchiseRepository } from '../../repositories/franchise.repository'
import { UpdateRifDTO } from './types/update.rif.dto'
import { UpdateRifResponse } from './types/update.rif.response'

export class UpdateRifApplicationService
    implements ApplicationService<UpdateRifDTO, UpdateRifResponse>
{
    constructor(private franchiseRepository: FranchiseRepository) {}

    async execute(data: UpdateRifDTO): Promise<UpdateRifResponse> {
        const franchise = await this.franchiseRepository.searchById(
            new FranchiseId(data.id),
        )
        if (!franchise) throw new FranchiseNotFoundException()
        franchise.changeRif(new FranchiseRif(data.rif))
        await this.franchiseRepository.save(franchise)
        return {
            id: franchise.id.value,
            rif: franchise.rif.value,
        }
    }
}
