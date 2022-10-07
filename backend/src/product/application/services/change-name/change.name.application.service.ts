import { ApplicationService } from 'src/core/application/service/application.service'
import { ProductId } from 'src/product/domain/value-objects/product.id'
import { ProductName } from 'src/product/domain/value-objects/product.name'
import { ProductNotFoundException } from '../../exceptions/product.not.found'
import { ProductRepository } from '../../repositories/product.repository'
import { ChangeProductNameDTO } from './types/change.product.name.dto'
import { ChangeProductNameResponse } from './types/change.product.name.response'

export class ChangeProductNameApplicationService
    implements
        ApplicationService<ChangeProductNameDTO, ChangeProductNameResponse>
{
    constructor(private productRepository: ProductRepository) {}

    async execute(
        data: ChangeProductNameDTO,
    ): Promise<ChangeProductNameResponse> {
        const product = await this.productRepository.searchById(
            new ProductId(data.id),
        )
        if (!product) throw new ProductNotFoundException()
        product.changeName(new ProductName(data.name))
        await this.productRepository.save(product)
        return {
            id: product.id.value,
        }
    }
}
