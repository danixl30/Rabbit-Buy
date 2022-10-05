import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_PROVIDER = 'INVALID_PROVIDER'
export class InvalidProviderException extends DomainException {
    constructor() {
        super(INVALID_PROVIDER)
    }
}
