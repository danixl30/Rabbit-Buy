import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_PRODUCT_PRICE = 'INVALID_PRODUCT_PRICE'
export class InvalidProductPriceException extends DomainException {
    constructor() {
        super(INVALID_PRODUCT_PRICE)
    }
}
