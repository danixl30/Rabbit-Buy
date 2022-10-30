import { Center, SimpleGrid, Space } from '@mantine/core'
import { ChangeEvent } from 'react'
import { EmailInput } from '../../components/EmailInput'
import { FormCard } from '../../components/FormCard'
import { Layout } from '../../components/Layout'
import { PasswordInput } from '../../components/PasswordInput'
import { useRouterDomNavigation } from '../../core/implementation/navigation/navigation-router-dom'
import { ForgotPassword } from '../components/ForgotPassword'
import { LoginButton } from '../components/LoginButton'
import { LoginTitle } from '../components/LoginTitle'
import { useLoginPage } from '../hooks/useLoginPage'

export default function LoginPage() {
    const { email, password, onChangeEmail, onChangePassword } = useLoginPage(
        useRouterDomNavigation(),
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
                            />
                            <PasswordInput
                                placeholder="Contraseña"
                                value={password}
                                onChange={onChangePasswordInput}
                            />
                        </SimpleGrid>
                        <Space h="xl" />
                        <Center>
                            <LoginButton
                                disabled={!password || !email}
                                onClick={() => {}}
                            />
                        </Center>
                        <Space h="xl" />
                        <ForgotPassword />
                    </FormCard>
                </Center>
            </Layout>
        </>
    )
}
