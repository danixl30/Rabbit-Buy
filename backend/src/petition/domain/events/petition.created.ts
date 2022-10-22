import { DomainEvent } from 'src/core/domain/events/event'
import { FranchiseRef } from '../value-objects/franchise.ref'
import { PetitionDate } from '../value-objects/petition.date'
import { PetitionId } from '../value-objects/petition.id'
import { PetitionQuantity } from '../value-objects/petition.quantity'
import { ProductCurrency } from '../value-objects/product.currency'
import { ProductName } from '../value-objects/product.name'
import { ProductPrice } from '../value-objects/product.price'
import { ProductRef } from '../value-objects/product.ref'
import { Status } from '../value-objects/status'
import { UserRef } from '../value-objects/user.ref'

export class PetitionCreatedEvent extends DomainEvent {
    constructor(
        private _id: PetitionId,
        private _productName: ProductName,
        private _productId: ProductRef,
        private _price: ProductPrice,
        private _quantity: PetitionQuantity,
        private _currency: ProductCurrency,
        private _client: UserRef,
        private _status: Status,
        private _date: PetitionDate,
        private _franchise: FranchiseRef,
    ) {
        super()
    }

    get id() {
        return this._id
    }

    get productName() {
        return this._productName
    }

    get product() {
        return this._productId
    }

    get franchise() {
        return this._franchise
    }

    get price() {
        return this._price
    }

    get currency() {
        return this._currency
    }

    get client() {
        return this._client
    }

    get status() {
        return this._status
    }

    get date() {
        return this._date
    }

    get quantity() {
        return this._quantity
    }

    static eventName = this.prototype.constructor.name
}
