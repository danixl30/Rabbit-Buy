import { RegisterUserServiceDTO } from '../../register-user/types/register.user.dto'

export type RegisterAdminServiceDTO = {
    secretPass: string
} & RegisterUserServiceDTO
