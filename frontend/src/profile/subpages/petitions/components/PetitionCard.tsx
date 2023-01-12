import { ReactNode } from 'react'
import { Card, SimpleGrid, Text, Title } from '@mantine/core'
import { Petition } from '../../../../services/abstractions/petition/types/petition'

export type PetitionCardProps = Petition & {
    extraData?: ReactNode | ReactNode[]
}

const getStatusString = (status: string) => {
    return status === 'CONFIRMED'
        ? 'Confirmado'
        : status === 'OPEN'
        ? 'Pendiente'
        : status === 'CANCELLED'
        ? 'Cancelado'
        : status === 'PAUSED'
        ? 'Suspendido'
        : status === 'FINISHED'
        ? 'Finalizado'
        : 'No disponible'
}

export const PetitionCard = (props: PetitionCardProps) => (
    <>
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <SimpleGrid cols={2}>
                <SimpleGrid cols={1}>
                    <Title order={4}>{'Producto: ' + props.name}</Title>
                    {props.client && (
                        <>
                            <Text>{'Nombre: ' + props.client.name}</Text>
                            <Text>{'Correo: ' + props.client.email}</Text>
                        </>
                    )}
                    <Text>
                        {'Precio: ' + props.currency + ' ' + props.price}
                    </Text>
                </SimpleGrid>
                <SimpleGrid cols={1}>
                    <Text>{'Cantidad: ' + props.quantity}</Text>
                    <Text>{'Estatus: ' + getStatusString(props.status)}</Text>
                    {props.extraData}
                </SimpleGrid>
            </SimpleGrid>
        </Card>
    </>
)
