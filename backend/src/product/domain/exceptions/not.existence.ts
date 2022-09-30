import { DomainException } from 'src/core/domain/exception/domain.exception'

export const NOT_EXISTENCE = 'NOT_EXISTENCE'
export class NotExistenceException extends DomainException {
    constructor() {
        super(NOT_EXISTENCE)
    }
}
