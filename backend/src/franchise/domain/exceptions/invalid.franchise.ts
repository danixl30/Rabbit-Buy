import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_FRANCHISE = 'INVALID_FRANCHISE'
export class InvalidFranchiseException extends DomainException {
    constructor() {
        super(INVALID_FRANCHISE)
    }
}
