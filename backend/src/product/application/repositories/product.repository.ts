import { Criteria } from 'src/core/application/repository/query/criteria'
import { Repository } from 'src/core/application/repository/repository'
import { Product } from 'src/product/domain/product'
import { ProductId } from 'src/product/domain/value-objects/product.id'

export interface ProductRepository extends Repository<ProductId, Product> {
    searchById(id: ProductId): Promise<Product>
    searchAll(criteria: Criteria): Promise<Product[]>
    searchOne(criteria: Criteria): Promise<Product>
}
