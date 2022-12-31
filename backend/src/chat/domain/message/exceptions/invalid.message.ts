import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_MESSAGE = 'INVALID_MESSAGE'
export class InvalidMessageException extends DomainException {
    constructor() {
        super(INVALID_MESSAGE)
    }
}
