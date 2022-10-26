import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_ADMIN_NAME = 'INVALID_ADMIN_NAME'
export class InvalidAdminNameException extends DomainException {
    constructor() {
        super(INVALID_ADMIN_NAME)
    }
}
