import { Center, SimpleGrid, Space } from '@mantine/core'
import { ChangeEvent } from 'react'
import { EmailInput } from '../../components/EmailInput'
import { FormCard } from '../../components/FormCard'
import { Layout } from '../../components/Layout'
import { PasswordInput } from '../../components/PasswordInput'
import { UsernameInput } from '../../components/UsernameInput'
import { RegisterButton } from '../../register/components/RegisterButton'
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
    } = useRegisterAdmin()

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
                            />
                            <EmailInput
                                value={email}
                                onChange={onChangeEmailInput}
                            />
                            <PasswordInput
                                value={password}
                                onChange={onChangePasswordInput}
                            />
                            <PasswordInput
                                value={confirmPassword}
                                onChange={onChangeConfirmPasswordInput}
                                placeholder="Confirmar Contraseña"
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
                                disabled={true}
                                onClick={() => {}}
                            />
                        </Center>
                    </FormCard>
                </Center>
            </Layout>
        </>
    )
}
