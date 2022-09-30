import { AgreggateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { InvalidCategoryException } from './exceptions/invalid.category'
import { CategoryId } from './value-objects/category.id'
import { CategoryName } from './value-objects/category.name'

export class Category extends AgreggateRoot<CategoryId> {
    constructor(id: CategoryId, private _name: CategoryName) {
        super(id)
    }

    get name() {
        return this._name
    }

    changeName(name: CategoryName) {
        this._name = name
    }

    validateState(): void {
        if (!this.id || !this.name) throw new InvalidCategoryException()
    }
}
