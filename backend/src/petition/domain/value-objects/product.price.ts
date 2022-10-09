import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { InvalidProductPriceException } from 'src/product/domain/exceptions/invalid.product.price'

export class ProductPrice implements ValueObject<ProductPrice> {
    constructor(private price: number) {
        if (price < 0) throw new InvalidProductPriceException()
    }

    get value() {
        return this.price
    }

    equals(other: ProductPrice): boolean {
        return other.value === this.value
    }
}
