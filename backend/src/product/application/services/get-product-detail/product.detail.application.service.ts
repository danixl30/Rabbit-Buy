import { CategoryRepository } from 'src/category/application/repositories/category.repository'
import { ApplicationService } from 'src/core/application/service/application.service'
import { FranchiseRepository } from 'src/franchise/application/repositories/franchise.repository'
import { ProductId } from 'src/product/domain/value-objects/product.id'
import { ProductNotFoundException } from '../../exceptions/product.not.found'
import { ProductRepository } from '../../repositories/product.repository'
import { GetProductDetailDTO } from './types/get.product.detail.dto'
import { GetProductDetailResponse } from './types/get.product.detail.response'

export class GetProductDetailApplicationService
    implements
        ApplicationService<GetProductDetailDTO, GetProductDetailResponse>
{
    constructor(
        private productRepository: ProductRepository,
        private categoryRepository: CategoryRepository,
        private franchiseRepository: FranchiseRepository,
    ) {}

    async execute(
        data: GetProductDetailDTO,
    ): Promise<GetProductDetailResponse> {
        const product = await this.productRepository.searchById(
            new ProductId(data.id),
        )
        if (!product) throw new ProductNotFoundException()
        const categories = await product.categories.asyncMap(
            async (e) => await this.categoryRepository.searchById(e.value),
        )
        const franchise = await this.franchiseRepository.searchById(
            product.franchise.value,
        )
        return {
            id: product.id.value,
            name: product.name.value,
            description: product.description.value,
            existence: product.existence.value,
            price: product.price.value,
            currency: product.currency.value,
            categories: categories.map((e) => e.name.value),
            franchise: {
                name: franchise.id.value,
                id: franchise.id.value,
            },
            image: product.image.value,
        }
    }
}
