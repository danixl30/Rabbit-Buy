import { ApplicationService } from 'src/core/application/service/application.service'
import { ProductId } from 'src/product/domain/value-objects/product.id'
import { ProductNotFoundException } from '../../exceptions/product.not.found'
import { ProductRepository } from '../../repositories/product.repository'
import { DeleteProductDTO } from './types/delete.product.dto'
import { DeleteProductResponse } from './types/delete.product.response'

export class DeleteProductApplicationService
    implements ApplicationService<DeleteProductDTO, DeleteProductResponse>
{
    constructor(private productRepository: ProductRepository) {}

    async execute(data: DeleteProductDTO): Promise<DeleteProductResponse> {
        const product = await this.productRepository.searchById(
            new ProductId(data.id),
        )
        if (!product) throw new ProductNotFoundException()
        await this.productRepository.delete(product)
        return {
            id: product.id.value,
        }
    }
}
