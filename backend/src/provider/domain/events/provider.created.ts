import { DomainEvent } from 'src/core/domain/events/event'
import { FranchiseRef } from '../value-objects/franchise.ref'
import { ProviderId } from '../value-objects/provider.id'

export class ProviderCreatedEvent extends DomainEvent {
    constructor(private _id: ProviderId, private _franchise: FranchiseRef) {
        super()
    }

    get id() {
        return this._id
    }

    get franchise() {
        return this._franchise
    }

    static eventName = this.prototype.constructor.name
}
