import { DomainEvent } from 'src/core/domain/events/event'
import { CategoryId } from '../value-objects/category.id'

export class CategoryDeletedEvent extends DomainEvent {
    constructor(private _id: CategoryId) {
        super()
    }

    get id() {
        return this._id
    }

    static eventName = this.prototype.constructor.name
}
