import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { InvalidProductExistenceException } from '../exceptions/invalid.product.existence'

export class ProductExistence implements ValueObject<ProductExistence> {
    private constructor(private existence: number) {
        if (existence === undefined || existence < 0)
            throw new InvalidProductExistenceException()
    }

    get value(): number {
        return this.existence
    }

    isGreaterThan(value: ProductExistence): boolean {
        return this.existence > value.value
    }

    substract(value: ProductExistence): ProductExistence {
        return new ProductExistence(this.existence - value.value)
    }

    plus(value: ProductExistence): ProductExistence {
        return new ProductExistence(this.existence + value.value)
    }

    equals(other: ProductExistence): boolean {
        return other.value === this.value
    }

    static create(existence: number) {
        return new ProductExistence(existence)
    }
}
