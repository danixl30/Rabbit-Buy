import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_FRANCHISE_ID = 'INVALID_FRANCHISE_ID'
export class InvalidFranchiseIdException extends DomainException {
    constructor() {
        super(INVALID_FRANCHISE_ID)
    }
}
