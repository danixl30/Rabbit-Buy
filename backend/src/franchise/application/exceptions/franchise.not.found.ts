import { DomainException } from 'src/core/domain/exception/domain.exception'

export const FRANCHISE_NOT_FOUND = 'FRANCHISE_NOT_FOUND'
export class FranchiseNotFoundException extends DomainException {
    constructor() {
        super(FRANCHISE_NOT_FOUND)
    }
}
