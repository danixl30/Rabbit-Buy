import { ApplicationService } from 'src/core/application/service/application.service'
import { InvalidSecretPasswordException } from '../../exceptions/invalid.secret.password'
import { RegisterUserApplicationService } from '../register-user/register.user.application.service'
import { RegisterUserServiceResponse } from '../register-user/types/register.user.response'
import { RegisterAdminServiceDTO } from './types/register.admin.dto'

export class RegisterAdminApplicationService
    implements
        ApplicationService<
            RegisterAdminServiceDTO,
            RegisterUserServiceResponse
        >
{
    constructor(private registerUserService: RegisterUserApplicationService) {}

    async execute(
        data: RegisterAdminServiceDTO,
    ): Promise<RegisterUserServiceResponse> {
        if (data.secretPass !== '1234')
            throw new InvalidSecretPasswordException()
        return await this.registerUserService.execute(data)
    }
}
