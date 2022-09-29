import { Crypto } from 'src/core/application/crypto/crypto'
import { ApplicationService } from 'src/core/application/service/application.service'
import { TokenProvider } from 'src/core/application/token/token.provider'
import { Email } from 'src/user/domain/value-objects/email'
import { InvalidPasswordException } from '../../exceptions/invalid.password'
import { UserNotFoundException } from '../../exceptions/user.not.found'
import { UserRepository } from '../../repositories/user.repository'
import { LoginServiceDTO } from './types/login.dto'
import { LoginResponse } from './types/login.response'

export class LoginApplicationService
    implements ApplicationService<LoginServiceDTO, LoginResponse>
{
    constructor(
        private userRepository: UserRepository,
        private crypto: Crypto,
        private tokenManager: TokenProvider,
    ) {}
    async execute(data: LoginServiceDTO): Promise<LoginResponse> {
        const user = await this.userRepository.getByEmail(new Email(data.email))
        if (!user) throw new UserNotFoundException()
        if (!this.crypto.compare(data.password, user.password.value))
            throw new InvalidPasswordException()
        const token = this.tokenManager.sign({ id: user.id.value })
        return {
            token,
            role: user.role.value,
        }
    }
}
