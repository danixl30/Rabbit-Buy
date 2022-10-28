import { Avatar, Card, Center, Space, Title } from '@mantine/core'

export type CreateProductCardProps = {
    onClick?: () => void
}

export const CreateProductCard = (props: CreateProductCardProps) => (
    <>
        <Card onClick={props.onClick} shadow="sm" p="lg" radius="md" withBorder>
            <Center>
                <Avatar radius="xl" size={100} />
            </Center>
            <Space h="md" />
            <Center>
                <Title order={4}>Crear producto</Title>
            </Center>
        </Card>
    </>
)
