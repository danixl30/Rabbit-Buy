import { Card, Center, Space, Title } from '@mantine/core'
import { LayoutList } from 'tabler-icons-react'
import { useHoverStyles } from '../../hooks/useHoverStyles'

export type ConsultFranchisesCardProps = {
    onClick?: () => void
}

export const ConsultFranchisesCard = (props: ConsultFranchisesCardProps) => {
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
                    <LayoutList size={100} />
                </Center>
                <Space h="md" />
                <Center>
                    <Title order={4}>Consultar franquisias</Title>
                </Center>
            </Card>
        </>
    )
}
