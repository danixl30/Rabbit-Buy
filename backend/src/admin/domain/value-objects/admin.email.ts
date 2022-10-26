import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpEmail } from 'src/utils/reg-exps/email/email.reg.exp'
import {InvalidAdminEmailException} from '../exceptions/invalid.admin.email'

export class AdminEmail implements ValueObject<AdminEmail> {
    constructor(private email: string) {
        if (!regExpEmail.test(this.email)) throw new InvalidAdminEmailException()
    }

    get value(): string {
        return this.email
    }
    equals(other: AdminEmail): boolean {
        return other.value === this.value
    }
}
