import { AgreggateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { CategoryCreatedEvent } from './events/category.created'
import { CategoryDeletedEvent } from './events/category.deleted'
import { CategoryNameChangedEvent } from './events/category.name.changed'
import { InvalidCategoryException } from './exceptions/invalid.category'
import { CategoryId } from './value-objects/category.id'
import { CategoryName } from './value-objects/category.name'

export class Category extends AgreggateRoot<CategoryId> {
    constructor(id: CategoryId, private _name: CategoryName) {
        super(id)
        this.apply(new CategoryCreatedEvent(id, this.name))
    }

    get name() {
        return this._name
    }

    changeName(name: CategoryName) {
        this._name = name
        this.apply(new CategoryNameChangedEvent(this.id, name))
    }

    delete() {
        this.apply(new CategoryDeletedEvent(this.id))
    }

    validateState(): void {
        if (!this.id || !this.name) throw new InvalidCategoryException()
    }
}
