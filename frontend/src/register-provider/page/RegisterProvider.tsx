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
import { GroupIdInput } from '../components/GroupIdInput'
import { RegisterProviderTitle } from '../components/RegisterProviderTitle'
import { useRegisterProvider } from '../hooks/useRegisterProvider'

export default function RegisterProviderPage() {
    const {
        email,
        password,
        username,
        confirmPassword,
        groupId,
        onChangeEmail,
        onChangePassword,
        onChangeUsername,
        onChangeConfirmPassword,
        onChangeGroupId,
        errorEmail,
        errorPassword,
        errorUsername,
        errorConfirmPassword,
        submitable,
        loading,
        onSubmit,
    } = useRegisterProvider(
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
    const onChangeGroupIdInput = (e: ChangeEvent<HTMLInputElement>) =>
        onChangeGroupId(e.target.value)

    return (
        <>
            <Layout>
                <Center>
                    <FormCard>
                        <Center>
                            <RegisterProviderTitle />
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
                            <GroupIdInput
                                value={groupId}
                                onChange={onChangeGroupIdInput}
                            />
                            <PasswordInput
                                value={password}
                                onChange={onChangePasswordInput}
                                error={errorPassword}
                            />
                            <PasswordInput
                                value={confirmPassword}
                                onChange={onChangeConfirmPasswordInput}
                                placeholder="Confirm password"
                                error={errorConfirmPassword}
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
