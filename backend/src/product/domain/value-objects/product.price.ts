import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ProductPrice implements ValueObject<ProductPrice> {
    constructor(private price: number) {}

    get value(): number {
        return this.price
    }

    equals(other: ProductPrice): boolean {
        return other.value === this.value
    }
}
