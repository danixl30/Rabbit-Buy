import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_PETITION_STATUS = 'INVALID_PETITION_STATUS'
export class InvalidPetitionStatusException extends DomainException {
    constructor() {
        super(INVALID_PETITION_STATUS)
    }
}
