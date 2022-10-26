import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_CLIEN_NAME = 'INVALID_CLIEN_NAME'
export class InvalidClientNameException extends DomainException {
    constructor() {
        super(INVALID_CLIEN_NAME)
    }
}
