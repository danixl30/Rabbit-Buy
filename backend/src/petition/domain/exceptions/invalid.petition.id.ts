import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_PETITION_ID = 'INVALID_PETITION_ID'
export class InvalidPetitionIdException extends DomainException {
    constructor() {
        super(INVALID_PETITION_ID)
    }
}
