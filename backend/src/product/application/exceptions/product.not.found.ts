import { DomainException } from 'src/core/domain/exception/domain.exception'

export const PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND'
export class ProductNotFoundException extends DomainException {
    constructor() {
        super(PRODUCT_NOT_FOUND)
    }
}
