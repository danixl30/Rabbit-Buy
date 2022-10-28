import { Avatar, Card, Center, Space, Title } from '@mantine/core'

export type ProfileConfigCardProps = {
    onClick?: () => void
}

export const ProfileConfigCard = (props: ProfileConfigCardProps) => (
    <>
        <Card onClick={props.onClick} shadow="sm" p="lg" radius="md" withBorder>
            <Center>
                <Avatar radius="xl" size={100} />
            </Center>
            <Space h="md" />
            <Center>
                <Title order={4}>Configuracion de perfil</Title>
            </Center>
        </Card>
    </>
)
