import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_PRODUCT = 'INVALID_PRODUCT'
export class InvalidProductException extends DomainException {
    constructor() {
        super(INVALID_PRODUCT)
    }
}
