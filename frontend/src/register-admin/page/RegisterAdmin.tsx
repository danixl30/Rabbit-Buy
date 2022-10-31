import { Center, SimpleGrid, Space } from '@mantine/core'
import { ChangeEvent } from 'react'
import { EmailInput } from '../../components/EmailInput'
import { FormCard } from '../../components/FormCard'
import { Layout } from '../../components/Layout'
import { PasswordInput } from '../../components/PasswordInput'
import { UsernameInput } from '../../components/UsernameInput'
import { useAxiosHttp } from '../../core/implementation/http/axios/useAxiosHttp'
import { useRouterDomNavigation } from '../../core/implementation/navigation/navigation-router-dom'
import { useToastToastify } from '../../core/implementation/toast/toastify/useToastToastify'
import { RegisterButton } from '../../register/components/RegisterButton'
import { useUserHttp } from '../../services/implementations/user/useUserHttp'
import { RegisterAdminTitle } from '../components/RegisterAdminTitle'
import { useRegisterAdmin } from '../hooks/useRegisterAdmin'

export default function RegisterAdminPage() {
    const {
        email,
        password,
        username,
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
    } = useRegisterAdmin(
        useUserHttp(useAxiosHttp()),
        useRouterDomNavigation(),
        useToastToastify(),
    )

    const onChangeEmailInput = (e: ChangeEvent<HTMLInputElement>) =>
        onChangeEmail(e.target.value)
    const onChangeUsernameInput = (e: ChangeEvent<HTMLInputElement>) =>
        onChangeUsername(e.target.value)
    const onChangeConfirmPasswordInput = (e: ChangeEvent<HTMLInputElement>) =>
        onChangeConfirmPassword(e.target.value)
    const onChangePasswordInput = (e: ChangeEvent<HTMLInputElement>) =>
        onChangePassword(e.target.value)
    const onChangeSecretPassInput = (e: ChangeEvent<HTMLInputElement>) =>
        onChangeSecretPass(e.target.value)

    return (
        <>
            <Layout>
                <Center>
                    <FormCard>
                        <Center>
                            <RegisterAdminTitle />
                        </Center>
                        <Space h="xl" />
                        <SimpleGrid cols={1}>
                            <UsernameInput
                                value={username}
                                onChange={onChangeUsernameInput}
                                error={errorUsername}
                            />
                            <EmailInput
                                value={email}
                                onChange={onChangeEmailInput}
                                error={errorEmail}
                            />
                            <PasswordInput
                                value={password}
                                onChange={onChangePasswordInput}
                                error={errorPassword}
                            />
                            <PasswordInput
                                value={confirmPassword}
                                onChange={onChangeConfirmPasswordInput}
                                placeholder="Confirmar contraseña"
                                error={errorConfirmPassword}
                            />
                            <PasswordInput
                                value={secretPass}
                                onChange={onChangeSecretPassInput}
                                placeholder="Código Secreto"
                            />
                        </SimpleGrid>
                        <Space h="xl" />
                        <Center>
                            <RegisterButton
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
