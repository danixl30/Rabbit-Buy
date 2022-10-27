import { Center, SimpleGrid, Space } from '@mantine/core'
import { ChangeEvent } from 'react'
import { FormCard } from '../../components/FormCard'
import { Layout } from '../../components/Layout'
import { CreateButton } from '../components/CreateButton'
import { CreateFranchiseTitle } from '../components/CreateFranchiseTitle'
import { NameInput } from '../components/NameInput'
import { RifInput } from '../components/RifInput'
import { useCreateProduct } from '../hooks/useCreateProduct'

export default function CreateFranchisePage() {
    const { name, rif, onChangeRif, onChangeName } = useCreateProduct()

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
                            />
                            <RifInput value={rif} onChange={onChangeRifInput} />
                        </SimpleGrid>
                        <Space h="xl" />
                        <Center>
                            <CreateButton onClick={() => {}} disabled />
                        </Center>
                    </FormCard>
                </Center>
            </Layout>
        </>
    )
}
