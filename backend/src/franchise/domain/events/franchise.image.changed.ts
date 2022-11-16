import { DomainEvent } from 'src/core/domain/events/event'
import { FranchiseId } from '../value-objects/franchise.id'
import { FranchiseImage } from '../value-objects/franchise.image'

export class FranchiseImageChanged extends DomainEvent {
    constructor(private _id: FranchiseId, private _image: FranchiseImage) {
        super()
    }

    get id() {
        return this._id
    }

    get image() {
        return this._image
    }

    static eventName = this.prototype.constructor.name
}
