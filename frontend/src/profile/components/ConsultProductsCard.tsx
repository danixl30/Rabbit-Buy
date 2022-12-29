import { Card, Center, Space, Title } from '@mantine/core'
import { Box } from 'tabler-icons-react'
import { useHoverStyles } from '../../hooks/useHoverStyles'

export type ConsultProductsCardProps = {
    onClick?: () => void
}

export const ConsultProductsCard = (props: ConsultProductsCardProps) => {
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
                    <Title order={4}>Consultar productos</Title>
                </Center>
            </Card>
        </>
    )
}
