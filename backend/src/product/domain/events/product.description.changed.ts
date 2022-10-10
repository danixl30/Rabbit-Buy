import { DomainEvent } from 'src/core/domain/events/event'
import { ProductDescription } from '../value-objects/product.description'
import { ProductId } from '../value-objects/product.id'

export class ProductDescriptionEvent extends DomainEvent {
    constructor(
        private _id: ProductId,
        private _description: ProductDescription,
    ) {
        super()
    }

    get id() {
        return this._id
    }

    get description() {
        return this._description
    }

    static eventName = this.prototype.constructor.name
}
