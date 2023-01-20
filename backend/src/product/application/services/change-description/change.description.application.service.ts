import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { ProductDescription } from 'src/product/domain/value-objects/product.description'
import { ProductId } from 'src/product/domain/value-objects/product.id'
import { ProductNotFoundException } from '../../exceptions/product.not.found'
import { ProductRepository } from '../../repositories/product.repository'
import { ChangeProductDescriptionDTO } from './types/change.description.dto'
import { ChangeProductDescriptionResponse } from './types/change.description.response'

export class ChangeProductDescriptionApplicationService
    implements
        ApplicationService<
            ChangeProductDescriptionDTO,
            ChangeProductDescriptionResponse
        >
{
    constructor(
        private productRepository: ProductRepository,
        private eventHandler: EventHandler,
    ) {}

    async execute(
        data: ChangeProductDescriptionDTO,
    ): Promise<ChangeProductDescriptionResponse> {
        const product = await this.productRepository.searchById(
            ProductId.create(data.id),
        )
        if (!product) throw new ProductNotFoundException()
        product.changeDescription(ProductDescription.create(data.description))
        await this.productRepository.save(product)
        this.eventHandler.publish(product.pullEvents())
        return {
            id: product.id.value,
        }
    }
}
