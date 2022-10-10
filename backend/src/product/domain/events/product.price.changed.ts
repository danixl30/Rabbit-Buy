import { DomainEvent } from 'src/core/domain/events/event'
import { ProductId } from '../value-objects/product.id'
import { ProductPrice } from '../value-objects/product.price'

export class ProductPriceChangedEvent extends DomainEvent {
    constructor(private _id: ProductId, private _price: ProductPrice) {
        super()
    }

    get id() {
        return this._id
    }

    get price() {
        return this._price
    }

    static eventName = this.prototype.constructor.name
}
