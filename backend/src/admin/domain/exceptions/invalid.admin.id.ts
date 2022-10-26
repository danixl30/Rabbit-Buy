import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_ADMIN_ID = 'INVALID_ADMIN_ID'
export class InvalidAdminIdException extends DomainException {
    constructor() {
        super(INVALID_ADMIN_ID)
    }
}
