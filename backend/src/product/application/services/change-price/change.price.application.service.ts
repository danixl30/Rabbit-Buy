import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { ProductId } from 'src/product/domain/value-objects/product.id'
import { ProductPrice } from 'src/product/domain/value-objects/product.price'
import { ProductNotFoundException } from '../../exceptions/product.not.found'
import { ProductRepository } from '../../repositories/product.repository'
import { ChangeProductPriceDTO } from './types/change.price.dto'
import { ChangeProductPriceResponse } from './types/change.price.response'

export class ChangeProductPriceApplicationService
    implements
        ApplicationService<ChangeProductPriceDTO, ChangeProductPriceResponse>
{
    constructor(
        private productRepository: ProductRepository,
        private eventHandler: EventHandler,
    ) {}

    async execute(
        data: ChangeProductPriceDTO,
    ): Promise<ChangeProductPriceResponse> {
        const product = await this.productRepository.searchById(
            new ProductId(data.id),
        )
        if (!product) throw new ProductNotFoundException()
        product.changePrice(new ProductPrice(data.price))
        await this.productRepository.save(product)
        this.eventHandler.publish(product.pullEvents())
        return {
            id: product.id.value,
        }
    }
}
