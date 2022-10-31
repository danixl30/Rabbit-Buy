import { Avatar, Card, Center, Space, Title } from '@mantine/core'
import { UserCircle } from 'tabler-icons-react'

export type ProfileConfigCardProps = {
    onClick?: () => void
}

export const ProfileConfigCard = (props: ProfileConfigCardProps) => (
    <>
        <Card onClick={props.onClick} shadow="sm" p="lg" radius="md" withBorder>
            <Center>
                <UserCircle size={100} strokeWidth={1} color={'#000000'} />
            </Center>
            <Space h="md" />
            <Center>
                <Title order={4}>Configuracion de perfil</Title>
            </Center>
        </Card>
    </>
)
