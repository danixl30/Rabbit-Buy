import { Avatar, Card, Center, Space, Title } from '@mantine/core'

export type PetitionRequestCardProps = {
    onClick?: () => void
}

export const PetitionRequestCard = (props: PetitionRequestCardProps) => (
    <>
        <Card onClick={props.onClick} shadow="sm" p="lg" radius="md" withBorder>
            <Center>
                <Avatar radius="xl" size={100} />
            </Center>
            <Space h="md" />
            <Center>
                <Title order={4}>Consultar pedidos</Title>
            </Center>
        </Card>
    </>
)
