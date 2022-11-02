import { useState, useEffect } from 'react'
import { UseNavigation } from '../../core/abstractions/navigation/navigation'
import { UseToast } from '../../core/abstractions/toast/toast'
import { LOGIN_PAGE } from '../../login/page/route'
import { UseUserService } from '../../services/abstractions/user/user-service'
import { regExpEmail } from '../../utils/reg-exps/email/email.reg.exp'
import { regExpPassword } from '../../utils/reg-exps/password/password.reg.exp'
import { regExpUUID } from '../../utils/reg-exps/UUID/UUID.reg.exp'

export const useRegisterProvider = (
    service: UseUserService,
    navigation: UseNavigation,
    toast: UseToast,
) => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [groupId, setGroupId] = useState('')
    const [loading, setLoading] = useState(false)

    const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorUsername, setErrorUsername] = useState('')
    const [errorGroupId, setErrorGroupId] = useState('')

    const onChangeEmail = (value: string) => setEmail(value.trim())

    const onChangePassword = (value: string) => setPassword(value.trim())

    const onChangeUsername = (value: string) => setUsername(value)

    const onChangeConfirmPassword = (value: string) =>
        setConfirmPassword(value.trim())

    const onChangeGroupId = (value: string) => setGroupId(value.trim())

    const onSubmit = async () => {
        if (!submitable) {
            toast.warning('Datos no validos')
            return
        }
        setLoading(true)
        const onResult = toast.pending('Procesando')
        try {
            await service.registerProvider({
                username,
                email,
                password,
                confirmPassword,
                groupId,
            })
            onResult('Proveedor creado satisfactoriamente', 'success')
            navigation.goTo(LOGIN_PAGE)
        } catch (e: any) {
            if (e.response?.status === 403)
                onResult('El proveedor ya existe', 'error')
            else onResult('Ha ocurrido un error en el registro', 'error')
        }
        setLoading(false)
    }

    useEffect(() => {
        if (email && !regExpEmail.test(email)) setErrorEmail('Email no valido')
        else setErrorEmail('')
    }, [email])

    useEffect(() => {
        if (username && username.length < 5)
            setErrorUsername('Nombre de usuario no valido')
        else if (username.length > 20) setErrorUsername('Muy largo...')
        else setErrorUsername('')
    }, [username])

    useEffect(() => {
        if (password && !regExpPassword.test(password))
            setErrorPassword('Contrasena no valida')
        else setErrorPassword('')
    }, [password])

    useEffect(() => {
        if (confirmPassword && confirmPassword !== password)
            setErrorConfirmPassword('Debe ser igual a la contrasena')
        else setErrorConfirmPassword('')
    }, [confirmPassword])

    useEffect(() => {
        if (groupId && !regExpUUID.test(groupId))
            setErrorGroupId('Invalid groupId')
        else setErrorGroupId('')
    }, [groupId])

    const submitable =
        email &&
        username &&
        password &&
        confirmPassword &&
        !errorEmail &&
        !errorPassword &&
        !errorUsername &&
        !errorConfirmPassword &&
        groupId &&
        !errorGroupId

    return {
        username,
        email,
        password,
        confirmPassword,
        groupId,
        onChangeEmail,
        onChangePassword,
        onChangeUsername,
        onChangeConfirmPassword,
        onChangeGroupId,
        errorEmail,
        errorPassword,
        errorUsername,
        errorConfirmPassword,
        submitable,
        loading,
        onSubmit,
        errorGroupId,
    }
}
