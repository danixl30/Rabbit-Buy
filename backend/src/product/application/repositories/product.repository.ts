import { Repository } from 'src/core/application/repository/repository'
import { Product } from 'src/product/domain/product'
import { CategoryRef } from 'src/product/domain/value-objects/category.ref'
import { ProductId } from 'src/product/domain/value-objects/product.id'
import { ProductPage } from 'src/product/domain/value-objects/product.page'
import { FilterByCriteriaDTO } from '../types/filter.criteria'

export interface ProductRepository extends Repository<ProductId, Product> {
    list(page?: ProductPage): Promise<Product[]>
    listByCategory(
        category: CategoryRef,
        page?: ProductPage,
    ): Promise<Product[]>
    searchById(id: ProductId): Promise<Product>
    searchByCriteria(
        criteria: FilterByCriteriaDTO,
        page?: ProductPage,
    ): Promise<Product[]>
}
