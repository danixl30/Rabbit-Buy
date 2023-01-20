import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { ProductId } from 'src/product/domain/value-objects/product.id'

export class ProductRef implements ValueObject<ProductRef> {
    private constructor(private productId: ProductId) {}

    get value() {
        return this.productId
    }

    equals(other: ProductRef): boolean {
        return other.value.equals(this.value)
    }

    static create(productId: ProductId) {
        return new ProductRef(productId)
    }
}
