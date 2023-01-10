import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { InvalidProductPriceException } from '../exceptions/invalid.product.price'

export class ProductPrice implements ValueObject<ProductPrice> {
    constructor(private price: number) {
        if (price === undefined || price < 0)
            throw new InvalidProductPriceException()
    }

    get value(): number {
        return this.price
    }

    equals(other: ProductPrice): boolean {
        return other.value === this.value
    }
}
