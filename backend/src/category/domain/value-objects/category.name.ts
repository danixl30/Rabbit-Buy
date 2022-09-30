import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class CategoryName implements ValueObject<CategoryName> {
    constructor(private category: string) {}

    get value(): string {
        return this.category
    }

    equals(other: CategoryName): boolean {
        return other.value === this.value
    }
}
