import { AgreggateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { InvalidProviderException } from './exceptions/invalid.provider'
import { FranchiseRef } from './value-objects/franchise.ref'
import { ProviderId } from './value-objects/provider.id'

export class Provider extends AgreggateRoot<ProviderId> {
    constructor(id: ProviderId, private _franchise: FranchiseRef) {
        super(id)
    }

    get franchise() {
        return this._franchise
    }

    validateState(): void {
        if (!this.id || this.franchise) throw new InvalidProviderException()
    }
}
