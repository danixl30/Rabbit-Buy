import { DomainException } from 'src/core/domain/exception/domain.exception'

export const CATEGORY_NOT_FOUND = 'CATEGORY_NOT_FOUND'
export class CategoryNotFoundException extends DomainException {
    constructor() {
        super(CATEGORY_NOT_FOUND)
    }
}
