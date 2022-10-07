import { Roles } from 'src/user/domain/value-objects/roles'

export type FindUserResponse = {
    id: string
    username: string
    email: string
    role: Roles
}
