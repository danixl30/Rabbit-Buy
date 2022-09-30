import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ProductCurrency implements ValueObject<ProductCurrency> {
    constructor(private currency: string) {}

    get value(): string {
        return this.currency
    }

    equals(other: ProductCurrency): boolean {
        return other.value === this.value
    }
}
