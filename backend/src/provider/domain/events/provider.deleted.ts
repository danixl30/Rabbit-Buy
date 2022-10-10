import { DomainEvent } from 'src/core/domain/events/event'
import { ProviderId } from '../value-objects/provider.id'

export class ProviderDeletedEvent extends DomainEvent {
    constructor(private _id: ProviderId) {
        super()
    }

    get id() {
        return this._id
    }

    static eventName = this.prototype.constructor.name
}
