import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_FRANCHISE_IMAGE = 'INVALID_FRANCHISE_IMAGE'
export class InvalidFranchiseImageException extends DomainException {
    constructor() {
        super(INVALID_FRANCHISE_IMAGE)
    }
}
