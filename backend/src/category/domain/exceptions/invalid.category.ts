import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_CATEGORY = 'INVALID_CATEGORY'
export class InvalidCategoryException extends DomainException {
    constructor() {
        super(INVALID_CATEGORY)
    }
}
