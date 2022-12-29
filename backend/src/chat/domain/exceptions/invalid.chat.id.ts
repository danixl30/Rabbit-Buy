import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_CHAT_ID = 'INVALID_CHAT_ID'
export class InvalidChatIdException extends DomainException {
    constructor() {
        super(INVALID_CHAT_ID)
    }
}
