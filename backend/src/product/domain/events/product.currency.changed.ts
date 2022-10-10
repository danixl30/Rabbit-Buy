import { DomainEvent } from 'src/core/domain/events/event'
import { ProductCurrency } from '../value-objects/product.currency'
import { ProductId } from '../value-objects/product.id'

export class ProductCurrencyChangedEvent extends DomainEvent {
    constructor(private _id: ProductId, private _currency: ProductCurrency) {
        super()
    }

    get id() {
        return this._id
    }

    get currency() {
        return this._currency
    }

    static eventName = this.prototype.constructor.name
}
