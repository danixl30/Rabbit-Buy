import { AgreggateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { InvalidPetitionException } from './exceptions/invalid.petition'
import { PetitionDate } from './value-objects/petition.date'
import { PetitionId } from './value-objects/petition.id'
import { ProductRef } from './value-objects/product.ref'
import { Status } from './value-objects/status'
import { UserRef } from './value-objects/user.ref'

export class Petition extends AgreggateRoot<PetitionId> {
    constructor(
        id: PetitionId,
        private _product: ProductRef,
        private _client: UserRef,
        private _status: Status,
        private _date: PetitionDate,
    ) {
        super(id)
    }

    get product() {
        return this._product
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

    changeStatus(status: Status) {
        this._status = status
    }

    validateState(): void {
        if (!this.id || !this.product || !this.client || !this.status)
            throw new InvalidPetitionException()
    }
}
