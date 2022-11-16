import { DomainEvent } from 'src/core/domain/events/event'
import { FranchiseGroupId } from '../value-objects/franchise.group.id'
import { FranchiseId } from '../value-objects/franchise.id'
import { FranchiseImage } from '../value-objects/franchise.image'
import { FranchiseName } from '../value-objects/franchise.name'
import { FranchiseRif } from '../value-objects/franchise.rif'

export class FranchiseCreatedEvent extends DomainEvent {
    constructor(
        private _id: FranchiseId,
        private _name: FranchiseName,
        private _rif: FranchiseRif,
        private _groupId: FranchiseGroupId,
        private _image: FranchiseImage,
    ) {
        super()
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

    get id() {
        return this._id
    }

    get image() {
        return this._image
    }

    static eventName = FranchiseCreatedEvent.constructor.name
}
