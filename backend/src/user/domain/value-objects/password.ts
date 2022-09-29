import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpPassword } from 'src/utils/reg-exps/password/password.reg.exp'
import { InvalidPasswordException } from '../exceptions/invalid.password'

export class Password implements ValueObject<Password> {
    constructor(private password: string) {
        if (!regExpPassword.test(this.password))
            throw new InvalidPasswordException()
    }

    get value(): string {
        return this.password
    }

    equals(other: Password): boolean {
        return other.value === this.value
    }
}
