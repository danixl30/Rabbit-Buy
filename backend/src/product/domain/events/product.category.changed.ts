import { DomainEvent } from 'src/core/domain/events/event'
import { CategoryRef } from '../value-objects/category.ref'
import { ProductId } from '../value-objects/product.id'

export class ProductCategoryChangedEvent extends DomainEvent {
    constructor(private _id: ProductId, private _category: CategoryRef) {
        super()
    }

    get id() {
        return this._id
    }

    get category() {
        return this._category
    }

    static eventName = this.prototype.constructor.name
}
