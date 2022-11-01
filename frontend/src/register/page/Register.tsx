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
import { useUserHttp } from '../../services/implementations/user/useUserHttp'
import { RegisterButton } from '../components/RegisterButton'
import { RegisterTitle } from '../components/RegisterTitle'
import { useRegister } from '../hooks/useRegister'

export default function RegisterPage() {
    const {
        email,
        password,
        username,
        confirmPassword,
        onChangeEmail,
        onChangePassword,
        onChangeUsername,
        onChangeConfirmPassword,
        errorEmail,
        errorPassword,
        errorUsername,
        errorConfirmPassword,
        submitable,
        onSubmit,
    } = useRegister(
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

    return (
        <>
            <Layout>
                <Center>
                    <FormCard>
                        <Center>
                            <RegisterTitle />
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
                                description="La contraseña mínimo debe tener 8 caracteres, incluir una letra en mayúscula y un número"
                                error={errorPassword}
                            />
                            <PasswordInput
                                value={confirmPassword}
                                onChange={onChangeConfirmPasswordInput}
                                description=" "
                                placeholder="Confirmar contraseña"
                                error={errorConfirmPassword}
                            />
                        </SimpleGrid>
                        <Space h="xl" />
                        <Center>
                            <RegisterButton
                                disabled={!submitable}
                                onClick={onSubmit}
                            />
                        </Center>
                    </FormCard>
                </Center>
            </Layout>
        </>
    )
}
