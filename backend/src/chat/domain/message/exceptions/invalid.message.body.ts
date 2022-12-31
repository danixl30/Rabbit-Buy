import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_MESSAGE_BODY = 'INVALID_MESSAGE_BODY'
export class InvalidMessageBodyException extends DomainException {
    constructor() {
        super(INVALID_MESSAGE_BODY)
    }
}
