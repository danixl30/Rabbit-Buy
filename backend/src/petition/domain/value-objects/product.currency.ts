import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { InvalidProductCurrencyException } from 'src/product/domain/exceptions/invalid.product.currency'

export class ProductCurrency implements ValueObject<ProductCurrency> {
    constructor(private currency: string) {
        if (currency.trim().isEmpty())
            throw new InvalidProductCurrencyException()
    }

    get value() {
        return this.currency
    }

    equals(other: ProductCurrency): boolean {
        return other.value === this.value
    }
}
