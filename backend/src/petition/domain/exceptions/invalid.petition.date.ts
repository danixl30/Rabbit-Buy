import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_PETITION_DATE = 'INVALID_PETITION_DATE'
export class InvalidPetitionDateException extends DomainException {
    constructor() {
        super(INVALID_PETITION_DATE)
    }
}
