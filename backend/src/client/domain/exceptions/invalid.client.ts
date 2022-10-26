import {DomainException} from "src/core/domain/exception/domain.exception";

export const INVALID_CLIENT = 'INVALID_CLIENT'
export class InvalidClientException extends DomainException {
    constructor() {
        super(INVALID_CLIENT)
    }
}
