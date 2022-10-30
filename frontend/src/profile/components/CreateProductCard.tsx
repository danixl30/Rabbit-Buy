import { Card, Center, Space, Title } from '@mantine/core'
import { Box } from 'tabler-icons-react'

export type CreateProductCardProps = {
    onClick?: () => void
}

export const CreateProductCard = (props: CreateProductCardProps) => (
    <>
        <Card onClick={props.onClick} shadow="sm" p="lg" radius="md" withBorder>
            <Center>
                <Box size={100} strokeWidth={1} color={'#000000'} />
            </Center>
            <Space h="md" />
            <Center>
                <Title order={4}>Crear producto</Title>
            </Center>
        </Card>
    </>
)
