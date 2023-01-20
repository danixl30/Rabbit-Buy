import { ProductDocument } from '../models/product.model'
import { CategoryId } from 'src/category/domain/value-objects/category.id'
import { FranchiseId } from 'src/franchise/domain/value-objects/franchise.id'
import { Product } from 'src/product/domain/product'
import { CategoryRef } from 'src/product/domain/value-objects/category.ref'
import { FranchiseRef } from 'src/product/domain/value-objects/franchise.ref'
import { ProductImage } from 'src/product/domain/value-objects/image'
import { ProductCurrency } from 'src/product/domain/value-objects/product.currency'
import { ProductDescription } from 'src/product/domain/value-objects/product.description'
import { ProductExistence } from 'src/product/domain/value-objects/product.existence'
import { ProductId } from 'src/product/domain/value-objects/product.id'
import { ProductName } from 'src/product/domain/value-objects/product.name'
import { ProductPrice } from 'src/product/domain/value-objects/product.price'

export const productDbToDomain = (product: ProductDocument): Product =>
    Product.create(
        ProductId.create(product.id),
        ProductName.create(product.productName),
        ProductDescription.create(product.description),
        ProductExistence.create(product.existence),
        ProductPrice.create(product.price),
        ProductCurrency.create(product.currency),
        FranchiseRef.create(FranchiseId.create(product.franchise)),
        ProductImage.create(product.image),
        product.categories.map((e) => CategoryRef.create(CategoryId.create(e))),
    )
