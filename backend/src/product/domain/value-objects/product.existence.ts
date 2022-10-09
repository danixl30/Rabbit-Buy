import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { InvalidProductExistenceException } from '../exceptions/invalid.product.existence'

export class ProductExistence implements ValueObject<ProductExistence> {
    constructor(private existence: number) {
        if (existence < 0) throw new InvalidProductExistenceException()
    }

    get value(): number {
        return this.existence
    }

    equals(other: ProductExistence): boolean {
        return other.value === this.value
    }
}
