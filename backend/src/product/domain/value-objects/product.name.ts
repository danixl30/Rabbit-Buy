import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ProductName implements ValueObject<ProductName> {
    constructor(private name: string) {}

    get value(): string {
        return this.name
    }

    equals(other: ProductName): boolean {
        return other.value === this.value
    }
}
