import { Card, Center, Space, Title } from '@mantine/core'
import { Box } from 'tabler-icons-react'
import { useHoverStyles } from '../../hooks/useHoverStyles'

export type CreateProductCardProps = {
    onClick?: () => void
}

export const CreateProductCard = (props: CreateProductCardProps) => {
    const { classes } = useHoverStyles()
    return (
        <>
            <Card
                className={classes.hoverEffectHard}
                onClick={props.onClick}
                shadow="sm"
                p="lg"
                radius="md"
                withBorder
            >
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
}
