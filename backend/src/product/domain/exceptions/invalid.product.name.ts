import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_PRODUCT_NAME = 'INVALID_PRODUCT_NAME'
export class InvalidProductNameException extends DomainException {
    constructor() {
        super(INVALID_PRODUCT_NAME)
    }
}
