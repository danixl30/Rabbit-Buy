import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_PROVIDER_ID = 'INVALID_PROVIDER_ID'
export class InvalidProviderIdException extends DomainException {
    constructor() {
        super(INVALID_PROVIDER_ID)
    }
}
