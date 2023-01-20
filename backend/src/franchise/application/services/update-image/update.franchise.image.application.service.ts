import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { ImageStorage } from 'src/core/application/storage/images/image.storage'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { FranchiseImage } from 'src/franchise/domain/value-objects/franchise.image'
import { FranchiseNotFoundException } from '../../exceptions/franchise.not.found'
import { FranchiseRepository } from '../../repositories/franchise.repository'
import { UpdateFranchiseImageDTO } from './types/dto'
import { UpdateFranchiseImageResponse } from './types/response'

export class UpdateFranchiseImageApplicationService
    implements
        ApplicationService<
            UpdateFranchiseImageDTO,
            UpdateFranchiseImageResponse
        >
{
    constructor(
        private franchiseRepository: FranchiseRepository,
        private imageStorage: ImageStorage,
        private eventHandler: EventHandler,
    ) {}

    async execute(
        data: UpdateFranchiseImageDTO,
    ): Promise<UpdateFranchiseImageResponse> {
        const franchise = await this.franchiseRepository.searchById(
            FranchiseId.create(data.id),
        )
        if (!franchise) throw new FranchiseNotFoundException()
        await this.imageStorage.delete({
            url: franchise.image.value,
        })
        const newImage = await this.imageStorage.save({
            path: data.path,
        })
        franchise.changeImage(FranchiseImage.create(newImage.url))
        await this.franchiseRepository.save(franchise)
        this.eventHandler.publish(franchise.pullEvents())
        return {
            id: franchise.id.value,
        }
    }
}
