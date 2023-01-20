import { EventHandler } from 'src/core/application/event-handler/event.handler'
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
    constructor(
        private franchiseRepository: FranchiseRepository,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: UpdateNameDTO): Promise<UpdateNameResponse> {
        const franchise = await this.franchiseRepository.searchById(
            FranchiseId.create(data.id),
        )
        if (!franchise) throw new FranchiseNotFoundException()
        franchise.changeName(FranchiseName.create(data.name))
        await this.franchiseRepository.save(franchise)
        this.eventHandler.publish(franchise.pullEvents())
        return {
            id: franchise.id.value,
        }
    }
}
