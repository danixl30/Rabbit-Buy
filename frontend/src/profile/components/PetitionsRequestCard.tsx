import { Card, Center, Space, Title } from '@mantine/core'
import { Notes } from 'tabler-icons-react'
import { useHoverStyles } from '../../hooks/useHoverStyles'

export type PetitionRequestCardProps = {
    onClick?: () => void
}

export const PetitionRequestCard = (props: PetitionRequestCardProps) => {
    const { classes } = useHoverStyles()
    return (
        <>
            <Card
                className={classes.titleButton}
                onClick={props.onClick}
                shadow="sm"
                p="lg"
                radius="md"
                withBorder
            >
                <Center>
                    <Notes size={100} strokeWidth={1} color={'#000000'} />
                </Center>
                <Space h="md" />
                <Center>
                    <Title order={4}>Consultar pedidos</Title>
                </Center>
            </Card>
        </>
    )
}
