import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ProductDescription implements ValueObject<ProductDescription> {
    constructor(private description: string) {}

    get value(): string {
        return this.description
    }

    equals(other: ProductDescription): boolean {
        return other.value === this.value
    }
}
