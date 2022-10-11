import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { UserId } from 'src/user/domain/value-objects/user.id'
import { Username } from 'src/user/domain/value-objects/username'
import { UserNotFoundException } from '../../exceptions/user.not.found'
import { UserRepository } from '../../repositories/user.repository'
import { ChangeUsernameDTO } from './types/change.username.dto'
import { ChangeUsernameResponse } from './types/change.username.response'

export class ChangeUsernameApplicationService
    implements ApplicationService<ChangeUsernameDTO, ChangeUsernameResponse>
{
    constructor(
        private userRepository: UserRepository,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: ChangeUsernameDTO): Promise<ChangeUsernameResponse> {
        const user = await this.userRepository.getById(new UserId(data.id))
        if (!user) throw new UserNotFoundException()
        user.changeUsername(new Username(data.username))
        await this.userRepository.save(user)
        this.eventHandler.publish(user.pullEvents())
        return {
            id: user.id.value,
        }
    }
}
