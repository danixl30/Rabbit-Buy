import { DomainException } from 'src/core/domain/exception/domain.exception'

export const USER_NOT_FOUND = 'USER_NOT_FOUND'
export class UserNotFoundException extends DomainException {
    constructor() {
        super(USER_NOT_FOUND)
    }
}
