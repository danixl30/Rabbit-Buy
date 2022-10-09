import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_PRODUCT_CURRENCY = 'INVALID_PRODUCT_CURRENCY'
export class InvalidProductCurrencyException extends DomainException {
    constructor() {
        super(INVALID_PRODUCT_CURRENCY)
    }
}
