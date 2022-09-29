import { Roles } from 'src/user/domain/value-objects/roles'

export type RegisterUserServiceResponse = {
    id: string
    role: Roles
}
