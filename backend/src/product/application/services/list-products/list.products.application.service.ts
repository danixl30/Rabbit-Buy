import { ApplicationService } from 'src/core/application/service/application.service'
import { ProductRepository } from '../../repositories/product.repository'
import { FindProductsQueryFactory } from './queries/find.products.factory'
import { ListProductsDTO } from './types/list.products.dto'
import { ListProductsResponse } from './types/list.products.response'

export class ListProductsApplicationService
    implements ApplicationService<ListProductsDTO, ListProductsResponse>
{
    constructor(private productRepository: ProductRepository) {}

    async execute(data: ListProductsDTO): Promise<ListProductsResponse> {
        const products = await this.productRepository.searchAll(
            new FindProductsQueryFactory(data.page).create(),
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
