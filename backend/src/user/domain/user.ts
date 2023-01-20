import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { UserCreatedEvent } from './events/user.created'
import { UserDeletedEvent } from './events/user.deleted'
import { UserEmailChangedEvent } from './events/user.email.changed'
import { UserPasswordChangedEvent } from './events/user.password.changed'
import { UserUsernameChangedEvent } from './events/user.username.changed'
import { InvalidUserException } from './exceptions/invalid.user'
import { Email } from './value-objects/email'
import { Password } from './value-objects/password'
import { Role } from './value-objects/role'
import { UserId } from './value-objects/user.id'
import { Username } from './value-objects/username'

export class User extends AggregateRoot<UserId> {
    private constructor(
        _id: UserId,
        private _username: Username,
        private _password: Password,
        private _email: Email,
        private _role: Role,
    ) {
        super(_id)
        this.apply(
            new UserCreatedEvent(
                this.id,
                this.username,
                this.password,
                this.email,
                this.role,
            ),
        )
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
        this.apply(new UserUsernameChangedEvent(this.id, this.username))
    }

    changePassword(newPassword: Password) {
        this._password = newPassword
        this.apply(new UserPasswordChangedEvent(this.id, this.password))
    }

    changeEmail(newEmail: Email) {
        this._email = newEmail
        this.apply(new UserEmailChangedEvent(this.id, this.email))
    }

    delete() {
        this.apply(new UserDeletedEvent(this.id))
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

    static create(
        id: UserId,
        username: Username,
        password: Password,
        email: Email,
        role: Role,
    ) {
        return new User(id, username, password, email, role)
    }
}
