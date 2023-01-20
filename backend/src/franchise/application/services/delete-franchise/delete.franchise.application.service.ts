import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { FranchiseNotFoundException } from '../../exceptions/franchise.not.found'
import { FranchiseRepository } from '../../repositories/franchise.repository'
import { DeleteFranchiseDTO } from './types/delete.franchise.dto'
import { DeleteFranchiseResponse } from './types/delete.franchise.response'

export class DeleteFranchiseApplicationService
    implements ApplicationService<DeleteFranchiseDTO, DeleteFranchiseResponse>
{
    constructor(
        private franchiseRepository: FranchiseRepository,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: DeleteFranchiseDTO): Promise<DeleteFranchiseResponse> {
        const franchise = await this.franchiseRepository.searchById(
            FranchiseId.create(data.id),
        )
        if (!franchise) throw new FranchiseNotFoundException()
        franchise.delete()
        await this.franchiseRepository.delete(franchise)
        this.eventHandler.publish(franchise.pullEvents())
        return {
            id: franchise.id.value,
        }
    }
}
