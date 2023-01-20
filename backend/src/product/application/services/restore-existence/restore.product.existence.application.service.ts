import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { PetitionRepository } from 'src/petition/application/repositories/petition.repository'
import { PetitionId } from 'src/petition/domain/value-objects/petition.id'
import { ProductExistence } from 'src/product/domain/value-objects/product.existence'
import { ProductRepository } from '../../repositories/product.repository'
import { RestoreProductExistenceDTO } from './types/dto'

export class RestoreProductExistenceApplicationService
    implements ApplicationService<RestoreProductExistenceDTO, void>
{
    constructor(
        private petitionRepository: PetitionRepository,
        private productRepository: ProductRepository,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: RestoreProductExistenceDTO): Promise<void> {
        const petition = await this.petitionRepository.searchById(
            PetitionId.create(data.petition),
        )
        const product = await this.productRepository.searchById(
            petition.product.value,
        )
        product.changeExistence(
            product.existence.plus(
                ProductExistence.create(petition.quantity.value),
            ),
        )
        await this.productRepository.save(product)
        this.eventHandler.publish(product.pullEvents())
    }
}
