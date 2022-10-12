import { CategoryId } from 'src/category/domain/value-objects/category.id'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { CategoryRef } from 'src/product/domain/value-objects/category.ref'
import { ProductId } from 'src/product/domain/value-objects/product.id'
import { ProductNotFoundException } from '../../exceptions/product.not.found'
import { ProductRepository } from '../../repositories/product.repository'
import { ChangeProductCategoryDTO } from './types/change.category.dto'
import { ChangeProductCategoryResponse } from './types/change.category.response'

export class AddProductCategoryApplicationService
    implements
        ApplicationService<
            ChangeProductCategoryDTO,
            ChangeProductCategoryResponse
        >
{
    constructor(
        private productRepository: ProductRepository,
        private eventHandler: EventHandler,
    ) {}

    async execute(
        data: ChangeProductCategoryDTO,
    ): Promise<ChangeProductCategoryResponse> {
        const product = await this.productRepository.searchById(
            new ProductId(data.id),
        )
        if (!product) throw new ProductNotFoundException()
        product.addCategory(new CategoryRef(new CategoryId(data.category)))
        await this.productRepository.save(product)
        this.eventHandler.publish(product.pullEvents())
        return {
            id: product.id.value,
        }
    }
}
