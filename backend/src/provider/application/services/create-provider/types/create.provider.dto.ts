import { RegisterUserServiceDTO } from 'src/user/application/services/register-user/types/register.user.dto'

export type CreateProviderDTO = {
    groupId: string
} & RegisterUserServiceDTO
