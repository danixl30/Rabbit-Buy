import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { CategoryId } from './category.id'

export class CategoryParent implements ValueObject<CategoryParent> {
    constructor(private id: CategoryId) {}

    get value() {
        return this.id
    }

    equals(other: CategoryParent): boolean {
        return other.value.equals(this.value)
    }
}
