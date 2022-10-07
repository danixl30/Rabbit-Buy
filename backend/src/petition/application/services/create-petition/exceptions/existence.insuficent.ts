import { DomainException } from 'src/core/domain/exception/domain.exception'

export const EXISTENCE_INSUFICENT = 'EXISTENCE_INSUFICENT'
export class ExistenceInsuficentException extends DomainException {
    constructor() {
        super(EXISTENCE_INSUFICENT)
    }
}
