import { Center, SimpleGrid, Space } from '@mantine/core'
import { ChangeEvent } from 'react'
import { EmailInput } from '../../components/EmailInput'
import { FormCard } from '../../components/FormCard'
import { Layout } from '../../components/Layout'
import { PasswordInput } from '../../components/PasswordInput'
import { UsernameInput } from '../../components/UsernameInput'
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
    } = useRegister()

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
                                placeholder="Confirm password"
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
