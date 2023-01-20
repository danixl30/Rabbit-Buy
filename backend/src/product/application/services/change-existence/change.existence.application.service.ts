import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { ProductExistence } from 'src/product/domain/value-objects/product.existence'
import { ProductId } from 'src/product/domain/value-objects/product.id'
import { ProductNotFoundException } from '../../exceptions/product.not.found'
import { ProductRepository } from '../../repositories/product.repository'
import { ChangeProductExistenceDTO } from './types/change.existence.dto'
import { ChangeProductExistenceResponse } from './types/change.existence.response'

export class ChangeProductExistenceApplicationService
    implements
        ApplicationService<
            ChangeProductExistenceDTO,
            ChangeProductExistenceResponse
        >
{
    constructor(
        private productRepository: ProductRepository,
        private eventHandler: EventHandler,
    ) {}

    async execute(
        data: ChangeProductExistenceDTO,
    ): Promise<ChangeProductExistenceResponse> {
        const product = await this.productRepository.searchById(
            ProductId.create(data.id),
        )
        if (!product) throw new ProductNotFoundException()
        product.changeExistence(ProductExistence.create(data.existence))
        await this.productRepository.save(product)
        this.eventHandler.publish(product.pullEvents())
        return {
            id: product.id.value,
        }
    }
}
