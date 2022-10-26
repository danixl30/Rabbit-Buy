import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_SECRET_PASSWORD = 'INVALID_SECRET_PASSWORD'
export class InvalidSecretPasswordException extends DomainException {
    constructor() {
        super(INVALID_SECRET_PASSWORD)
    }
}
