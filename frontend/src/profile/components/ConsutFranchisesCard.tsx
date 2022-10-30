import { Avatar, Card, Center, Space, Title } from '@mantine/core'

export type ConsultFranchisesCardProps = {
    onClick?: () => void
}

export const ConsultFranchisesCard = (props: ConsultFranchisesCardProps) => (
    <>
        <Card onClick={props.onClick} shadow="sm" p="lg" radius="md" withBorder>
            <Center>
                <Avatar radius="xl" size={100} />
            </Center>
            <Space h="md" />
            <Center>
                <Title order={4}>Consultar franquisias</Title>
            </Center>
        </Card>
    </>
)
