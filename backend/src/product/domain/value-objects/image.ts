import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ProductImage implements ValueObject<ProductImage> {
    private constructor(private url: string) {}

    get value() {
        return this.url
    }

    equals(other: ProductImage): boolean {
        return other.value === this.value
    }

    static create(url: string) {
        return new ProductImage(url)
    }
}
