import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_PRODUCT_ID = 'INVALID_PRODUCT_ID'
export class InvalidProductIdException extends DomainException {
    constructor() {
        super(INVALID_PRODUCT_ID)
    }
}
