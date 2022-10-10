import { DomainEvent } from 'src/core/domain/events/event'
import { ProductImage } from '../value-objects/image'
import { ProductId } from '../value-objects/product.id'

export class ProductImageChangedEvent extends DomainEvent {
    constructor(private _id: ProductId, private _image: ProductImage) {
        super()
    }

    get id() {
        return this._id
    }

    get image() {
        return this._image
    }

    static eventName = this.prototype.constructor.name
}
