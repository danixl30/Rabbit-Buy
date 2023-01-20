import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { InvalidProductCurrencyException } from '../exceptions/invalid.product.currency'

export class ProductCurrency implements ValueObject<ProductCurrency> {
    private constructor(private currency: string) {
        if (currency.trim().isEmpty())
            throw new InvalidProductCurrencyException()
    }

    get value(): string {
        return this.currency
    }

    equals(other: ProductCurrency): boolean {
        return other.value === this.value
    }

    static create(currency: string) {
        return new ProductCurrency(currency)
    }
}
