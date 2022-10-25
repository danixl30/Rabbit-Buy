import { useState } from 'react'
import { UseNavigation } from '../../core/abstractions/navigation/navigation'
import { MAIN_PAGE } from '../../main/page/route'

export const useLoginPage = (navigation: UseNavigation) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const goBack = () => navigation.goTo(MAIN_PAGE)

    const onChangeEmail = (value: string) => setEmail(value.trim())

    const onChangePassword = (value: string) => setPassword(value.trim())

    return {
        email,
        password,
        onChangeEmail,
        onChangePassword,
    }
}
