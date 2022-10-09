import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_PETITION_QUANTITY = 'INVALID_PETITION_QUANTITY'
export class InvalidPetitionQuantityException extends DomainException {
    constructor() {
        super(INVALID_PETITION_QUANTITY)
    }
}
