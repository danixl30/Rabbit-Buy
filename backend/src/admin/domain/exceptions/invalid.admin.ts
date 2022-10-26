import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_ADMIN = 'INVALID_ADMIN'
export class InvalidAdminException extends DomainException {
    constructor() {
        super(INVALID_ADMIN)
    }
}
