import { DomainEvent } from 'src/core/domain/events/event'
import { ProductId } from '../value-objects/product.id'

export class ProductDeletedEvent extends DomainEvent {
    constructor(private _id: ProductId) {
        super()
    }

    get id() {
        return this._id
    }

    static eventName = this.prototype.constructor.name
}
