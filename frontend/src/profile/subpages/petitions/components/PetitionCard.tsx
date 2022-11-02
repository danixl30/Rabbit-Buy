import { ReactNode } from 'react'
import { Card, SimpleGrid, Text, Title } from '@mantine/core'
import { Petition } from '../../../../services/abstractions/petition/types/petition'

export type PetitionCardProps = Petition & {
    extraData?: ReactNode | ReactNode[]
}

export const PetitionCard = (props: PetitionCardProps) => (
    <>
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <SimpleGrid cols={2}>
                <SimpleGrid cols={1}>
                    <Title order={4}>
                        {'Nombre del producto: ' + props.name}
                    </Title>
                    {props.client && (
                        <>
                            <Text>{'Nombre: ' + props.client.name}</Text>
                            <Text>{'Email: ' + props.client.email}</Text>
                        </>
                    )}
                    <Text>
                        {'Precio: ' + props.currency + ' ' + props.price}
                    </Text>
                </SimpleGrid>
                <SimpleGrid cols={1}>
                    <Text>{'Cantidad: ' + props.quantity}</Text>
                    <Text>{'Status: ' + props.status}</Text>
                    {props.extraData}
                </SimpleGrid>
            </SimpleGrid>
        </Card>
    </>
)
