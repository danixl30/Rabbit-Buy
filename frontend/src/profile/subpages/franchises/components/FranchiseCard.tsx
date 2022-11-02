import { Card, Text } from '@mantine/core'
import { useHoverStyles } from '../../../../hooks/useHoverStyles'
import { Franchise } from '../../../../services/abstractions/franchise/types/franchise'

export type FranchiseCardProps = Franchise & {
    onClick?: () => void
}

export const FranchiseCard = (props: FranchiseCardProps) => {
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
                <Text>{`Nombre: ${props.name}`}</Text>
                <Text>{`RIF: ${props.rif}`}</Text>
            </Card>
        </>
    )
}
