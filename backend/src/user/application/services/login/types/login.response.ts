import { Roles } from 'src/user/domain/value-objects/roles'

export type LoginResponse = {
    token: string
    role: Roles
}
