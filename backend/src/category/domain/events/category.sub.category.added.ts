import { DomainEvent } from 'src/core/domain/events/event'
import { CategoryId } from '../value-objects/category.id'

export class CategorySubCategoryAddedEvent extends DomainEvent {
    constructor(private _id: CategoryId, private _subCategory: CategoryId) {
        super()
    }

    get id() {
        return this._id
    }

    get subCategory() {
        return this._subCategory
    }

    static eventName = this.prototype.constructor.name
}
