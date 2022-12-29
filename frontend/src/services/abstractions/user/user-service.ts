import { User } from '../../../global-state/user/types/user'
import { AdminRegister } from './types/admin-register'
import { ChangeEmail } from './types/change-email'
import { ChangePassword } from './types/change-password'
import { ChangeUsername } from './types/change-username'
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
    delete(token: string): Promise<boolean>
    changePassword(token: string, dto: ChangePassword): Promise<boolean>
    changeUsername(token: string, dto: ChangeUsername): Promise<boolean>
    changeEmail(token: string, dto: ChangeEmail): Promise<boolean>
}
