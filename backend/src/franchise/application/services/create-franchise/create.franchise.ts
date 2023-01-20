import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { ImageStorage } from 'src/core/application/storage/images/image.storage'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { Franchise } from 'src/franchise/domain/franchise'
import { FranchiseGroupId } from 'src/franchise/domain/value-objects/franchise.group.id'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { FranchiseImage } from 'src/franchise/domain/value-objects/franchise.image'
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
        private imageStorage: ImageStorage,
    ) {}

    async execute(data: CreateFranchiseDTO): Promise<CreateFranchiseResponse> {
        const image = await this.imageStorage.save({
            path: data.image,
        })
        const franchise = Franchise.create(
            FranchiseId.create(this.uuidGenerator.generate()),
            FranchiseName.create(data.name),
            FranchiseRif.create(data.rif),
            FranchiseGroupId.create(this.uuidGenerator.generate()),
            FranchiseImage.create(image.url),
        )
        await this.franchiseRepository.save(franchise)
        this.eventHandler.publish(franchise.pullEvents())
        return {
            name: franchise.name.value,
            id: franchise.id.value,
            image: franchise.image.value,
        }
    }
}
