import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ProductPage implements ValueObject<ProductPage> {
    constructor(private page: number) {}

    get value(): number {
        return this.page
    }

    equals(other: ProductPage): boolean {
        return other.value === this.value
    }
}
