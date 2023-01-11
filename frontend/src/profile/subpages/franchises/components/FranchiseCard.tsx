import { Avatar, Card, Flex, SimpleGrid, Text } from '@mantine/core'
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
                className={classes.hoverEffectHard}
                onClick={props.onClick}
                shadow="sm"
                p="lg"
                radius="md"
                withBorder
            >
                <Flex gap={20}>
                    <Avatar src={props.image} />
                    <SimpleGrid cols={1} spacing={1}>
                        <Text>{`Nombre: ${props.name}`}</Text>
                        <Text>{`RIF: ${props.rif}`}</Text>
                    </SimpleGrid>
                </Flex>
            </Card>
        </>
    )
}
