import { DomainEvent } from 'src/core/domain/events/event'
import { ProductExistence } from '../value-objects/product.existence'
import { ProductId } from '../value-objects/product.id'

export class ProductBoughtEvent extends DomainEvent {
    constructor(private _id: ProductId, private _quantity: ProductExistence) {
        super()
    }

    get id() {
        return this._id
    }

    get quantity() {
        return this._quantity
    }

    static eventName = this.prototype.constructor.name
}
