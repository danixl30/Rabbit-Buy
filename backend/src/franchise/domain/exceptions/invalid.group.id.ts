import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_GROUP_ID = 'INVALID_GROUP_ID'
export class InvalidGroupIdException extends DomainException {
    constructor() {
        super(INVALID_GROUP_ID)
    }
}
