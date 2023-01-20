import { Crypto } from 'src/core/application/crypto/crypto'
import { ApplicationService } from 'src/core/application/service/application.service'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { User } from 'src/user/domain/user'
import { Email } from 'src/user/domain/value-objects/email'
import { Password } from 'src/user/domain/value-objects/password'
import { Role } from 'src/user/domain/value-objects/role'
import { UserId } from 'src/user/domain/value-objects/user.id'
import { Username } from 'src/user/domain/value-objects/username'
import { EmailNotUnicException } from '../../exceptions/email.not.unic'
import { PasswordsNotEqualsException } from '../../exceptions/passwords.not.equals'
import { UserRepository } from '../../repositories/user.repository'
import { RegisterUserServiceDTO } from './types/register.user.dto'
import { RegisterUserServiceResponse } from './types/register.user.response'

export class RegisterUserApplicationService
    implements
        ApplicationService<RegisterUserServiceDTO, RegisterUserServiceResponse>
{
    constructor(
        private userRepository: UserRepository,
        private crypto: Crypto,
        private uuidGenerator: UUIDGenerator,
    ) {}

    async execute(
        data: RegisterUserServiceDTO,
    ): Promise<RegisterUserServiceResponse> {
        if (data.password !== data.confirmPassword)
            throw new PasswordsNotEqualsException()
        const userPossible = await this.userRepository.getByEmail(
            Email.create(data.email),
        )
        if (userPossible) throw new EmailNotUnicException()
        const user = User.create(
            UserId.create(this.uuidGenerator.generate()),
            Username.create(data.username),
            Password.create(this.crypto.encrypt(data.password)),
            Email.create(data.email),
            Role.create(data.role),
        )
        await this.userRepository.save(user)
        return {
            id: user.id.value,
            role: user.role.value,
        }
    }
}
