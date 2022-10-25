import { useState } from 'react'

export const useRegisterAdmin = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [secretPass, setSecretPass] = useState('')

    const onChangeEmail = (value: string) => setEmail(value.trim())

    const onChangePassword = (value: string) => setPassword(value.trim())

    const onChangeUsername = (value: string) => setUsername(value)

    const onChangeConfirmPassword = (value: string) =>
        setConfirmPassword(value.trim())

    const onChangeSecretPass = (value: string) => setSecretPass(value.trim())

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
    }
}
