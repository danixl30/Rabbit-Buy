import { AgreggateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { InvalidPetitionException } from './exceptions/invalid.petition'
import { FranchiseRef } from './value-objects/franchise.ref'
import { PetitionDate } from './value-objects/petition.date'
import { PetitionId } from './value-objects/petition.id'
import { PetitionQuantity } from './value-objects/petition.quantity'
import { ProductCurrency } from './value-objects/product.currency'
import { ProductName } from './value-objects/product.name'
import { ProductPrice } from './value-objects/product.price'
import { Status } from './value-objects/status'
import { UserRef } from './value-objects/user.ref'

export class Petition extends AgreggateRoot<PetitionId> {
    constructor(
        id: PetitionId,
        private _productName: ProductName,
        private _price: ProductPrice,
        private _quantity: PetitionQuantity,
        private _currency: ProductCurrency,
        private _client: UserRef,
        private _status: Status,
        private _date: PetitionDate,
        private _franchise: FranchiseRef,
    ) {
        super(id)
    }

    get productName() {
        return this._productName
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

    changeStatus(status: Status) {
        this._status = status
    }

    validateState(): void {
        if (
            !this.id ||
            !this.client ||
            !this.status ||
            !this.productName ||
            !this.price ||
            !this.currency ||
            !this.franchise
        )
            throw new InvalidPetitionException()
    }
}
