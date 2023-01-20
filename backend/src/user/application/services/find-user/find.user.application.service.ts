import { ApplicationService } from 'src/core/application/service/application.service'
import { UserId } from 'src/user/domain/value-objects/user.id'
import { UserNotFoundException } from '../../exceptions/user.not.found'
import { UserRepository } from '../../repositories/user.repository'
import { FindUserDTO } from './types/dto'
import { FindUserResponse } from './types/response'

export class FindUserApplicationService
    implements ApplicationService<FindUserDTO, FindUserResponse>
{
    constructor(private userRepository: UserRepository) {}

    async execute(data: FindUserDTO): Promise<FindUserResponse> {
        const user = await this.userRepository.getById(UserId.create(data.id))
        if (!user) throw new UserNotFoundException()
        return {
            id: user.id.value,
            username: user.username.value,
            email: user.email.value,
            role: user.role.value,
        }
    }
}
