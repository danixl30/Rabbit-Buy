import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_PASSWORD = 'INVALID_PASSWORD'
export class InvalidPasswordException extends DomainException {
    constructor() {
        super(INVALID_PASSWORD)
    }
}
