import { DomainException } from 'src/core/domain/exception/domain.exception'

export const PASSWORDS_NOT_EQUALS = 'PASSWORDS_NOT_EQUALS'
export class PasswordsNotEqualsException extends DomainException {
    constructor() {
        super(PASSWORDS_NOT_EQUALS)
    }
}
