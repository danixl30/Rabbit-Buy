import { AgreggateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { CategoryCreatedEvent } from './events/category.created'
import { CategoryDeletedEvent } from './events/category.deleted'
import { CategoryNameChangedEvent } from './events/category.name.changed'
import { CategorySubCategoryAddedEvent } from './events/category.sub.category.added'
import { CategorySubCategoryRemovedEvent } from './events/category.sub.category.removed'
import { InvalidCategoryException } from './exceptions/invalid.category'
import { CategoryId } from './value-objects/category.id'
import { CategoryName } from './value-objects/category.name'
import { CategoryParent } from './value-objects/category.parent'

export class Category extends AgreggateRoot<CategoryId> {
    constructor(
        id: CategoryId,
        private _name: CategoryName,
        private _subCategories: CategoryId[] = [],
        private _parent?: CategoryParent,
    ) {
        super(id)
        this.apply(new CategoryCreatedEvent(id, this.name))
    }

    get name() {
        return this._name
    }

    get subCategories() {
        return this._subCategories
    }

    get parent() {
        return this._parent
    }

    changeName(name: CategoryName) {
        this._name = name
        this.apply(new CategoryNameChangedEvent(this.id, name))
    }

    addSubCategory(category: CategoryId) {
        this._subCategories.push(category)
        this.apply(new CategorySubCategoryAddedEvent(this.id, category))
    }

    removeSubCategory(category: CategoryId) {
        this._subCategories = this._subCategories.filter(
            (e) => !e.equals(category),
        )
        this.apply(new CategorySubCategoryRemovedEvent(this.id, category))
    }

    delete() {
        this.apply(new CategoryDeletedEvent(this.id))
    }

    validateState(): void {
        if (!this.id || !this.name) throw new InvalidCategoryException()
    }
}
