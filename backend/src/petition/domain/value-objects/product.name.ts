import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { InvalidProductNameException } from 'src/product/domain/exceptions/invalid.product.name'

export class ProductName implements ValueObject<ProductName> {
    constructor(private name: string) {
        if (name.trim().isEmpty()) throw new InvalidProductNameException()
    }

    get value() {
        return this.name
    }

    equals(other: ProductName): boolean {
        return other.value === this.value
    }
}
