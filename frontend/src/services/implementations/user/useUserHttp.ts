import { UseHttp } from '../../../core/abstractions/http/http'
import { User } from '../../../global-state/user/types/user'
import { AdminRegister } from '../../abstractions/user/types/admin-register'
import { Login } from '../../abstractions/user/types/login'
import { LoginResponse } from '../../abstractions/user/types/login-response'
import { ProviderRegister } from '../../abstractions/user/types/provider-register'
import { UserRegister } from '../../abstractions/user/types/user-register'
import { UseUserService } from '../../abstractions/user/user-service'

export const useUserHttp = (http: UseHttp): UseUserService => {
    const login = async (data: Login): Promise<LoginResponse> => {
        const { job } = http.post<Login, LoginResponse>({
            url: '/user/auth/login',
            body: data,
        })
        return (await job()).body!!
    }

    const register = async (data: UserRegister) => {
        const { job } = http.post<UserRegister, unknown>({
            url: '/user/register',
            body: data,
        })
        await job()
        return true
    }

    const registerProvider = async (data: ProviderRegister) => {
        const { job } = http.post<ProviderRegister, unknown>({
            url: '/provider/create',
            body: data,
        })
        await job()
        return true
    }

    const registerAdmin = async (data: AdminRegister) => {
        const { job } = http.post<AdminRegister, unknown>({
            url: '/user/register/admin',
            body: data,
        })
        await job()
        return true
    }

    const getUser = async (token: string) => {
        const { job } = http.get<unknown, User>({
            url: '/user',
            headers: {
                auth: token,
            },
        })
        return (await job()).body!!
    }

    return {
        login,
        register,
        registerAdmin,
        registerProvider,
        getUser,
    }
}
