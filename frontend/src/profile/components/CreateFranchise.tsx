import { Avatar, Card, Center, Space, Title } from '@mantine/core'

export type CreateFranchiseCardProps = {
    onClick?: () => void
}

export const CreateFranchiseCard = (props: CreateFranchiseCardProps) => (
    <>
        <Card onClick={props.onClick} shadow="sm" p="lg" radius="md" withBorder>
            <Center>
                <Avatar radius="xl" size={100} />
            </Center>
            <Space h="md" />
            <Center>
                <Title order={4}>Crear franquisia</Title>
            </Center>
        </Card>
    </>
)
