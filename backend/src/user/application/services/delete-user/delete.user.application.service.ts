import { ApplicationService } from 'src/core/application/service/application.service'
import { UserId } from 'src/user/domain/value-objects/user.id'
import { UserNotFoundException } from '../../exceptions/user.not.found'
import { UserRepository } from '../../repositories/user.repository'
import { DeleteUserDTO } from './types/delete.user.dto'
import { DeleteUserResponse } from './types/delete.user.response'

export class DeleteUserApplicationService
    implements ApplicationService<DeleteUserDTO, DeleteUserResponse>
{
    constructor(private userRepository: UserRepository) {}

    async execute(data: DeleteUserDTO): Promise<DeleteUserDTO> {
        const user = await this.userRepository.getById(new UserId(data.id))
        if (!user) throw new UserNotFoundException()
        await this.userRepository.delete(user)
        return {
            id: user.id.value,
        }
    }
}
