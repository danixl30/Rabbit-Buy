import { DomainEvent } from 'src/core/domain/events/event'
import { CategoryRef } from '../value-objects/category.ref'
import { FranchiseRef } from '../value-objects/franchise.ref'
import { ProductImage } from '../value-objects/image'
import { ProductCurrency } from '../value-objects/product.currency'
import { ProductDescription } from '../value-objects/product.description'
import { ProductExistence } from '../value-objects/product.existence'
import { ProductId } from '../value-objects/product.id'
import { ProductName } from '../value-objects/product.name'
import { ProductPrice } from '../value-objects/product.price'

export class ProductCreatedEvent extends DomainEvent {
    constructor(
        private _id: ProductId,
        private _name: ProductName,
        private _description: ProductDescription,
        private _existence: ProductExistence,
        private _price: ProductPrice,
        private _currency: ProductCurrency,
        private _franchise: FranchiseRef,
        private _image: ProductImage,
        private _categories: CategoryRef[],
    ) {
        super()
    }

    get id() {
        return this._id
    }

    get name() {
        return this._name
    }

    get description() {
        return this._description
    }

    get image() {
        return this._image
    }

    get existence() {
        return this._existence
    }

    get price() {
        return this._price
    }

    get currency() {
        return this._currency
    }

    get categories() {
        return this._categories
    }

    get franchise() {
        return this._franchise
    }

    static eventName = this.prototype.constructor.name
}
