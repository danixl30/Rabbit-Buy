import { Roles } from 'src/user/domain/value-objects/roles'

export type RegisterUserServiceDTO = {
    username: string
    password: string
    email: string
    confirmPassword: string
    role: Roles
}
