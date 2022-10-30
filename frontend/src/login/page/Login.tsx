import { Center, SimpleGrid, Space } from '@mantine/core'
import { ChangeEvent } from 'react'
import { EmailInput } from '../../components/EmailInput'
import { FormCard } from '../../components/FormCard'
import { Layout } from '../../components/Layout'
import { PasswordInput } from '../../components/PasswordInput'
import { useAxiosHttp } from '../../core/implementation/http/axios/useAxiosHttp'
import { useRouterDomNavigation } from '../../core/implementation/navigation/navigation-router-dom'
import { useCookieSession } from '../../core/implementation/session/cookies/useCookieSession'
import { useToastToastify } from '../../core/implementation/toast/toastify/useToastToastify'
import { useUserHttp } from '../../services/implementations/user/useUserHttp'
import { LoginButton } from '../components/LoginButton'
import { LoginTitle } from '../components/LoginTitle'
import { useLoginPage } from '../hooks/useLoginPage'

export default function LoginPage() {
    const {
        email,
        password,
        onChangeEmail,
        onChangePassword,
        errorEmail,
        errorPassword,
        submitable,
        loading,
        onSubmit,
    } = useLoginPage(
        useRouterDomNavigation(),
        useUserHttp(useAxiosHttp()),
        useToastToastify(),
        useCookieSession(),
    )
    const onChangeEmailInput = (e: ChangeEvent<HTMLInputElement>) =>
        onChangeEmail(e.target.value)
    const onChangePasswordInput = (e: ChangeEvent<HTMLInputElement>) =>
        onChangePassword(e.target.value)
    return (
        <>
            <Layout>
                <Center>
                    <FormCard>
                        <Center>
                            <LoginTitle />
                        </Center>
                        <Space h="xl" />
                        <SimpleGrid cols={1}>
                            <EmailInput
                                value={email}
                                onChange={onChangeEmailInput}
                                error={errorEmail}
                            />
                            <PasswordInput
                                placeholder="Password"
                                value={password}
                                onChange={onChangePasswordInput}
                                error={errorPassword}
                            />
                        </SimpleGrid>
                        <Space h="xl" />
                        <Center>
                            <LoginButton
                                disabled={!submitable || loading}
                                onClick={onSubmit}
                            />
                        </Center>
                    </FormCard>
                </Center>
            </Layout>
        </>
    )
}
