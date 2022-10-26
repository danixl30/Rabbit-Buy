import {DomainException} from "src/core/domain/exception/domain.exception";

export const INVALID_ADMIN_EMAIL = 'INVALID_ADMIN_EMAIL'
export class InvalidAdminEmailException extends DomainException {
    constructor() {
        super(INVALID_ADMIN_EMAIL)
    }
}
