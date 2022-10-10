import { DomainEvent } from 'src/core/domain/events/event'
import { FranchiseId } from '../value-objects/franchise.id'
import { FranchiseRif } from '../value-objects/franchise.rif'

export class FranchiseRifChangedEvent extends DomainEvent {
    constructor(private _id: FranchiseId, private _rif: FranchiseRif) {
        super()
    }

    get id() {
        return this._id
    }

    get rif() {
        return this._rif
    }
    static eventName = this.prototype.constructor.name
}
