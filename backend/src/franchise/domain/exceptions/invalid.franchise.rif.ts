import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_FRANCHISE_RIF = 'INVALID_FRANCHISE_RIF'
export class InvalidFranchiseRifException extends DomainException {
    constructor() {
        super(INVALID_FRANCHISE_RIF)
    }
}
