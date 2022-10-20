import { User } from 'src/user/domain/user'
import { Email } from 'src/user/domain/value-objects/email'
import { Password } from 'src/user/domain/value-objects/password'
import { Role } from 'src/user/domain/value-objects/role'
import { UserId } from 'src/user/domain/value-objects/user.id'
import { Username } from 'src/user/domain/value-objects/username'
import { UserDocument } from '../models/user.model'

export const userDocumentToDomain = (user: UserDocument): User =>
    new User(
        new UserId(user.id),
        new Username(user.name),
        new Password(user.password),
        new Email(user.email),
        new Role(user.role),
    )
