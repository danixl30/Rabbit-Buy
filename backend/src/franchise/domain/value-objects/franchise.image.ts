import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { InvalidFranchiseImageException } from '../exceptions/invalid.franchise.image'

export class FranchiseImage implements ValueObject<FranchiseImage> {
    constructor(private image: string) {
        if (!image) throw new InvalidFranchiseImageException()
    }

    get value() {
        return this.image
    }

    equals(other: FranchiseImage): boolean {
        return other.value === this.value
    }
}
