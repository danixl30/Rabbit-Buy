import {User} from '../../../global-state/user/types/user'
import { AdminRegister } from './types/admin-register'
import { Login } from './types/login'
import { LoginResponse } from './types/login-response'
import { ProviderRegister } from './types/provider-register'
import { UserRegister } from './types/user-register'

export type UseUserService = {
    login: (data: Login) => Promise<LoginResponse>
    register: (data: UserRegister) => Promise<boolean>
    registerProvider: (data: ProviderRegister) => Promise<boolean>
    registerAdmin: (data: AdminRegister) => Promise<boolean>
    getUser(token: string): Promise<User>
}
