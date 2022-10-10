import { DomainEvent } from 'src/core/domain/events/event'
import { CategoryId } from '../value-objects/category.id'
import { CategoryName } from '../value-objects/category.name'

export class CategoryNameChangedEvent extends DomainEvent {
    constructor(private _id: CategoryId, private _name: CategoryName) {
        super()
    }

    get name() {
        return this._name
    }

    get id() {
        return this._id
    }

    static eventName = this.prototype.constructor.name
}
