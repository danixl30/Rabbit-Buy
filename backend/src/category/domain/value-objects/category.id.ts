import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class CategoryId implements ValueObject<CategoryId> {
    constructor(private id: string) {}

    get value(): string {
        return this.id
    }

    equals(other: CategoryId): boolean {
        return other.value === this.value
    }
}
