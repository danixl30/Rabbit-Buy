import {DomainException} from "src/core/domain/exception/domain.exception";

export const INVALID_CLIEN_ID = 'INVALID_CLIEN_ID'
export class InvalidClientIdException extends DomainException {
    constructor() {
        super(INVALID_CLIEN_ID)
    }
}
