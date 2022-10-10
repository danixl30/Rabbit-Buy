import { DomainEvent } from 'src/core/domain/events/event'
import { ProductExistence } from '../value-objects/product.existence'
import { ProductId } from '../value-objects/product.id'

export class ProductCreatedEvent extends DomainEvent {
    constructor(private _id: ProductId, private _existence: ProductExistence) {
        super()
    }

    get id() {
        return this._id
    }

    get existence() {
        return this._existence
    }

    static eventName = this.prototype.constructor.name
}
