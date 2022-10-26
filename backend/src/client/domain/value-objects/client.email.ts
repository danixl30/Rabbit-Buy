import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpEmail } from 'src/utils/reg-exps/email/email.reg.exp'
import { InvalidClientEmailException } from '../exceptions/invalid.client.email'

export class ClientEmail implements ValueObject<ClientEmail> {
    constructor(private email: string) {
        if (!regExpEmail.test(this.email))
            throw new InvalidClientEmailException()
    }

    get value(): string {
        return this.email
    }
    equals(other: ClientEmail): boolean {
        return other.value === this.value
    }
}
