import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_FRANCHISE_NAME = 'INVALID_FRANCHISE_NAME'
export class InvalidFranchiseNameException extends DomainException {
    constructor() {
        super(INVALID_FRANCHISE_NAME)
    }
}
