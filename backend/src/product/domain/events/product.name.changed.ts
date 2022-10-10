import { DomainEvent } from 'src/core/domain/events/event'
import { ProductId } from '../value-objects/product.id'
import { ProductName } from '../value-objects/product.name'

export class ProductNameChangedEvent extends DomainEvent {
    constructor(private _id: ProductId, private _name: ProductName) {
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
