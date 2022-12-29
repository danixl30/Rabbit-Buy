import { ApplicationService } from 'src/core/application/service/application.service'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { FranchiseRef } from 'src/product/domain/value-objects/franchise.ref'
import { ProductRepository } from '../../repositories/product.repository'
import { FilterByCriteriaResponse } from '../get-by-criteria/types/filter.products.criteria.response'
import { FindProductsFranchiseQueryFactory } from './queries/search.products.franchise.query'
import { GetProductsByFranchiseDTO } from './type/dto'

export class GetProductByFranchiseApplicationService
    implements
        ApplicationService<GetProductsByFranchiseDTO, FilterByCriteriaResponse>
{
    constructor(private productRepository: ProductRepository) {}

    async execute(
        data: GetProductsByFranchiseDTO,
    ): Promise<FilterByCriteriaResponse> {
        const products = await this.productRepository.searchAll(
            new FindProductsFranchiseQueryFactory(
                new FranchiseRef(new FranchiseId(data.franchise)),
                data.text,
                data.page,
            ).create(),
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
