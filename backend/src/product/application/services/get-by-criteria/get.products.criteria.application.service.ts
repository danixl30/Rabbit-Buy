import { ApplicationService } from 'src/core/application/service/application.service'
import { ProductRepository } from '../../repositories/product.repository'
import { FindProductsTermQueryFactory } from './queries/find.products.term.factory'
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
        const products = await this.productRepository.searchAll(
            new FindProductsTermQueryFactory(data.text, data.page).create(),
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
