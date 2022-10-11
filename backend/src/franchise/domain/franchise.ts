import { AgreggateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { FranchiseCreatedEvent } from './events/franchise.created'
import { FranchiseDeletedEvent } from './events/franchise.deleted'
import { FranchiseGroupIdChangedEvent } from './events/franchise.group.id.changed'
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
        this.apply(
            new FranchiseCreatedEvent(id, this.name, this.rif, this.groupId),
        )
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
        this.apply(new FranchiseGroupIdChangedEvent(this.id, groupId))
    }

    delete() {
        this.apply(new FranchiseDeletedEvent(this.id))
    }

    validateState(): void {
        if (!this._id || !this._name || !this._rif || !this._groupId)
            throw new InvalidFranchiseException()
    }
}
