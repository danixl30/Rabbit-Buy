import { useEffect, useState } from 'react'
import { UseToast } from '../../../../core/abstractions/toast/toast'
import { regExpEmail } from '../../../../utils/reg-exps/email/email.reg.exp'
import { regExpPassword } from '../../../../utils/reg-exps/password/password.reg.exp'

export const useChangeProfile = (toast: UseToast) => {
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

    const onSubmitEmail = async () => {}

    const onSubmitPassword = async () => {}

    const onSubminUsername = async () => {}

    const onDeleteUser = async () => {}

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
