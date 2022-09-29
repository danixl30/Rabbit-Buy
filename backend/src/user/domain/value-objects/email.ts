import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpEmail } from 'src/utils/reg-exps/email/email.reg.exp'
import { InvalidEmailException } from '../exceptions/invalid.email'

export class Email implements ValueObject<Email> {
    constructor(private email: string) {
        if (!regExpEmail.test(this.email)) throw new InvalidEmailException()
    }

    get value(): string {
        return this.email
    }
    equals(other: Email): boolean {
        return other.value === this.value
    }
}
