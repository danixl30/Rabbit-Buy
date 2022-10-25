import { Center, SimpleGrid, Space } from '@mantine/core'
import { ChangeEvent } from 'react'
import { EmailInput } from '../../components/EmailInput'
import { FormCard } from '../../components/FormCard'
import { PasswordInput } from '../../components/PasswordInput'
import { UsernameInput } from '../../components/UsernameInput'
import { RegisterButton } from '../../register/components/RegisterButton'
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
    } = useRegisterProvider()

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
                        />
                        <EmailInput
                            value={email}
                            onChange={onChangeEmailInput}
                        />
                        <GroupIdInput
                            value={groupId}
                            onChange={onChangeGroupIdInput}
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
                        <RegisterButton disabled={true} onClick={() => {}} />
                    </Center>
                </FormCard>
            </Center>
        </>
    )
}
