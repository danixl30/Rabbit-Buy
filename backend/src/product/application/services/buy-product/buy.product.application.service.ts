import { ApplicationService } from 'src/core/application/service/application.service'
import { ProductExistence } from 'src/product/domain/value-objects/product.existence'
import { ProductId } from 'src/product/domain/value-objects/product.id'
import { ProductNotFoundException } from '../../exceptions/product.not.found'
import { ProductRepository } from '../../repositories/product.repository'
import { BuyProductDTO } from './types/buy.product.dto'
import { BuyProductResponse } from './types/buy.product.response'

export class BuyProductApplicationService
    implements ApplicationService<BuyProductDTO, BuyProductResponse>
{
    constructor(private productRepository: ProductRepository) {}

    async execute(data: BuyProductDTO): Promise<BuyProductResponse> {
        const product = await this.productRepository.searchById(
            new ProductId(data.id),
        )
        if (!product) throw new ProductNotFoundException()
        product.buy(new ProductExistence(data.quantity))
        await this.productRepository.save(product)
        return {
            id: product.id.value,
        }
    }
}
