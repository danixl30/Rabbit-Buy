import { UserRegister } from './user-register'

export type AdminRegister = UserRegister & {
    secretPass: string
}
