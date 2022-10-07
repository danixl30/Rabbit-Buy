import { DomainException } from 'src/core/domain/exception/domain.exception'

export const PETITION_NOT_FOUND = 'PETITION_NOT_FOUND'
export class PetitionNotFoundException extends DomainException {
    constructor() {
        super(PETITION_NOT_FOUND)
    }
}
