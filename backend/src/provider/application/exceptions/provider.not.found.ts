import { DomainException } from 'src/core/domain/exception/domain.exception'

export const PROVIDER_NOT_FOUND = 'PROVIDER_NOT_FOUND'
export class ProviderNotFoundException extends DomainException {
    constructor() {
        super(PROVIDER_NOT_FOUND)
    }
}
