import { Center, SimpleGrid, Space } from '@mantine/core'
import { ChangeEvent } from 'react'
import { EmailInput } from '../../../components/EmailInput'
import { PasswordInput } from '../../../components/PasswordInput'
import { UsernameInput } from '../../../components/UsernameInput'
import { useAxiosHttp } from '../../../core/implementation/http/axios/useAxiosHttp'
import { useCookieSession } from '../../../core/implementation/session/cookies/useCookieSession'
import { useToastToastify } from '../../../core/implementation/toast/toastify/useToastToastify'
import { getUserContext } from '../../../global-state/user/get-user-context'
import { useUserHttp } from '../../../services/implementations/user/useUserHttp'
import { ChangeButton } from './components/ChangeButton'
import { ChangeProfileTitle } from './components/ChangeProfileTitle'
import { useChangeProfile } from './hooks/useChangeProfile'

export default function UserProfile() {
    const {
        email,
        password,
        username,
        onChangeEmail,
        onChangePassword,
        onChangeUsername,
        errorEmail,
        errorPassword,
        errorUsername,
        onSubminUsername,
        onSubmitEmail,
        onSubmitPassword,
    } = useChangeProfile(
        useUserHttp(useAxiosHttp()),
        getUserContext()!!,
        useCookieSession(),
        useToastToastify(),
    )
    const onChangeEmailInput = (e: ChangeEvent<HTMLInputElement>) =>
        onChangeEmail(e.target.value)
    const onChangeUsernameInput = (e: ChangeEvent<HTMLInputElement>) =>
        onChangeUsername(e.target.value)
    const onChangePasswordInput = (e: ChangeEvent<HTMLInputElement>) =>
        onChangePassword(e.target.value)
    return (
        <>
            <Center>
                <SimpleGrid cols={1}>
                    <ChangeProfileTitle />
                    <Space />
                    <Center>
                        <UsernameInput
                            error={errorUsername}
                            onChange={onChangeUsernameInput}
                            value={username}
                        />
                        <Space w="md" />
                        <ChangeButton
                            onClick={onSubminUsername}
                            disabled={!username || Boolean(errorUsername)}
                        />
                    </Center>
                    <Center>
                        <EmailInput
                            error={errorEmail}
                            onChange={onChangeEmailInput}
                            value={email}
                        />
                        <Space w="md" />
                        <ChangeButton
                            onClick={onSubmitEmail}
                            disabled={!email || Boolean(errorEmail)}
                        />
                    </Center>
                    <Center>
                        <SimpleGrid cols={1}>
                            <PasswordInput
                                error={errorPassword}
                                onChange={onChangePasswordInput}
                                value={password}
                            />
                            <Space w="md" />
                            <ChangeButton
                                onClick={onSubmitPassword}
                                disabled={!password || Boolean(errorPassword)}
                            />
                        </SimpleGrid>
                    </Center>
                </SimpleGrid>
            </Center>
        </>
    )
}
