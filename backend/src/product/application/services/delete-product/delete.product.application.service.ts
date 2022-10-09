import { ApplicationService } from 'src/core/application/service/application.service'
import { ImageStorage } from 'src/core/application/storage/images/image.storage'
import { ProductId } from 'src/product/domain/value-objects/product.id'
import { ProductNotFoundException } from '../../exceptions/product.not.found'
import { ProductRepository } from '../../repositories/product.repository'
import { DeleteProductDTO } from './types/delete.product.dto'
import { DeleteProductResponse } from './types/delete.product.response'

export class DeleteProductApplicationService
    implements ApplicationService<DeleteProductDTO, DeleteProductResponse>
{
    constructor(
        private productRepository: ProductRepository,
        private imageStorage: ImageStorage,
    ) {}

    async execute(data: DeleteProductDTO): Promise<DeleteProductResponse> {
        const product = await this.productRepository.searchById(
            new ProductId(data.id),
        )
        if (!product) throw new ProductNotFoundException()
        await this.productRepository.delete(product)
        await this.imageStorage.delete({
            url: product.image.value,
        })
        return {
            id: product.id.value,
        }
    }
}