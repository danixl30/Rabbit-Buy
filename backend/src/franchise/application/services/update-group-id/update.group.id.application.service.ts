import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { FranchiseGroupId } from 'src/franchise/domain/value-objects/franchise.group.id'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { FranchiseNotFoundException } from '../../exceptions/franchise.not.found'
import { FranchiseRepository } from '../../repositories/franchise.repository'
import { UpdateGroudIdDTO } from './types/update.group.id.dto'
import { UpdateGroudIdResponse } from './types/update.group.id.response'

export class UpdateGroudIdApplicationService
    implements ApplicationService<UpdateGroudIdDTO, UpdateGroudIdResponse>
{
    constructor(
        private franchiseRepository: FranchiseRepository,
        private uuidGenerator: UUIDGenerator,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: UpdateGroudIdDTO): Promise<UpdateGroudIdResponse> {
        const resp = await this.franchiseRepository.searchById(
            new FranchiseId(data.id),
        )
        if (!resp) throw new FranchiseNotFoundException()
        resp.changeGroupId(new FranchiseGroupId(this.uuidGenerator.generate()))
        await this.franchiseRepository.save(resp)
        this.eventHandler.publish(resp.pullEvents())
        return {
            groupId: resp.groupId.value,
        }
    }
}
