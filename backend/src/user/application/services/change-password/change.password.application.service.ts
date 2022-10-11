import { Crypto } from 'src/core/application/crypto/crypto'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { Password } from 'src/user/domain/value-objects/password'
import { UserId } from 'src/user/domain/value-objects/user.id'
import { UserNotFoundException } from '../../exceptions/user.not.found'
import { UserRepository } from '../../repositories/user.repository'
import { ChangePasswordDTO } from './types/change.password.dto'
import { ChangePasswordResponse } from './types/change.password.response'

export class ChangePasswordApplicationService
    implements ApplicationService<ChangePasswordDTO, ChangePasswordResponse>
{
    constructor(
        private userRepository: UserRepository,
        private crypto: Crypto,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: ChangePasswordDTO): Promise<ChangePasswordResponse> {
        const user = await this.userRepository.getById(new UserId(data.id))
        if (!user) throw new UserNotFoundException()
        user.changePassword(new Password(this.crypto.encrypt(data.password)))
        await this.userRepository.save(user)
        this.eventHandler.publish(user.pullEvents())
        return {
            id: user.id.value,
        }
    }
}
