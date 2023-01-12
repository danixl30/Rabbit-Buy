import { AgreggateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { PetitionCancelledEvent } from './events/petition.cancelled'
import { PetitionConfirmedEvent } from './events/petition.confirmed'
import { PetitionCreatedEvent } from './events/petition.created'
import { PetitionDeletedEvent } from './events/petition.deleted'
import { PetitionFinishedEvent } from './events/petition.finished'
import { PetitionSuspendedEvent } from './events/petition.suspended'
import { InvalidPetitionException } from './exceptions/invalid.petition'
import { OperationInvalidException } from './exceptions/operation.invalid'
import { FranchiseRef } from './value-objects/franchise.ref'
import { PetitionDate } from './value-objects/petition.date'
import { PetitionId } from './value-objects/petition.id'
import { PetitionQuantity } from './value-objects/petition.quantity'
import { ProductCurrency } from './value-objects/product.currency'
import { ProductName } from './value-objects/product.name'
import { ProductPrice } from './value-objects/product.price'
import { ProductRef } from './value-objects/product.ref'
import { Status } from './value-objects/status'
import { Statuses } from './value-objects/statuses'
import { UserRef } from './value-objects/user.ref'

export class Petition extends AgreggateRoot<PetitionId> {
    constructor(
        id: PetitionId,
        private _productName: ProductName,
        private _productId: ProductRef,
        private _price: ProductPrice,
        private _quantity: PetitionQuantity,
        private _currency: ProductCurrency,
        private _client: UserRef,
        private _date: PetitionDate,
        private _franchise: FranchiseRef,
        private _status: Status = new Status(Statuses.OPEN),
    ) {
        super(id)
        this.apply(
            new PetitionCreatedEvent(
                id,
                this.productName,
                this.product,
                this.price,
                this.quantity,
                this.currency,
                this.client,
                this.status,
                this.date,
                this.franchise,
            ),
        )
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

    confirm() {
        if (!this.status.isNotFisished()) throw new OperationInvalidException()
        this._status = new Status(Statuses.CONFIRMED)
        this.apply(new PetitionConfirmedEvent(this.id, this.status))
    }

    cancel() {
        if (
            !this.status.isNotFisished() ||
            this.status.equals(new Status(Statuses.CANCELLED))
        )
            throw new OperationInvalidException()
        this._status = new Status(Statuses.CANCELLED)
        this.apply(new PetitionCancelledEvent(this.id, this.status))
    }

    suspend() {
        if (!this.status.isNotFisished()) throw new OperationInvalidException()
        this._status = new Status(Statuses.SUSPEND)
        this.apply(new PetitionSuspendedEvent(this.id, this.status))
    }

    finish() {
        if (!this.status.isNotFisished()) throw new OperationInvalidException()
        this._status = new Status(Statuses.FINISHED)
        this.apply(new PetitionFinishedEvent(this.id, this.status))
    }

    delete() {
        this.apply(new PetitionDeletedEvent(this.id))
    }

    validateState(): void {
        if (
            !this.id ||
            !this.client ||
            !this.status ||
            !this.productName ||
            !this.price ||
            !this.currency ||
            !this.franchise ||
            !this.product
        )
            throw new InvalidPetitionException()
    }
}
