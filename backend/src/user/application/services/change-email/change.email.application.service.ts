import { EventHandler } from 'src/core/application/event-handler/event.handler'
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
    constructor(
        private userRepository: UserRepository,
        private eventHandler: EventHandler,
    ) {}

    async execute(data: ChangeEmailDTO): Promise<ChangeEmailResponse> {
        const possibleUser = await this.userRepository.getByEmail(
            Email.create(data.email),
        )
        if (possibleUser) throw new EmailNotUnicException()
        const user = await this.userRepository.getById(UserId.create(data.id))
        if (!user) throw new UserNotFoundException()
        user.changeEmail(Email.create(data.email))
        await this.userRepository.save(user)
        this.eventHandler.publish(user.pullEvents())
        return {
            id: user.id.value,
        }
    }
}
