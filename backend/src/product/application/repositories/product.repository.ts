import { Product } from 'src/product/domain/product'
import { CategoryRef } from 'src/product/domain/value-objects/category.ref'
import { ProductCurrency } from 'src/product/domain/value-objects/product.currency'
import { ProductDescription } from 'src/product/domain/value-objects/product.description'
import { ProductExistence } from 'src/product/domain/value-objects/product.existence'
import { ProductId } from 'src/product/domain/value-objects/product.id'
import { ProductName } from 'src/product/domain/value-objects/product.name'
import { ProductPage } from 'src/product/domain/value-objects/product.page'
import { ProductPrice } from 'src/product/domain/value-objects/product.price'

export interface ProductRepository {
    save(
        name: ProductName,
        description: ProductDescription,
        existence: ProductExistence,
        price: ProductPrice,
        currency: ProductCurrency,
        category: CategoryRef,
    ): Promise<Product>
    modifyName(id: ProductId, name: ProductName): Promise<Product>
    modifyDescription(
        id: ProductId,
        description: ProductDescription,
    ): Promise<Product>
    modifyExistence(
        id: ProductId,
        existence: ProductExistence,
    ): Promise<Product>
    modifyPrice(id: ProductId, price: ProductPrice): Promise<Product>
    modifyCurrency(id: ProductId, currency: ProductCurrency): Promise<Product>
    modifyCategory(id: ProductId, category: CategoryRef): Promise<Product>
    delete(id: ProductId): Promise<Product>
    list(page?: ProductPage): Promise<Product[]>
    listByCategory(
        category: CategoryRef,
        page?: ProductPage,
    ): Promise<Product[]>
    searchById(id: ProductId): Promise<Product>
}
