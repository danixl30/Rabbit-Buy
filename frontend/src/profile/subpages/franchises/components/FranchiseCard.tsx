import { Card, Text } from '@mantine/core'
import { Franchise } from '../../../../services/abstractions/franchise/types/franchise'

export type FranchiseCardProps = Franchise & {
    onClick?: () => void
}

export const FranchiseCard = (props: FranchiseCardProps) => (
    <>
        <Card onClick={props.onClick} shadow="sm" p="lg" radius="md" withBorder>
            <Text>{`Nombre: ${props.name}`}</Text>
            <Text>{`Rif: ${props.rif}`}</Text>
        </Card>
    </>
)
