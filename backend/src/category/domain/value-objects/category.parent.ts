import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { CategoryId } from './category.id'

export class CategoryParent implements ValueObject<CategoryParent> {
    private constructor(private id: CategoryId) {}

    get value() {
        return this.id
    }

    equals(other: CategoryParent): boolean {
        return other.value.equals(this.value)
    }

    static create(id: CategoryId) {
        return new CategoryParent(id)
    }
}
