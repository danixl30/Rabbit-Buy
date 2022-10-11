import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { Franchise } from 'src/franchise/domain/franchise'
import { FranchiseGroupId } from 'src/franchise/domain/value-objects/franchise.group.id'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { FranchiseName } from 'src/franchise/domain/value-objects/franchise.name'
import { FranchiseRif } from 'src/franchise/domain/value-objects/franchise.rif'
import { FranchiseRepository } from '../../repositories/franchise.repository'
import { CreateFranchiseDTO } from './types/create.franchise.dto'
import { CreateFranchiseResponse } from './types/create.franchise.response'

export class CreateFranchiseApplicationService
    implements ApplicationService<CreateFranchiseDTO, CreateFranchiseResponse>
{
    constructor(
        private franchiseRepository: FranchiseRepository,
        private uuidGenerator: UUIDGenerator,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: CreateFranchiseDTO): Promise<CreateFranchiseResponse> {
        const franchise = new Franchise(
            new FranchiseId(this.uuidGenerator.generate()),
            new FranchiseName(data.name),
            new FranchiseRif(data.rif),
            new FranchiseGroupId(this.uuidGenerator.generate()),
        )
        await this.franchiseRepository.save(franchise)
        this.eventHandler.publish(franchise.pullEvents())
        return {
            name: franchise.name.value,
            id: franchise.id.value,
        }
    }
}
