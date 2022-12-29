import { DomainException } from 'src/core/domain/exception/domain.exception'

export const MESSAGE_EXIST = 'MESSAGE_EXIST'
export class MessageExistException extends DomainException {
    constructor() {
        super(MESSAGE_EXIST)
    }
}
