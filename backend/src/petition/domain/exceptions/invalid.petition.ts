import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_PETITION = 'INVALID_PETITION'
export class InvalidPetitionException extends DomainException {
    constructor() {
        super(INVALID_PETITION)
    }
}
