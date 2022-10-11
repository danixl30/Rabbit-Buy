import { AgreggateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { ProviderCreatedEvent } from './events/provider.created'
import { ProviderDeletedEvent } from './events/provider.deleted'
import { InvalidProviderException } from './exceptions/invalid.provider'
import { FranchiseRef } from './value-objects/franchise.ref'
import { ProviderId } from './value-objects/provider.id'

export class Provider extends AgreggateRoot<ProviderId> {
    constructor(id: ProviderId, private _franchise: FranchiseRef) {
        super(id)
        this.apply(new ProviderCreatedEvent(id, this.franchise))
    }

    get franchise() {
        return this._franchise
    }

    delete() {
        this.apply(new ProviderDeletedEvent(this.id))
    }

    validateState(): void {
        if (!this.id || this.franchise) throw new InvalidProviderException()
    }
}
