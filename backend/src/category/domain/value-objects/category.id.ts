import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID/UUID.reg.exp'
import { InvalidCategoryIdException } from '../exceptions/invalid.category.id'

export class CategoryId implements ValueObject<CategoryId> {
    private constructor(private id: string) {
        if (!regExpUUID.test(id)) throw new InvalidCategoryIdException()
    }

    get value(): string {
        return this.id
    }

    equals(other: CategoryId): boolean {
        return other.value === this.value
    }

    static create(id: string) {
        return new CategoryId(id)
    }
}
