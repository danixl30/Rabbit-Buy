import { DomainException } from 'src/core/domain/exception/domain.exception'

export const INVALID_CHAT = 'INVALID_CHAT'
export class InvalidChatException extends DomainException {
    constructor() {
        super(INVALID_CHAT)
    }
}
