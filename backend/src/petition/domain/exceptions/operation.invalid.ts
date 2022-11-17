import { DomainException } from 'src/core/domain/exception/domain.exception'

export const OPERATION_INVALID = 'OPERATION_INVALID'
export class OperationInvalidException extends DomainException {
    constructor() {
        super(OPERATION_INVALID)
    }
}
