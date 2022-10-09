import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_CATEGORY_NAME = 'INVALID_CATEGORY_NAME'
export class InvalidCategoryNameException extends DomainException {
    constructor() {
        super(INVALID_CATEGORY_NAME)
    }
}
