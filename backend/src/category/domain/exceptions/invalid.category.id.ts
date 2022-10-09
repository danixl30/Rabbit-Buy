import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_CATEGORY_ID = 'INVALID_CATEGORY_ID'
export class InvalidCategoryIdException extends DomainException {
    constructor() {
        super(INVALID_CATEGORY_ID)
    }
}
