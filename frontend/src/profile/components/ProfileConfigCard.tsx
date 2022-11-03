import { Card, Center, Space, Title } from '@mantine/core'
import { UserCircle } from 'tabler-icons-react'
import { useHoverStyles } from '../../hooks/useHoverStyles'

export type ProfileConfigCardProps = {
    onClick?: () => void
}

export const ProfileConfigCard = (props: ProfileConfigCardProps) => {
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
                    <UserCircle size={100} strokeWidth={1} color={'#000000'} />
                </Center>
                <Space h="md" />
                <Center>
                    <Title order={4}>Configuración de perfil</Title>
                </Center>
            </Card>
        </>
    )
}
