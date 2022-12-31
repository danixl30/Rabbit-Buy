import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_MESSAGE_ID = 'INVALID_MESSAGE_ID'
export class InvalidMessageIdException extends DomainException {
    constructor() {
        super(INVALID_MESSAGE_ID)
    }
}
