import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_USERNAME = 'INVALID_USERNAME'
export class InvalidUsernameException extends DomainException {
    constructor() {
        super(INVALID_USERNAME)
    }
}
