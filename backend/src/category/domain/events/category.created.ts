import { DomainEvent } from 'src/core/domain/events/event'
import { CategoryId } from '../value-objects/category.id'
import { CategoryName } from '../value-objects/category.name'

export class CategoryCreatedEvent extends DomainEvent {
    constructor(private _id: CategoryId, private _name: CategoryName) {
        super()
    }

    get id() {
        return this._id
    }

    get name() {
        return this._name
    }

    static eventName = this.prototype.constructor.name
}
