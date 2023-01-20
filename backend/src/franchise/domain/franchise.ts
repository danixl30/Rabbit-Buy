import { AgreggateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { FranchiseCreatedEvent } from './events/franchise.created'
import { FranchiseDeletedEvent } from './events/franchise.deleted'
import { FranchiseGroupIdChangedEvent } from './events/franchise.group.id.changed'
import { FranchiseImageChanged } from './events/franchise.image.changed'
import { InvalidFranchiseException } from './exceptions/invalid.franchise'
import { FranchiseGroupId } from './value-objects/franchise.group.id'
import { FranchiseId } from './value-objects/franchise.id'
import { FranchiseImage } from './value-objects/franchise.image'
import { FranchiseName } from './value-objects/franchise.name'
import { FranchiseRif } from './value-objects/franchise.rif'

export class Franchise extends AgreggateRoot<FranchiseId> {
    private constructor(
        id: FranchiseId,
        private _name: FranchiseName,
        private _rif: FranchiseRif,
        private _groupId: FranchiseGroupId,
        private _image: FranchiseImage,
    ) {
        super(id)
        this.apply(
            new FranchiseCreatedEvent(
                id,
                this.name,
                this.rif,
                this.groupId,
                _image,
            ),
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

    get image() {
        return this._image
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

    changeImage(image: FranchiseImage) {
        this._image = image
        this.apply(new FranchiseImageChanged(this.id, image))
    }

    delete() {
        this.apply(new FranchiseDeletedEvent(this.id))
    }

    validateState(): void {
        if (
            !this._id ||
            !this._name ||
            !this._rif ||
            !this._groupId ||
            !this.image
        )
            throw new InvalidFranchiseException()
    }

    static create(
        id: FranchiseId,
        name: FranchiseName,
        rif: FranchiseRif,
        groupId: FranchiseGroupId,
        image: FranchiseImage,
    ) {
        return new Franchise(id, name, rif, groupId, image)
    }
}
