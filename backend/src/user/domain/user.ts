import { AgreggateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { InvalidUserException } from './exceptions/invalid.user'
import { Email } from './value-objects/email'
import { Password } from './value-objects/password'
import { Role } from './value-objects/role'
import { UserId } from './value-objects/user.id'
import { Username } from './value-objects/username'

export class User extends AgreggateRoot<UserId> {
    constructor(
        _id: UserId,
        private _username: Username,
        private _password: Password,
        private _email: Email,
        private _role: Role,
    ) {
        super(_id)
    }

    get username() {
        return this._username
    }

    get password() {
        return this._password
    }

    get email() {
        return this._email
    }

    get role() {
        return this._role
    }

    changeUsername(newUsername: Username) {
        this._username = newUsername
    }

    changePassword(newPassword: Password) {
        this._password = newPassword
    }

    changeEmail(newEmail: Email) {
        this._email = newEmail
    }

    validateState(): void {
        if (
            !this.id ||
            !this.username ||
            !this.password ||
            !this.email ||
            !this.role
        ) {
            throw new InvalidUserException()
        }
    }
}
