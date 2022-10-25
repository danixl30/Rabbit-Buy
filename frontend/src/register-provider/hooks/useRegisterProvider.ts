import { useState } from 'react'

export const useRegisterProvider = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [groupId, setGroupId] = useState('')

    const onChangeEmail = (value: string) => setEmail(value.trim())

    const onChangePassword = (value: string) => setPassword(value.trim())

    const onChangeUsername = (value: string) => setUsername(value)

    const onChangeConfirmPassword = (value: string) =>
        setConfirmPassword(value.trim())

    const onChangeGroupId = (value: string) => setGroupId(value.trim())

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
    }
}
