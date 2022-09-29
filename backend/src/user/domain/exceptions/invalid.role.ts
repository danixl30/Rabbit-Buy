import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_ROLE = 'INVALID_ROLE'
export class InvalidRoleException extends DomainException {
    constructor() {
        super(INVALID_ROLE)
    }
}
