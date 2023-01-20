import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { InvalidPasswordException } from '../exceptions/invalid.password'

export class Password implements ValueObject<Password> {
    private constructor(private password: string) {
        if (!password || password.isEmpty())
            throw new InvalidPasswordException()
    }

    get value(): string {
        return this.password
    }

    equals(other: Password): boolean {
        return other.value === this.value
    }

    static create(password: string) {
        return new Password(password)
    }
}
