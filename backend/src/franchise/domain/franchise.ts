import { AgreggateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { InvalidFranchiseException } from './exceptions/invalid.franchise'
import { FranchiseGroupId } from './value-objects/franchise.group.id'
import { FranchiseId } from './value-objects/franchise.id'
import { FranchiseName } from './value-objects/franchise.name'
import { FranchiseRif } from './value-objects/franchise.rif'

export class Franchise extends AgreggateRoot<FranchiseId> {
    constructor(
        id: FranchiseId,
        private _name: FranchiseName,
        private _rif: FranchiseRif,
        private _groupId: FranchiseGroupId,
    ) {
        super(id)
    }

    get name() {
        return this._name
    }

    get rif() {
        return this._rif
    }

    get groupId() {
        return this._groupId
    }

    changeName(name: FranchiseName) {
        this._name = name
    }

    changeRif(rif: FranchiseRif) {
        this._rif = rif
    }

    changeGroupId(groupId: FranchiseGroupId) {
        this._groupId = groupId
    }

    validateState(): void {
        if (!this._id || !this._name || !this._rif || !this._groupId)
            throw new InvalidFranchiseException()
    }
}
