import { Admin } from 'src/admin/domain/admin'
import { AdminEmail } from 'src/admin/domain/value-objects/admin.email'
import { AdminId } from 'src/admin/domain/value-objects/admin.id'
import { AdminName } from 'src/admin/domain/value-objects/admin.name'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationService } from 'src/core/application/service/application.service'
import { RegisterUserApplicationService } from 'src/user/application/services/register-user/register.user.application.service'
import { RegisterUserServiceResponse } from 'src/user/application/services/register-user/types/register.user.response'
import { InvalidSecretPasswordException } from '../../exceptions/invalid.secret.password'
import { RegisterAdminServiceDTO } from './types/register.admin.dto'

export class RegisterAdminApplicationService
    implements
        ApplicationService<
            RegisterAdminServiceDTO,
            RegisterUserServiceResponse
        >
{
    constructor(
        private registerUserService: RegisterUserApplicationService,
        private eventHandler: EventHandler,
    ) {}

    async execute(
        data: RegisterAdminServiceDTO,
    ): Promise<RegisterUserServiceResponse> {
        if (data.secretPass !== '1234')
            throw new InvalidSecretPasswordException()
        const res = await this.registerUserService.execute(data)
        const admin = new Admin(
            new AdminId(res.id),
            new AdminName(data.username),
            new AdminEmail(data.email),
        )
        this.eventHandler.publish(admin.pullEvents())
        return res
    }
}
