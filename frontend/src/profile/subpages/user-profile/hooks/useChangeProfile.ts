import { useEffect, useState } from 'react'
import { UseSession } from '../../../../core/abstractions/session/session'
import { UseToast } from '../../../../core/abstractions/toast/toast'
import { UserState } from '../../../../global-state/user/UserContext'
import { UseUserService } from '../../../../services/abstractions/user/user-service'
import { regExpEmail } from '../../../../utils/reg-exps/email/email.reg.exp'
import { regExpPassword } from '../../../../utils/reg-exps/password/password.reg.exp'

export const useChangeProfile = (
    userService: UseUserService,
    userState: UserState,
    session: UseSession,
    toast: UseToast,
) => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorUsername, setErrorUsername] = useState('')

    const onChangeEmail = (value: string) => setEmail(value.trim())

    const onChangePassword = (value: string) => setPassword(value.trim())

    const onChangeUsername = (value: string) => setUsername(value)

    const onSubmitEmail = async () => {
        onClickChangeEmail()
    }

    const onSubmitPassword = async () => {
        onClickChangePassword()
    }

    const onSubminUsername = async () => {
        onClickChangeUsername()
    }

    const onDeleteUser = async () => {}

    const updateUserState = async () => {
        const user = await userService.getUser(session.getSession()!!)
        userState.putUser(user)
    }

    const onClickChangeUsername = async () => {
        if (!username || errorUsername) {
            toast.error('Usuario invalido')
            return
        }
        const onFinish = toast.pending('Procesando...')
        try {
            await userService.changeUsername(session.getSession()!!, {
                username,
            })
            onFinish('Cambio realizado con exito', 'success')
            await updateUserState()
        } catch (e) {
            onFinish('Error al realizar el cambio', 'error')
        }
    }

    const onClickChangePassword = async () => {
        if (!password || errorPassword) {
            toast.error('Contraseña invalida')
            return
        }
        const onFinish = toast.pending('Procesando...')
        try {
            await userService.changePassword(session.getSession()!!, {
                password,
            })
            onFinish('Cambio realizado con exito', 'success')
        } catch (e) {
            onFinish('Error al realizar el cambio', 'error')
        }
    }

    const onClickChangeEmail = async () => {
        if (!email || errorEmail) {
            toast.error('Correo invalido')
            return
        }
        const onFinish = toast.pending('Procesando...')
        try {
            await userService.changeEmail(session.getSession()!!, {
                email,
            })
            onFinish('Cambio realizado con exito', 'success')
            await updateUserState()
        } catch (e) {
            onFinish('Error al realizar el cambio', 'error')
        }
    }

    useEffect(() => {
        if (email && !regExpEmail.test(email)) setErrorEmail('Correo no válido')
        else setErrorEmail('')
    }, [email])

    useEffect(() => {
        if (username && username.length < 5)
            setErrorUsername('Nombre de usuario no válido')
        else if (username.length > 20) setErrorUsername('Muy largo...')
        else setErrorUsername('')
    }, [username])

    useEffect(() => {
        if (password && !regExpPassword.test(password))
            setErrorPassword('Contraseña no válida')
        else setErrorPassword('')
    }, [password])

    return {
        username,
        email,
        password,
        onChangeEmail,
        onChangePassword,
        onChangeUsername,
        errorEmail,
        errorPassword,
        errorUsername,
        onSubmitEmail,
        onSubminUsername,
        onSubmitPassword,
        onDeleteUser,
    }
}
