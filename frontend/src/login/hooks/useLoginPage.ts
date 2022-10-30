import { useState, useEffect } from 'react'
import { UseNavigation } from '../../core/abstractions/navigation/navigation'
import { UseSession } from '../../core/abstractions/session/session'
import { UseToast } from '../../core/abstractions/toast/toast'
import { MAIN_PAGE } from '../../main/page/route'
import { UseUserService } from '../../services/abstractions/user/user-service'
import { regExpEmail } from '../../utils/reg-exps/email/email.reg.exp'
import { regExpPassword } from '../../utils/reg-exps/password/password.reg.exp'

export const useLoginPage = (
    navigation: UseNavigation,
    service: UseUserService,
    toast: UseToast,
    session: UseSession,
) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const goBack = () => navigation.goTo(MAIN_PAGE)

    const onChangeEmail = (value: string) => setEmail(value.trim())

    const onChangePassword = (value: string) => setPassword(value.trim())

    const onSubmit = async () => {
        if (!submitable) {
            toast.warning('Datos invalidos')
            return
        }
        setLoading(true)
        const onResult = toast.pending('Procesando...')
        try {
            const data = await service.login({
                password,
                email,
            })
            session.createSession(data.token)
            onResult('Usuario logeado satisfactoriamente', 'success')
            navigation.goTo(MAIN_PAGE)
        } catch (e: any) {
            if (e.rosponse?.status === 404)
                onResult('Usuario no encontrado', 'error')
            else if (e.response?.status === 400)
                onResult('Contrasena no valida', 'error')
            else onResult('Error en el login', 'error')
        }
        setLoading(false)
    }

    useEffect(() => {
        if (email && !regExpEmail.test(email)) setErrorEmail('Email no valido')
        else setErrorEmail('')
    }, [email])

    useEffect(() => {
        if (password && !regExpPassword.test(password))
            setErrorPassword('Contrasena no valida')
        else setErrorPassword('')
    }, [password])

    const submitable = email && password && !errorEmail && !errorPassword

    return {
        email,
        password,
        onChangeEmail,
        onChangePassword,
        errorEmail,
        errorPassword,
        submitable,
        loading,
        onSubmit,
    }
}
