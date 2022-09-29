import { User } from 'src/user/domain/user'
import { Email } from 'src/user/domain/value-objects/email'
import { Password } from 'src/user/domain/value-objects/password'
import { Role } from 'src/user/domain/value-objects/role'
import { UserId } from 'src/user/domain/value-objects/user.id'
import { Username } from 'src/user/domain/value-objects/username'

export interface UserRepository {
    save(
        username: Username,
        email: Email,
        password: Password,
        role: Role,
    ): Promise<User>
    getById(userId: UserId): Promise<User>
    getByEmail(email: Email): Promise<User>
    changeUsername(userId: UserId, username: Username): Promise<User>
    changeEmail(userId: UserId, email: Email): Promise<User>
    changePassword(userId: UserId, password: Password): Promise<User>
    delete(user: User): Promise<User>
}
