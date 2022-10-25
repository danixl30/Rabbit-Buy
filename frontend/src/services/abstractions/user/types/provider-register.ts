import { UserRegister } from './user-register'

export type ProviderRegister = UserRegister & {
    groupId: string
}
