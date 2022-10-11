import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { UserId } from 'src/user/domain/value-objects/user.id'
import { UserNotFoundException } from '../../exceptions/user.not.found'
import { UserRepository } from '../../repositories/user.repository'
import { DeleteUserDTO } from './types/delete.user.dto'
import { DeleteUserResponse } from './types/delete.user.response'

export class DeleteUserApplicationService
    implements ApplicationService<DeleteUserDTO, DeleteUserResponse>
{
    constructor(
        private userRepository: UserRepository,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: DeleteUserDTO): Promise<DeleteUserDTO> {
        const user = await this.userRepository.getById(new UserId(data.id))
        if (!user) throw new UserNotFoundException()
        user.delete()
        await this.userRepository.delete(user)
        this.eventHandler.publish(user.pullEvents())
        return {
            id: user.id.value,
        }
    }
}
