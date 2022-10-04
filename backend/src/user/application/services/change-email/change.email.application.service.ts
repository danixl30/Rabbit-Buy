import { ApplicationService } from 'src/core/application/service/application.service'
import { Email } from 'src/user/domain/value-objects/email'
import { UserId } from 'src/user/domain/value-objects/user.id'
import { EmailNotUnicException } from '../../exceptions/email.not.unic'
import { UserNotFoundException } from '../../exceptions/user.not.found'
import { UserRepository } from '../../repositories/user.repository'
import { ChangeEmailDTO } from './types/change.email.dto'
import { ChangeEmailResponse } from './types/change.email.response'

export class ChangeEmailApplicationService
    implements ApplicationService<ChangeEmailDTO, ChangeEmailResponse>
{
    constructor(private userRepository: UserRepository) {}

    async execute(data: ChangeEmailDTO): Promise<ChangeEmailResponse> {
        const possibleUser = await this.userRepository.getByEmail(
            new Email(data.email),
        )
        if (possibleUser) throw new EmailNotUnicException()
        const user = await this.userRepository.getById(new UserId(data.id))
        if (!user) throw new UserNotFoundException()
        user.changeEmail(new Email(data.email))
        await this.userRepository.save(user)
        return {
            id: user.id.value,
        }
    }
}
