import {DomainException} from "src/core/domain/exception/domain.exception";

export const INVALID_CLIEN_EMAIL = 'INVALID_CLIEN_EMAIL'
export class InvalidClientEmailException extends DomainException {
    constructor() {
        super(INVALID_CLIEN_EMAIL)
    }
}
