import { ApplicationService } from 'src/core/application/service/application.service'
import { ProductPage } from 'src/product/domain/value-objects/product.page'
import { ProductRepository } from '../../repositories/product.repository'
import { FilterProductsByCriteriaDTO } from './types/filter.products.criteria.dto'
import { FilterByCriteriaResponse } from './types/filter.products.criteria.response'

export class GetProductByCriteriaApplicationService
    implements
        ApplicationService<
            FilterProductsByCriteriaDTO,
            FilterByCriteriaResponse
        >
{
    constructor(private productRepository: ProductRepository) {}

    async execute(
        data: FilterProductsByCriteriaDTO,
    ): Promise<FilterByCriteriaResponse> {
        const products = await this.productRepository.searchByCriteria(
            {
                text: data.text,
            },
            new ProductPage(data.page),
        )
        return {
            products: products.map((e) => ({
                name: e.name.value,
                id: e.id.value,
                price: e.price.value,
                currency: e.currency.value,
            })),
        }
    }
}
