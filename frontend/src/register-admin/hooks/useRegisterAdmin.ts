import { useState, useEffect } from 'react'
import { UseNavigation } from '../../core/abstractions/navigation/navigation'
import { UseToast } from '../../core/abstractions/toast/toast'
import { LOGIN_PAGE } from '../../login/page/route'
import { UseUserService } from '../../services/abstractions/user/user-service'
import { regExpEmail } from '../../utils/reg-exps/email/email.reg.exp'
import { regExpPassword } from '../../utils/reg-exps/password/password.reg.exp'

export const useRegisterAdmin = (
    service: UseUserService,
    navigation: UseNavigation,
    toast: UseToast,
) => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [secretPass, setSecretPass] = useState('')
    const [loading, setLoading] = useState(false)

    const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorUsername, setErrorUsername] = useState('')

    const onChangeEmail = (value: string) => setEmail(value.trim())

    const onChangePassword = (value: string) => setPassword(value.trim())

    const onChangeUsername = (value: string) => setUsername(value)

    const onChangeConfirmPassword = (value: string) =>
        setConfirmPassword(value.trim())

    const onChangeSecretPass = (value: string) => setSecretPass(value.trim())

    const onSubmit = async () => {
        if (!submitable) {
            toast.warning('Datos inválidos')
            return
        }
        setLoading(true)
        const onResult = toast.pending('Procesando...')
        try {
            await service.registerAdmin({
                username,
                password,
                confirmPassword,
                email,
                secretPass,
            })
            onResult('Registro satisfactorio', 'success')
            navigation.goTo(LOGIN_PAGE)
        } catch (e: any) {
            if (e.response?.status === 400)
                onResult('El administrador ya existe', 'error')
            else if (e.response?.body?.message === 'INVALID_SECRET_PASSWORD')
                onResult('Código secreto inválida', 'error')
            else onResult('Hubo un error en el registro', 'error')
        }
        setLoading(false)
    }

    useEffect(() => {
        if (email && !regExpEmail.test(email)) setErrorEmail('Email no valido')
        else setErrorEmail('')
    }, [email])

    useEffect(() => {
        if (username && username.length < 5)
            setErrorUsername('Nombre de usuario no válido')
        else setErrorUsername('')
    }, [username])

    useEffect(() => {
        if (password && !regExpPassword.test(password))
            setErrorPassword('Contraseña no válida')
        else setErrorPassword('')
    }, [password])

    useEffect(() => {
        if (confirmPassword && confirmPassword !== password)
            setErrorConfirmPassword('Debe ser igual a la contraseña')
        else setErrorConfirmPassword('')
    }, [confirmPassword])

    const submitable =
        email &&
        username &&
        password &&
        confirmPassword &&
        !errorEmail &&
        !errorPassword &&
        !errorUsername &&
        !errorConfirmPassword &&
        secretPass

    return {
        username,
        email,
        password,
        confirmPassword,
        secretPass,
        onChangeEmail,
        onChangePassword,
        onChangeUsername,
        onChangeConfirmPassword,
        onChangeSecretPass,
        errorEmail,
        errorPassword,
        errorUsername,
        errorConfirmPassword,
        submitable,
        onSubmit,
        loading,
    }
}
