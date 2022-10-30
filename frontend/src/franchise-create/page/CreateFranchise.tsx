import { Center, SimpleGrid, Space } from '@mantine/core'
import { ChangeEvent } from 'react'
import { FormCard } from '../../components/FormCard'
import { Layout } from '../../components/Layout'
import { useAxiosHttp } from '../../core/implementation/http/axios/useAxiosHttp'
import { useRouterDomNavigation } from '../../core/implementation/navigation/navigation-router-dom'
import { useCookieSession } from '../../core/implementation/session/cookies/useCookieSession'
import { useToastToastify } from '../../core/implementation/toast/toastify/useToastToastify'
import { useFranchise } from '../../services/implementations/franchise/useFranchise'
import { CreateButton } from '../components/CreateButton'
import { CreateFranchiseTitle } from '../components/CreateFranchiseTitle'
import { NameInput } from '../components/NameInput'
import { RifInput } from '../components/RifInput'
import { useCreateProduct } from '../hooks/useCreateProduct'

export default function CreateFranchisePage() {
    const {
        name,
        rif,
        onChangeRif,
        onChangeName,
        errorRif,
        errorName,
        loading,
        submitable,
        onSubmit,
    } = useCreateProduct(
        useFranchise(useAxiosHttp()),
        useCookieSession(),
        useToastToastify(),
        useRouterDomNavigation(),
    )

    const onChangeNameInput = (e: ChangeEvent<HTMLInputElement>) =>
        onChangeName(e.target.value)
    const onChangeRifInput = (e: ChangeEvent<HTMLInputElement>) =>
        onChangeRif(e.target.value)

    return (
        <>
            <Layout>
                <Center>
                    <FormCard>
                        <Center>
                            <CreateFranchiseTitle />
                        </Center>
                        <Space h="xl" />
                        <SimpleGrid cols={1}>
                            <NameInput
                                value={name}
                                onChange={onChangeNameInput}
                                error={errorName}
                            />
                            <RifInput
                                value={rif}
                                onChange={onChangeRifInput}
                                error={errorRif}
                            />
                        </SimpleGrid>
                        <Space h="xl" />
                        <Center>
                            <CreateButton
                                onClick={onSubmit}
                                disabled={!submitable}
                            />
                        </Center>
                    </FormCard>
                </Center>
            </Layout>
        </>
    )
}
