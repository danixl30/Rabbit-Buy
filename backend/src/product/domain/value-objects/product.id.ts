import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ProductId implements ValueObject<ProductId> {
    constructor(private id: string) {}

    get value(): string {
        return this.id
    }

    equals(other: ProductId): boolean {
        return other.value === this.value
    }
}
