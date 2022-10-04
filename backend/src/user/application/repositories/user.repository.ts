import { Repository } from 'src/core/application/repository/repository'
import { User } from 'src/user/domain/user'
import { Email } from 'src/user/domain/value-objects/email'
import { UserId } from 'src/user/domain/value-objects/user.id'

export interface UserRepository extends Repository<UserId, User> {
    getById(userId: UserId): Promise<User>
    getByEmail(email: Email): Promise<User>
}
