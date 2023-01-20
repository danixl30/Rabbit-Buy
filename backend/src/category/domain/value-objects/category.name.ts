import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { InvalidCategoryNameException } from '../exceptions/invalid.category.name'

export class CategoryName implements ValueObject<CategoryName> {
    private constructor(private category: string) {
        if (category.isEmpty()) throw new InvalidCategoryNameException()
    }

    get value(): string {
        return this.category
    }

    equals(other: CategoryName): boolean {
        return other.value === this.value
    }

    static create(name: string) {
        return new CategoryName(name)
    }
}
