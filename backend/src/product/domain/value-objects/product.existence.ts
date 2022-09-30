import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ProductExistence implements ValueObject<ProductExistence> {
    constructor(private existence: number) {}

    get value(): number {
        return this.existence
    }

    equals(other: ProductExistence): boolean {
        return other.value === this.value
    }
}
