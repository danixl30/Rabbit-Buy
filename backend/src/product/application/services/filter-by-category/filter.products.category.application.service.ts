import { CategoryId } from 'src/category/domain/value-objects/category.id'
import { ApplicationService } from 'src/core/application/service/application.service'
import { CategoryRef } from 'src/product/domain/value-objects/category.ref'
import { ProductPage } from 'src/product/domain/value-objects/product.page'
import { ProductRepository } from '../../repositories/product.repository'
import { FilterProductsCategoryDTO } from './types/filter.categary.dto'
import { FilterProductsCategoryResponse } from './types/filter.category.response'

export class FilterProductsCategoryApplicationService
    implements
        ApplicationService<
            FilterProductsCategoryDTO,
            FilterProductsCategoryResponse
        >
{
    constructor(private productRepository: ProductRepository) {}

    async execute(
        data: FilterProductsCategoryDTO,
    ): Promise<FilterProductsCategoryResponse> {
        const products = await this.productRepository.listByCategory(
            new CategoryRef(new CategoryId(data.category)),
            new ProductPage(data.page),
        )
        return {
            products: products.map((e) => ({
                name: e.name.value,
                id: e.id.value,
                price: e.price.value,
                currency: e.currency.value,
                image: e.image.value,
            })),
        }
    }
}
