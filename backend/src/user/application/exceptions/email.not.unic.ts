import { DomainException } from 'src/core/domain/exception/domain.exception'

export const EMAIL_NOT_UNIC = 'EMAIL_NOT_UNIC'
export class EmailNotUnicException extends DomainException {
    constructor() {
        super(EMAIL_NOT_UNIC)
    }
}
