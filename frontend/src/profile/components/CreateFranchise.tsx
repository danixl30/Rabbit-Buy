import { Avatar, Card, Center, Space, Title } from '@mantine/core'
import { BuildingStore } from 'tabler-icons-react'

export type CreateFranchiseCardProps = {
    onClick?: () => void
}

export const CreateFranchiseCard = (props: CreateFranchiseCardProps) => (
    <>
        <Card onClick={props.onClick} shadow="sm" p="lg" radius="md" withBorder>
            <Center>
                <BuildingStore size={100} strokeWidth={1} color={'#000000'} />
            </Center>
            <Space h="md" />
            <Center>
                <Title order={4}>Crear franquisia</Title>
            </Center>
        </Card>
    </>
)
