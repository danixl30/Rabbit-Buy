import { CategoryId } from 'src/category/domain/value-objects/category.id'
import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class CategoryRef implements ValueObject<CategoryRef> {
    constructor(private category: CategoryId) {}

    get value() {
        return this.category
    }

    equals(other: CategoryRef): boolean {
        return other.value.equals(this.value)
    }
}
