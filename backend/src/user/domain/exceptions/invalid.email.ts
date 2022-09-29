import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_EMAIL = 'INVALID_EMAIL'
export class InvalidEmailException extends DomainException {
    constructor() {
        super(INVALID_EMAIL)
    }
}
