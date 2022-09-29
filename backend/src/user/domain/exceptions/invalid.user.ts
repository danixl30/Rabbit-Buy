import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_USER = 'INVALID_USER'
export class InvalidUserException extends DomainException {
    constructor() {
        super(INVALID_USER)
    }
}
