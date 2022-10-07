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
    constructor(private productRepository: ProductRepository) {}

    async execute(
        data: ChangeProductDescriptionDTO,
    ): Promise<ChangeProductDescriptionResponse> {
        const product = await this.productRepository.searchById(
            new ProductId(data.id),
        )
        if (!product) throw new ProductNotFoundException()
        product.changeDescription(new ProductDescription(data.description))
        await this.productRepository.save(product)
        return {
            id: product.id.value,
        }
    }
}
